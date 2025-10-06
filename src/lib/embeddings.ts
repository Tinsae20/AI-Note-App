import { google } from "@ai-sdk/google"
import { embed, embedMany } from "ai";

const embeddingModel = google.textEmbedding("text-embedding-004")

function generateChunks(input: string) {
  return input
    .split("\n\n")
    .map((chunk) => chunk.trim())
    .filter(Boolean);
}

export async function generateEmbeddings(
  value: string
): Promise<Array<{ content: string; embedding: number[] }>> {
  const chunks = generateChunks(value);

  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });

  return embeddings.map((embedding, index) => ({
    content: chunks[index],
    embedding,
  }));
}

export async function generateEmbedding(value: string): Promise<number[]> {
  const { embedding } = await embed({
    model: embeddingModel,
    value,
  });

  return embedding;
}