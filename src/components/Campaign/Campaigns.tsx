"use client";
import React, { useEffect } from "react";
import { FaTasks } from "react-icons/fa";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { useClient } from "@/context";
import { msToDaysLeft } from "@/lib/DaysLeft";

export interface Campaign {
  campaign_id: number;
  creator: string; // Equivalent to `AccountId` in Rust
  total_contributions: number; // Equivalent to `u64`
  contributions: any; // Equivalent to `Vec<Contribution>`
  crowdfunding_end_time: number; // Equivalent to `U64`
  claimed: boolean;
  amount_required: number; // Equivalent to `u64`
  title: string;
  description: string;
  images: string;
  campaign_code: string;
}

// Example campaigns:
const campaigns: Campaign[] = [
  {
    campaign_id: 1,
    creator: "StoneFarmer001",
    total_contributions: 2300,
    contributions: [], // Populate with actual Contribution data
    crowdfunding_end_time: 1700841617, // Example timestamp
    claimed: false,
    amount_required: 500,
    title: "Expand the Village Farming Lands",
    description: "Help us clear the forest and expand our farming lands to grow more food for the tribe!",
    images: "",
    campaign_code: "FARM001"
  },
  {
    campaign_id: 2,
    creator: "HunterGathr",
    total_contributions: 1500,
    contributions: [], // Populate with actual Contribution data
    crowdfunding_end_time: 1700941617, // Example timestamp
    claimed: false,
    amount_required: 3000,
    title: "Forge New Stone Weapons",
    description: "Contribute to crafting new stone weapons to defend against wild beasts and rival tribes.",
   images: "",
    campaign_code: "WEAP002"
  },
  {
    campaign_id: 3,
    creator: "FireKeeper",
    total_contributions: 4000,
    contributions: [], // Populate with actual Contribution data
    crowdfunding_end_time: 1701041617, // Example timestamp
    claimed: false,
    amount_required: 7000,
    title: "Discover Fire-Making Techniques",
    description: "Support our quest to master fire-making for warmth, cooking, and protection at night.",
     images: "",
    campaign_code: "FIRE003"
  },
  {
    campaign_id: 4,
    creator: "TribalCrafts",
    total_contributions: 800,
    contributions: [], // Populate with actual Contribution data
    crowdfunding_end_time: 1701141617, // Example timestamp
    claimed: false,
    amount_required: 500,
    title: "Build Stone Age Pottery Workshop",
    description: "Help us establish a pottery workshop to store grains, water, and other essentials.",
     images: "",
    campaign_code: "POT004"
  },
  {
    campaign_id: 5,
    creator: "TrailBlazer",
    total_contributions: 2500,
    contributions: [], // Populate with actual Contribution data
    crowdfunding_end_time: 1701241617, // Example timestamp
    claimed: false,
    amount_required: 500,
    title: "Explore the Hidden Valley",
    description: "Fund an expedition to the hidden valley rumored to have fertile lands and rare resources.",
     images: "",
    campaign_code: "VALLEY005"
  },
  {
    campaign_id: 6,
    creator: "AnimalTamer",
    total_contributions: 1900,
    contributions: [], // Populate with actual Contribution data
    crowdfunding_end_time: 1701341617, // Example timestamp
    claimed: false,
    amount_required: 500,
    title: "Tame the Woolly Mammoth",
    description: "Support efforts to tame a woolly mammoth to help with heavy lifting and transportation.",
     images: "",
    campaign_code: "MAMM6"
  }
];

function Campaigns() {
  const [active, setActive] = React.useState(true);
  // const { wallet, signedAccountId } = React.useContext(NearContext);
  // const campaigns = useAppSelector((state) => state.campaigns);

  const pics = [
    "/stoneage-1.jpeg",
    "/stoneage-2.jpeg",
    "/stoneage-3.jpeg",
    "/stoneage-4.jpeg",
    "/stoneage-5.jpeg",
  ];

  const getRandomImage = () => {
    return pics[Math.floor(Math.random() * pics.length)];
  };

  const filteredCampaign = campaigns?.map((camp) => ({
    ...camp, // Spread existing properties of each campaign
    images: getRandomImage(),
  }));

  return (
    <div className="px-3">
      <h2 className="relative flex-row z-10 text-2xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
        <span>
          <FaTasks color="blue" />
        </span>
        <span>Sell Lands - Upcoming Feature</span>
      </h2>
      {/* campaigns */}
      <div>
        <div className="flex justify-evenly my-3 w-full">
          <div
            onClick={() => setActive(true)}
            className={`flex rounded-xl py-2 px-6 transition duration-300 ease-in-out transform hover:scale-105  w-[50%] justify-center space-x-2 cursor-pointer items-center ${
              active && "bg-gray-700 "
            } `}
          >
            <p>Ongoing</p>
            <p className=" px-1 py-[1/2] rounded-3xl text-white font-semibold">
              {filteredCampaign.length}
            </p>
          </div>
          <div
            onClick={() => setActive(false)}
            className={`flex rounded-xl py-2 px-6 transition duration-300 ease-in-out transform hover:scale-105   w-[50%] justify-center cursor-pointer items-center${
              !active && " bg-gray-700 "
            } `}
          >
            <p>Completed</p>
            <p className=" px-1 py-[1/2]  rounded-3xl text-white font-semibold">
              0
            </p>
          </div>
        </div>

        <div className="p-4 bg-black min-h-screen">
          {filteredCampaign?.map((campaign, index) => (
            <CampaignCard key={index} campaign={campaign} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Campaigns;

export const CampaignCard = ({ campaign }) => {
  const { handlesetIsCampDetailOpen } = useClient();

  return (
    <div
      onClick={() => handlesetIsCampDetailOpen(campaign.campaign_id, true)}
      className="rounded-lg shadow-lg p-4 mb-4 w-full"
    >
      {/* Campaign Header */}
      <div className="relative w-full h-40 rounded-lg overflow-hidden">
        {/* Image */}
        <img
          src={campaign.images}
          alt={campaign.title}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="flex items-center mb-4">
        <img
          src={campaign.images}
          alt={campaign.title}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div className="flex flex-col">
          <h3 className="text-white text-lg font-semibold">{campaign.title}</h3>
          {/* <span className="text-green-400 text-sm">
            {msToDaysLeft(campaign.crowdfunding_end_time)} days left
          </span> */}
        </div>
      </div>

      {/* Progress */}
      <div className="text-white mb-4">
        <p className="text-gray-400 text-sm">
          Progress:{" "}
          {(
            (campaign.total_contributions / campaign.amount_required) *
            100
          ).toPrecision(3)}
          %
        </p>
      </div>

      {/* Rewards Section */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="flex flex-col items-center">
          <div className="text-blue-400 text-xl font-bold">
            {campaign.contributions.length}
          </div>
          <div className="text-gray-400 text-sm">Participants</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-blue-400 text-xl font-bold">
            {campaign.amount_required.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">STN</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-blue-400 text-xl font-bold">
            {campaign.campaign_code}
          </div>
          <div className="text-gray-400 text-sm">Code</div>
        </div>
      </div>
    </div>
  );
};
