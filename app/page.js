"use client"
import Image from "next/image";
import React, { useState } from "react";
import localFont from 'next/font/local';
import { useRouter } from "next/navigation";

const poppinsBold = localFont({
  src: "./fonts/Poppins-ExtraBold.ttf",
  variable: "--font-poppinsBold",
  weight: "100 900",
});

const poppinsRegular = localFont({
  src: "./fonts/Poppins-Regular.ttf",
  variable: "--font-poppinsRegular",
  weight: "100 900",
});



export default function Home() {

  const router = useRouter()
  const [text, setText] = useState("linktr.ee/")
  const createTree = () => {
    let link;
    if (text.startsWith("linktr.ee/")) {
      link = text.replace("linktr.ee/", "")
    } else {
      link = text
    }
    console.log(link)
    router.push(`/generate?handle=${link}`)
    setText("")
  }


  return (
    <main>
      <section className="bg-[#254f1a] min-h-[100vh] grid grid-cols-2 justify-center items-center">
        {/* text of section 1 */}
        <div className="ml-[10vw]">
          <p className={`py-4 text-[#D3E800] font-sans font-bold text-7xl text- ${poppinsBold.className}`}>Everything you are. In one, simple link in bio.</p>
          <p className={`pb-8 text-[#D3E800] text-xl font-semibold ${poppinsRegular.className}`}>Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <div className="flex relative gap-5">
            {/* <div className={`bg-white h-14 w-[25vh] flex items-center justify-center rounded-lg p-2 ${isFocused ? 'outline-red-600' : ''
              } `}>
              <form className=" ">
                <label className="bg-white">linktr.ee/</label>
                <input onFocus={() => setIsFocused(true)} // Set focus state to true
                  onBlur={() => setIsFocused(false)} className="w-[15vh] outline-none focus:border-0" placeholder="yourname" name="yourname" />
              </form>
            </div> */}
            <input value={text} onChange={(e) => setText(e.target.value)} className="px-2 rounded-lg" placeholder="yourname" />
            <button onClick={() => createTree()} className="bg-[#E9C0E9] rounded-full p-4 font-sans font-semibold">Claim your Linktree</button>
          </div>
        </div>
        {/* image of section 1 */}
        <div>
          <Image src={"/home.png"} width={700} height={1700} className="ml-14" alt="Image screenshot for section 1" />
        </div>
      </section>


      <section className="bg-red-600 min-h-[100vh]">
        <div className="mr-[10vw]">

        </div>

      </section>
    </main>
  );
}
