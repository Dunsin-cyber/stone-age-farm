import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useClient } from "@/context";
import CustomButton from "@/components/custom/Button";
import toast from "react-hot-toast";
import { NearContext } from "@/wallets/near";
import { FusionFundContract } from "@/config";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addCampaignInView } from "@/redux/slice/CampInViewSlice";
import { msToDaysLeft } from "@/lib/DaysLeft";
import { ProgressBar, ProgressRoot } from "@/components/ui/progress";
import { serializeError } from "@/lib/SerializeError";

function CampaignDetailDrawer({ isCampDetailOpen }) {
  const { closeDrawer } = useClient();
  return (
    <DrawerRoot
      size="lg"
      open={isCampDetailOpen}
      onOpenChange={closeDrawer}
      placement={"bottom"}
    >
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" style={{ display: "none" }}>
          Open Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent roundedTop={"25"} roundedBottom={undefined}>
        <DrawerBody>
          <Details />
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
}

export default CampaignDetailDrawer;

function Details() {
  const { setIsCampDetailOpen, campId } = useClient();
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const { wallet, signedAccountId } = React.useContext(NearContext);
  const dispatch = useAppDispatch();
  const campaign = useAppSelector((state) => state.campInView);
  const [openDonationDiv, setOpenDonationDiv] = useState(false);

  const handleGetCampaignDetails = async () => {
    try {
      if (wallet) {
        console.log(campId);
        setFetching(true);
        const data = await wallet?.viewMethod({
          contractId: FusionFundContract,
          method: "get_campaign",
          args: { campaign_id: +campId },
        });
        dispatch(addCampaignInView({ ...data, campaign_id: campId }));
        console.log(data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error Fetching Campaign");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    handleGetCampaignDetails();
  }, [campId]);

  const handleClick = async () => {
    if (
      signedAccountId === campaign.creator &&
      campaign.total_contributions >= campaign.amount_required
    ) {
      try {
        setLoading(true);
        const claim = await wallet.callMethod({
          contractId: FusionFundContract,
          method: "withdraw",
          args: {
            campaign_id: campId,
          },
        });
        toast.success("Withdarwal Successful");
        return;
      } catch (err) {
        const new_err = serializeError(err);
        toast.error(new_err);
      } finally {
        setLoading(false);
      }
    } else {
      setOpenDonationDiv(true);
    }
  };

  const handleDonate = async (amount: number) => {
    try {
      if (wallet && signedAccountId) {
        const donate = await wallet?.callMethod({
          contractId: FusionFundContract,
          method: "contribute",
          args: {
            campaign_id: campId,
          },
          deposit: amount * 1e24,
        });

        console.log(donate);
        toast.success(`You have successfully Donated ${amount} NEAR`);
        setIsCampDetailOpen(false);
        return;
      }
    } catch (err) {
      const new_err = serializeError(err);

      toast.error(new_err);

      console.log(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative w-full h-40 rounded-lg overflow-hidden">
        {/* Image */}
        <img
          src={"/donation-1.png"}
          alt={campaign.title}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Cancel Icon */}
        <button
          className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 p-1 rounded-full hover:bg-opacity-100"
          onClick={() => setIsCampDetailOpen(false)} // replace `handleCancel` with your cancel function
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="text-3xl font-bold">{campaign.title}</div>
      <div className="text-gray-500">{campaign.description}</div>

      {/* Progress */}
      <div className="flex justify-between">
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
        <div>
          <span className="text-green-400 text-sm">
            {msToDaysLeft(campaign.crowdfunding_end_time)} days left
          </span>
        </div>
      </div>

      <div className="text-green-400 font-sm">
        Creator :{" "}
        <span className="text-gray-400">
          {campaign.creator.length > 20
            ? campaign.creator.slice(0, 20)
            : campaign.creator}
        </span>
        <span className="text-gray-400">
          {campaign.creator.length > 20 ? "..." : ""}
        </span>
      </div>

      {/* Reward */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="flex flex-col items-center">
          <div className="text-blue-400 text-xl font-bold">
            {" "}
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
            {" "}
            {campaign.campaign_code}
          </div>
          <div className="text-gray-400 text-sm">Code</div>
        </div>
      </div>

      {/* donation progress bar and input field */}
      {openDonationDiv && (
        <div className="space-y-3">
          <DonateSection campaign={campaign} onDonate={handleDonate} />
        </div>
      )}
      {/* Donate Button */}
      {!openDonationDiv && (
        <div className={"flex justify-center pb-8"}>
          <CustomButton
            onClick={handleClick}
            disabled={
              campaign.creator === signedAccountId &&
              campaign.total_contributions < campaign.amount_required
            }
            title={
              campaign.creator === signedAccountId
                ? "Claim Donation"
                : "Donate Now"
            }
            isLoading={loading}
          />
        </div>
      )}
    </div>
  );
}

function DonateSection({ campaign, onDonate }) {
  const [donationAmount, setDonationAmount] = useState("");
  const { wallet, signedAccountId } = React.useContext(NearContext);
  const [nearBalance, setNearBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const getBalance = async () => {
    if (wallet && signedAccountId) {
      console.log(wallet);
      try {
        const balance = await wallet?.getBalance(signedAccountId);
        setNearBalance(balance);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  const handleDonationChange = (e) => {
    setDonationAmount(e.target.value);
  };

  const handleDonateClick = async () => {
    const amount = parseFloat(donationAmount);
    if (amount && amount > 0) {
      if (amount > nearBalance) {
        toast.error("Your Balance is Low");
        return;
      }
      setLoading(true);

      await onDonate(amount);
      setDonationAmount("");
      setLoading(false);
    } else {
      toast.error("Please enter a valid donation amount.");
    }
  };

  return (
    <div className="space-y-4 w-full max-w-md mx-auto p-6 rounded-lg bg-gray-800 shadow-md pb-7 mb-7">
      <h2 className="text-xl font-semibold text-white">Donate Now</h2>

      {/* Display Current Balance */}
      <div className="flex justify-between items-center">
        <p className="text-gray-200">Current Balance:</p>
        <p className="text-gray-400 font-bold">{nearBalance} NEAR</p>
      </div>

      {/* Progress Bar */}
      <ProgressRoot
        value={(campaign.total_contributions / campaign.amount_required) * 100}
      >
        <ProgressBar />
      </ProgressRoot>

      {/* Donation Input */}
      <div className="space-y-2">
        <label htmlFor="donation" className="block text-sm text-gray-300">
          Enter Donation Amount (NEAR)
        </label>
        <input
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          id="donation"
          value={donationAmount}
          onChange={handleDonationChange}
          placeholder="0.00"
        />
      </div>

      {/* Donate Button */}
      <button
        onClick={handleDonateClick}
        disabled={!donationAmount || parseFloat(donationAmount) <= 0 || loading}
        className={`w-full py-2 mt-3 rounded-lg text-white ${
          !donationAmount || parseFloat(donationAmount) <= 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "donating..." : "Donate"}
      </button>
    </div>
  );
}
