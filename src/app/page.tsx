import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className=" flex-col md:flex-row flex  items-center bg-[#1E1919]  dark:bg-slate-800">
        <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white spacey-5">
          <h1 className="text-4xl text-white font-bold">Welcome to Dropbox <br /> <br /> Everything you and your business need to work efficiently, all in one place
          </h1>
          <p className="pb-20 pt-2">Collaborate seamlessly and deliver work faster from anywhere with Dropbox. Securely store your content,
            edit PDFs, share videos, sign documents and track file engagement—without leaving Dropbox.</p>
          <Link href='/dashboard' className="flex cursor-pointer bg-blue-600 p-3 w-fit">Try it for free <ArrowRight className="ml-8" /></Link>
        </div>
        <div className="bg-[#1E1919]  dark:bg-slate-800 h-full p-8">
          <video autoPlay muted className="rounded-lg" loop src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"></video>
        </div>
      </div>

      <p className="text-center p-3 text-[14px] fornt-bold"><span className="font-bold text-base">Copyrights reserved @2024</span> <br />Our team is constantly working across different countries, time zones and offices. A lot of solutions can accommodate that now,
        but none make it as seamless as Dropbox and Dropbox Paper.Keep everything that’s important to you and your family shareable and safe in one place.</p>
    </main>
  );
}
