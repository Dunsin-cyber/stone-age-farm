"use client";
import React from "react"
import Image from "next/image"
import {redirect} from "next/navigation"
import Navigation from "@/components/Navigation"


export default function Home() {

  // const router = useRouter();



  setTimeout(() => {
    redirect("/dashboard")
  }, 4000)


  // useEffect(() => {
  // }, [])
  return (
    <div className=" items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Image src ={"/flash-screen.jpg"}  fill="true" /* height={"screen"} width={100} */ alt="flash-screen"/>
    </div>
  );
}
