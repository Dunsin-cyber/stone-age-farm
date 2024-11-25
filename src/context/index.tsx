import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

interface DrawerParam {
  title: string;
  body: string;
}

// const welcome = `<div>
//   <p>
//     To experience full chain abstraction, we&rsquo;ve integrated the <strong>in-app Bitte wallet</strong>. Use it for a seamless experience where you can access the benefits of the blockchain without the need for complex setups!
//   </p>
//   <p style="margin-top: 1em; font-style: italic; color: #4b5563;">
//     Simplify your transactions and enjoy a hassle-free journey on Fusion Fund!
//   </p>
// </div>

// `;
const welcome = `<div>
  <h2 style="font-weight: bold; color: #1d4ed8;">Fusion Fund: Easy, Wallet-Free Crowdfunding & Lending</h2>
  <p>
    With Fusion Fund, you can raise funds and support projects right within Telegram — no app downloads or wallet setups needed. Our <strong>Paymaster</strong> integration simplifies transactions, so you don’t need to hold crypto or sign transactions yourself, making it seamless for anyone to get started.
  </p>
  <p>
    Enjoy <strong>P2P lending and borrowing</strong> with ease, alongside AI assistance guiding you at each step to optimize your experience.
  </p>
  <p style="margin-top: 1em; font-style: italic;">Empowering finances, made accessible for everyone.</p>
</div>`;
const UserContext = React.createContext<{
  setDrawerTitle: any;
  drawerTitle: string;
  drawerBody: string;
  setDrawerBody: any;
  closeDrawer: any;
  drawerIsOpen: boolean;
  setDrawerIsOpen: any;
  passDrawerParams: (data: DrawerParam) => {} | any;
  isCreateCampOpen: any;
  setIsCreateCampOpen: any;
  isCampDetailOpen: any;
  setIsCampDetailOpen: any;
  connectWallet: boolean;
  setConnectWallet: any;
  setIsCreateProfile: any;
  isCreateProfile: any;
  campId: number;
  handlesetIsCampDetailOpen: any;
  setIsLoanModalOpen: any;
  isLoanModalOpen: boolean;
  isAssistantOpen: boolean;
  setIsAssistantOpen: any;
  assistantContent: string;
  setAssistantContent: any;
}>({
  setDrawerTitle: undefined,
  drawerTitle: "",
  drawerBody: "",
  setDrawerBody: undefined,
  closeDrawer: undefined,
  drawerIsOpen: false,
  setDrawerIsOpen: undefined,
  passDrawerParams: undefined,
  isCreateCampOpen: false,
  setIsCreateCampOpen: undefined,
  isCampDetailOpen: undefined,
  setIsCampDetailOpen: undefined,
  connectWallet: undefined,
  setConnectWallet: undefined,
  setIsCreateProfile: undefined,
  isCreateProfile: false,
  campId: undefined,
  handlesetIsCampDetailOpen: undefined,
  setIsLoanModalOpen: undefined,
  isLoanModalOpen: false,
  isAssistantOpen: false,
  setIsAssistantOpen: undefined,
  assistantContent: welcome,
  setAssistantContent: undefined,
});

export const useUserContext = () => {
  const router = useRouter();
  const pathname = router.pathname;

  const [drawerTitle, setDrawerTitle] = useState("");
  const [drawerBody, setDrawerBody] = useState("");
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [isCreateCampOpen, setIsCreateCampOpen] = useState(false);
  const [isCampDetailOpen, setIsCampDetailOpen] = useState(false);
  const [connectWallet, setConnectWallet] = useState(false);
  const [isCreateProfile, setIsCreateProfile] = useState(false);
  const [campId, setCampId] = useState(0);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantContent, setAssistantContent] = useState("");

  const closeDrawer = () => {
    setDrawerTitle("");
    setDrawerBody("");
    setDrawerIsOpen(false);
  };

  const passDrawerParams = (data: DrawerParam) => {
    setDrawerTitle(data.title);
    setDrawerBody(data.body);
    setDrawerIsOpen(true);
  };

  const handlesetIsCampDetailOpen = (id: number, val: boolean) => {
    setCampId(id);
    setIsCampDetailOpen(val);
  };

  return {
    drawerTitle,
    setDrawerTitle,
    drawerBody,
    setDrawerBody,
    closeDrawer,
    drawerIsOpen,
    setDrawerIsOpen,
    passDrawerParams,
    isCreateCampOpen,
    setIsCreateCampOpen,
    isCampDetailOpen,
    setIsCampDetailOpen,
    connectWallet,
    setConnectWallet,
    setIsCreateProfile,
    isCreateProfile,
    campId,
    handlesetIsCampDetailOpen,
    isLoanModalOpen,
    setIsLoanModalOpen,
    isAssistantOpen,
    setIsAssistantOpen,
    assistantContent,
    setAssistantContent,
  };
};

export const UserContextProvider = ({ children }) => {
  const auth = useUserContext();
  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};

export const useClient = () => useContext(UserContext);
