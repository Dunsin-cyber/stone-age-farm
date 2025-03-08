"use client";

import { useEffect } from "react";
import { useConnect, useWriteContract } from "wagmi";
import { injected } from "wagmi/connectors";
import { config } from "@/utils/wagmi";

export default function WalletConnectPage() {
    const { connect, isSuccess } = useConnect();
    const { data: data_, writeContractAsync } = useWriteContract({
        config,
    });

    // useEffect(() => {
    //     connect();

    //     if (isSuccess) {
    //         window.parent.postMessage("walletConnected", window.location.origin);
    //     }
    // }, [isSuccess, connect]);

    return <p>Connecting to wallet...</p>;
}
