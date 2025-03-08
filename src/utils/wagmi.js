"use client";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { opBNBTestnet, bscTestnet } from "wagmi/chains";

// Define the custom chain directly
export const bleTestnet = {
    id: 28122024, // Chain ID
    name: "Ancient8 Celestia Testnet",
    network: "Ancient8",
    nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
    },

    rpcUrls: {
        default: {
            http: ["https://rpcv2-testnet.ancient8.gg"],
        },
    },
    blockExplorers: {
        default: {
            name: "Ancient8 Celestia Explorer",
            url: "https://explorer-ancient-8-celestia-wib77nnwsq.t.conduit.xyz:443",
        },
    },
    testnet: true, // Indicates it's a testnet
};

export const config = getDefaultConfig({
    appName: "Stone Age",
    projectId: "YOUR_PROJECT_ID",
    chains: [
        bleTestnet,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
            ? [bleTestnet]
            : [bleTestnet]),
    ],
    ssr: true,
});


// import { http, createConfig } from "@wagmi/core";
// import { mainnet, sepolia } from "@wagmi/core/chains";

// export const config_ = createConfig({
//   chains: [bscTestnet],
//   transports: {
//     [bscTestnet.id]: http()
//   },
// });
/* 
- dahboard shows lists of public agents
- manage agents shows list of my agents and allows me to create a new one
- creating/editing an agent, i put in my smart contract 
 - suii fetches functions in my smart contract
 - suii allows you to assign prompt to those functions 
 - you can now integrate suii with your dApp uwing our widget
*/
