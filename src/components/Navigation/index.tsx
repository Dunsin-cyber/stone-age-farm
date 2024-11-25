"use client";
import React from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import FooterNav from "./FooterNav"


export default function Home({ children }) {
  return (
    <div className="relative h-[screen]">
      <ShootingStars />
      <StarsBackground />
      <div className="relative mx-1 my-[5%] z-30 ">{children}</div>
      <FooterNav />
    </div>
  );
}
