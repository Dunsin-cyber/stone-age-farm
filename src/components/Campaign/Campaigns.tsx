import React, { useEffect } from "react";
import { FaTasks } from "react-icons/fa";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { useClient } from "@/context";
import { NearContext } from "@/wallets/near";
import { FusionFundContract } from "@/config";
import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/hook";
import { Campaign } from "@/redux/types";
import { msToDaysLeft } from "@/lib/DaysLeft";

function Campaigns() {
  const [active, setActive] = React.useState(true);
  const { wallet, signedAccountId } = React.useContext(NearContext);
  const campaigns = useAppSelector((state) => state.campaigns);

  const pics = [
    "/donation-1.png",
    "/donation-2.jpg",
    "/donation-3.jpg",
    "/donation-4.jpg",
    // "donation-5.jpg",
    // "donation-6.jpg",
    // "donation-7.jpg",
    // "donation-8.jpg",
    // "donation-9.jpg",
    // "donation-10.jpg",
    // "donation-11.jpg",
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
        <span>Campaigns</span>
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
          <span className="text-green-400 text-sm">
            {msToDaysLeft(campaign.crowdfunding_end_time)} days left
          </span>
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
          <div className="text-gray-400 text-sm">Donors</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-blue-400 text-xl font-bold">
            {campaign.amount_required.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">NEAR</div>
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
