"use client";
import React, { useContext } from "react";
import { FaTasks } from "react-icons/fa";
import { CiFlag1 } from "react-icons/ci";
// import { useClient } from "@/context";
// import { NearContext } from "@/wallets/near";
import { FaCheckCircle } from "react-icons/fa";
// import { useAppSelector } from "@/redux/hook";
// import { useGetUser, useInitializeContract, useIsUserExist } from "@/functions";
import { FaHotjar } from "react-icons/fa";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import {useRouter} from "next/navigation"
import { Spinner } from "@chakra-ui/react"


function Campaigns() {
  // const { signedAccountId } = useContext(NearContext);
  //get user from redux, if user has campign, mark it as true.
  //if completd, save the data on telegram storage
  // const user = useAppSelector((state) => state.profile);
  // const { getUser } = useGetUser();
  // const { initContract } = useInitializeContract();

  // const { isUserExist } = useIsUserExist();

  // React.useEffect(() => {
  //   // initContract();
  //   getUser();
  // }, [signedAccountId]);

  const [clicked, setClicked] = React.useState(false)

  const router = useRouter();

  const toll = 2;

  return (

    <div>
      {toll < 1 ? (
        <HotNews />
      ) : (
        <div className="my-2 px-3">
          <h2 className="relative flex-row z-10 text-2xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
            <span className="mt-1">
              <FaTasks color="blue" />
            </span>
            <span>Set up your Account</span>
          </h2>
          <div className="rounded-xl bg-gray-900 px-3 py-3 mt-3 z-10">
            <div className="space-y-6 mt-2">
              {/* task */}
              <div
                className="rounded-lg border border-blue-800 border-5 flex justify-between items-center py-3 px-5"
              >
                <CiFlag1 color="white" />
                <div>
               <div id="ton-connect">connect</div>
                </div>
                {toll < 1 ? (
                  <FaCheckCircle size={"30px"} color="green" />
                ) : (
                  <h1 className="bg-white text-black rounded-full px-2"> Go</h1>
                )}
              </div>
              {/* set up your profile */}
              <div
                onClick={() => {
                 router.push("/game")
                 setClicked(true)
                }}
                className="rounded-lg border border-blue-800 border-5 flex justify-between items-center py-3 px-5"
              >
                <CiFlag1 color="white" />
                <div>
                  <p className="font-bold text-sm">Travel to StoneAge</p>
                  <p className="text-xs">play the game now!</p>
                </div>

                {clicked ? (
                     <Spinner size="lg" />
                ) : (
                  <h1 className="bg-white text-black rounded-full px-2"> Go</h1>
                )}
              </div>
  
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Campaigns;

function HotNews() {
  return (
    <div className="my-2 px-3">
      <h2 className="relative flex-row z-10 text-2xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
        <span>Hot</span>
        <FaHotjar color="red" />
      </h2>

      <div className="h-[10rem] rounded-md flex flex-col antialiased bg-black bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Charles Dickens",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "William Shakespeare",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Jane Austen",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Herman Melville",
  },
];
