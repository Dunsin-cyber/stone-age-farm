import React from "react";
import { Header } from "@/components/Campaign/Header";
// import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Background from "@/components/Navigation";
import Task from "@/components/Campaign/Task";
import Campaigns from "@/components/Campaign/Campaigns";
// import { useGetAllCampigns } from "@/functions";


function Index() {
//   const { getCampaigns } = useGetAllCampigns();

//   React.useEffect(() => {
//     getCampaigns();
//   }, []);

  return (
    <Background>
      <div className="flex flex-col space-y-10">
        {/* <Header /> */}
        <Task />
        <Campaigns />
      </div>
    </Background>
  );
}

export default Index;
