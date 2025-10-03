import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { httpAction } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { convertToModelMessages, streamText, UIMessage } from "ai";
import { deepseek } from "@ai-sdk/deepseek";

const http = httpRouter();

auth.addHttpRoutes(http);

http.route({
    path: "/api/chat",
    method: "POST",
    handler: httpAction(async (ctx, req)=> {
        const userId = await getAuthUserId(ctx)

        if(!userId) {
            return Response.json({ error: "Unauthorized!"}, {status: 401})
        }

        const { messages } : { messages: UIMessage[] } = await req.json();

        const lastMessages = messages.slice(-10);

        const result = streamText({
            model: deepseek("deepseek-chat"),
            system: "You are a helpful assistant that helps users manage their notes. You respond in a concise and clear manner.",
            messages: convertToModelMessages(lastMessages),
            onError(error) {
                console.error("Stream text error: ", error)
            }
        })

        return result.toUIMessageStreamResponse({
            headers: new Headers({
                "Access-Control-Allow-Origin": "*",
                "Vary": "Origin"
            })
        })
    })
})

http.route({
  path: "/api/chat",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => {
    const headers = request.headers;
    if (
      headers.get("Origin") !== null &&
      headers.get("Access-Control-Request-Method") !== null &&
      headers.get("Access-Control-Request-Headers") !== null
    ) {
      return new Response(null, {
        headers: new Headers({
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type, Digest, Authorization",
          "Access-Control-Max-Age": "86400",
        }),
      });
    } else {
      return new Response();
    }
  }),
});


export default http;
