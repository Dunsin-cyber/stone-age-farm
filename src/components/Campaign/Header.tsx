"use client";
import { useState } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
// import { useAppSelector } from "@/redux/hook";
import { useClient } from "@/context";
// import { Campaign } from "@/redux/types";
// import toast from "react-hot-toast";

const chainAbstractionRes = `<div>
  <p>
    To experience full chain abstraction, we&rsquo;ve integrated the <strong>in-app Bitte wallet</strong>. Use it for a seamless experience where you can access the benefits of the blockchain without the need for complex setups!
  </p>
  <p style="margin-top: 1em; font-style: italic; color: #4b5563;">
    Simplify your transactions and enjoy a hassle-free journey on Fusion Fund!
  </p>
</div>

`;
const onboardingRes = `<div>
  <h3 style="font-weight: bold; color: #1d4ed8;">Steps to Raise Money on Fusion Fund</h3>
  <ol style="padding-left: 1.2em;">
    <li>Login to Fusion Fund.</li>
    <li>Set up your profile.</li>
    <li>Create your campaign and set a funding goal.</li>
    <li>Share your unique campaign code with friends.</li>
    <li>Return after the campaign deadline to withdraw your funds.</li>
  </ol>
  <p style="margin-top: 1em; font-style: italic;">It&rsquo;s that easy to fund your goals with Fusion Fund!</p>
</div>
>
`;

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  // const campaigns: any[] = useAppSelector((state) => state.campaigns);
  const { handlesetIsCampDetailOpen, setIsAssistantOpen, setAssistantContent } =
    useClient();



  const placeholders = [
    "What's the donation code?",
    "Easily donate just by putting in the code?",
    "ART2024",
    "use me",
    "i'm a search bar",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
  };
  return (
    <div className="h-[7rem] flex flex-col justify-center  items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-md font-bold text-center sm:text-5xl text-white ">
        Ask StoneAge Anything
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
