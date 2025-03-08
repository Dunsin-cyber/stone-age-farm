"use client";
import { useState } from "react";
import { AiFillHome, AiFillCrown, AiFillStar } from "react-icons/ai";
import { GiBodySwapping } from "react-icons/gi";
import { useRouter, usePathname } from "next/navigation";
import { parseEther } from "viem";
import { useAccount, useConnect, useWriteContract } from "wagmi";
import { bleTestnet } from "@/utils/wagmi"
import abi from "@/abi.json"
import { injected } from "wagmi/connectors";
import { config } from "@/utils/wagmi";


const contractAddress = "0xF673F508104876c72C8724728f81d50E01649b40"

const FooterNav = () => {
  const router = useRouter();
  const path = usePathname(); // Use usePathname for App Router compatibility
  const [active, setActive] = useState("home");
  const { address } = useAccount();
  const { connectAsync } = useConnect();
  const { data: data_, writeContractAsync } = useWriteContract({
    config,
  });

  const navItems = [
    { id: "/explore", label: "Home", icon: <AiFillHome /> },
    { id: "/game", label: "Ex", icon: <AiFillCrown /> },
    { id: "/game", label: "Game", icon: <AiFillCrown /> },
    // { id: "/profile", label: "Profile", icon: <AiFillStar /> },
  ];

  // Add a fallback if the router isn't ready
  if (!path) return null;

  const BuyLand = async () => {
    try {
    
      if (!address) {
        await connectAsync({
          chainId: bleTestnet.id,
          connector: injected(),
        });
      }
      const url = "https://scanv2-testnet.ancient8.gg/address/0xF673F508104876c72C8724728f81d50E01649b40?tab=write_contract"
      const data = await writeContractAsync({
        // chainId: bleTestnet.id,
        address: contractAddress, // tokenAddress, // change to receipient address
        functionName: "mintLand",
        abi: abi,
        args: [parseEther("500"), url],
        chain: undefined,
        account: address,
        // 30        // 0.001
        // value: parseEther((+amount * +foundToken.price).toString()),
      });
      // toast.success("purchsed successfully");
      // setAmount("");
      console.log(data);
    } catch (err) {
      console.log(err);
      // toast.error(err.message);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 z-40 w-full bg-black py-4 flex justify-around items-center text-white">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            if (item.label === "Ex") {
              BuyLand()
            }
            router.push(item.id)
          }
          }
          className={`flex flex-col items-center transition duration-200 ${path.includes(item.id) ? "scale-125" : "scale-100"
            }`}
        >
          <div
            className={`w-8 h-8 ${path.includes(item.id) ? "text-purple-500" : "text-gray-400"
              }`}
          >
            {item.icon}
          </div>
          <span
            className={`text-xs mt-1 ${path.includes(item.id) ? "text-white" : "text-gray-400"
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
