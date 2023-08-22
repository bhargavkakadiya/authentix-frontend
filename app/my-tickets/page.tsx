"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAccount } from "wagmi";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import TicketCard from "../../components/TicketCard";

// Setup Alchemy SDK
import { Network, Alchemy, OwnedNft } from "alchemy-sdk";
const settings = {
  apiKey: process.env.NEXT_,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function CreateEvent() {
  // {/* wallet address  */} of connected user

  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return (
      <>
        <ThemeProvider theme={darkTheme}>
          <div>
            <h1 className="text-4xl tracking-tight font-extrabold text-white-900 sm:text-5xl md:text-6xl">
              <span>My Tickets</span>
            </h1>
          </div>
          <br />
          <div className="flex flex-col justify-left">
            <h3 className="tracking-tight text-white-900">
              <span>Connect to your wallet to view your tickets</span>
            </h3>
          </div>
        </ThemeProvider>
      </>
    );
  } else {
    return (
      <>
        <ThemeProvider theme={darkTheme}>
          <div>
            <h1 className="text-4xl tracking-tight font-extrabold text-white-900 sm:text-5xl md:text-6xl">
              <span>My Tickets</span>
            </h1>
          </div>
          <br />
          <div>
            <DisplayTicketsByUser />
          </div>
          {/* <WalletInfo /> */}
        </ThemeProvider>
      </>
    );
  }
}

function WalletInfo() {
  const { address, isConnected } = useAccount();
  return (
    <>
      <div>
        <h4>My Address: {address}</h4>
        <br />
        <h4>
          {isConnected ? "Connected to wallet" : "Not connected to wallet"}
        </h4>
      </div>
    </>
  );
}

function DisplayTicketsByUser() {
  // fetches NFTs by an address

  const { address, isConnected } = useAccount();
  const [nfts, setNFTs] = useState<OwnedNft[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (address) {
      fetchNFTsByOwner(address.toString())
        .then((data) => {
          if (data) {
            setNFTs(data.ownedNfts);
          } else {
            setNFTs([]);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          setNFTs([]);
          console.error("Error fetching collection:", err);
        });
    }
  }, [address]);

  return (
    <>
      <div className="container mx-auto">
        {!isLoading && nfts.length === 0 && (
          <h1 className="text-5xl text-center mx-auto mt-32">
            No Collection Found
          </h1>
        )}
        <div className="grid grid-cols-3 gap-4">
          {nfts.map((token, index) => (
            <TicketCard key={index} nft={token} />
          ))}
        </div>
      </div>{" "}
    </>
  );
}

async function fetchNFTsByOwner(address: string) {
  // Get all the NFTs owned by an address
  //   address to string
  const data = await alchemy.nft.getNftsForOwner(address, {
    contractAddresses: ["0x102fc17bcb529c90b99039d6ed4cd12bd33f90ed"],
  });
  return data;
}
