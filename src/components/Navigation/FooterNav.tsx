"use client";
import { useState } from "react";
import { AiFillHome, AiFillCrown, AiFillStar } from "react-icons/ai";
import { GiBodySwapping } from "react-icons/gi";
import { useRouter, usePathname } from "next/navigation";

const FooterNav = () => {
  const router = useRouter();
  const path = usePathname(); // Use usePathname for App Router compatibility
  const [active, setActive] = useState("home");

  const navItems = [
    { id: "/explore", label: "Home", icon: <AiFillHome /> },
    { id: "/game", label: "Game", icon: <AiFillCrown /> },
    // { id: "/profile", label: "Profile", icon: <AiFillStar /> },
  ];

  // Add a fallback if the router isn't ready
  if (!path) return null;

  return (
    <div className="fixed bottom-0 z-40 w-full bg-black py-4 flex justify-around items-center text-white">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => router.push(item.id)}
          className={`flex flex-col items-center transition duration-200 ${
            path.includes(item.id) ? "scale-125" : "scale-100"
          }`}
        >
          <div
            className={`w-8 h-8 ${
              path.includes(item.id) ? "text-purple-500" : "text-gray-400"
            }`}
          >
            {item.icon}
          </div>
          <span
            className={`text-xs mt-1 ${
              path.includes(item.id) ? "text-white" : "text-gray-400"
            }`}
          >
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FooterNav;
