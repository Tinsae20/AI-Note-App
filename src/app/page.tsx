import onboard from "@/assets/cards.svg"
// import cards from "@assets/cards.svg";
import bubble from "@/assets/Logo.svg"
// import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (

    <div className="min-h-screen flex flex-col md:flex-row items-end md:items-center justify-between px-6 md:px-16 lg:px-32">

      {/* Right Content Section */}
      <div className="flex flex-col justify-center gap-8 md:gap-10 w-full md:w-1/2 mt-10 md:mt-0 
                items-center md:items-start text-center md:text-left min-h-screen md:min-h-0">
        <div className="flex flex-col justify-center items-center md:items-start gap-10 text-center md:text-left">
          {/* Logo and Title */}
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Image src={bubble} width={56} height={56} alt="bubble-logo" />
            <p className="text-[#14C679] font-[Instrument Sans] text-[48px] sm:text-[60px] md:text-[72px] lg:text-[80px] font-semibold leading-none font-dlig">
              EchoNote
            </p>
          </div>

          {/* Subtitle */}
          <p className="text-[#797979] font-[Instrument Sans] text-[14px] sm:text-[14px] md:text-[14px] font-normal leading-snug font-dlig">
            Your ideas echoed back, organized.
          </p>

          {/* Description */}
          <p className="text-[#797979] font-[Instrument Sans] text-[14px] sm:text-[14px] md:text-[14px] font-normal leading-snug font-dlig max-w-[600px]">
            Note-taking app with AI chatbot integration. Ask the chatbot anything about your notes to retrieve and summarize information.
          </p>

          {/* Button and Footer Text */}
          <div className="flex flex-col sm:flex-col sm:items-star gap-6 sm:gap-8">
            <Button asChild size="lg" className="px-6 py-3 w-[177px] sm:w-[150]">
              <Link href="/notes"><p className="font-[Instrument Sans]"> Get Started </p></Link>
            </Button>
            <p className="text-[#797979] font-[Instrument Sans] text-[12px] sm:text-[12px] md:text-[12px] font-normal leading-none font-dlig">
              Built with Convex and the Vercel AI SDK
            </p>
          </div>
        </div>
      </div>
      {/* Left Image Section */}
      <div className="hidden md:flex justify-start w-full md:w-1/2">
        <Image
          src={onboard}
          width={780}
          height={811}
          alt="onboard-image"
          className="w-[280px] sm:w-[780px] md:w-[811px] h-auto object-contain"
        />
      </div>
    </div>
  );
}




