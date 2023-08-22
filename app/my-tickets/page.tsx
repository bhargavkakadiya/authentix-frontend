"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAccount } from "wagmi";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import TicketCard from "../../components/TicketCard";

// Setup Alchemy SDK
import { Network, Alchemy } from "alchemy-sdk";
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
  const [nfts, setNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

// {
//   "contract": {
//     "address": "0x102fc17bcb529c90b99039d6ed4cd12bd33f90ed",
//     "name": "DEATH GIRL",
//     "symbol": "DG",
//     "totalSupply": "6669",
//     "tokenType": "ERC721",
//     "openSea": {
//       "floorPrice": 0.0033,
//       "collectionName": "DEATH GIRL NFT",
//       "safelistRequestStatus": "not_requested",
//       "imageUrl": "https://i.seadn.io/gcs/files/314a1fde1d9270fd59d1a4a3e18f93d0.gif?w=500&auto=format",
//       "description": "DEATH GIRL NFT is a generative character collection of 6669 unique NFTs by artist MORDY4000. DEATH GIRL is a bloodlust tale of revenge for the Web3 manga & comic community. \n\nWho is DEATH GIRL?\n\nDeath Girl is a Web Cam Model that gets caught up in a criminal underworld and ends up getting murdered for double crossing the violent crime organization that gave her a job. Following her demise she resurrects back to life and seeks a blood oath revenge against the mafia and goons that killed her. What can stop her now if death can’t stop her?",
//       "externalUrl": "http://www.deathgirl.com",
//       "twitterUsername": "DEATHGIRL_NFT",
//       "lastIngestedAt": "2023-08-21T00:54:14.000Z"
//     },
//     "contractDeployer": "0x6d1318c5170ae10b8c6c9394f63bb7e81e62ef1f",
//     "deployedBlockNumber": 15357043
//   },
//   "tokenId": "3901",
//   "tokenType": "ERC721",
//   "title": "DEATH GIRL #3901",
//   "description": "DEATH GIRL is a generative character collection of 6669 unique NFTs by artist MORDY4000. DEATH GIRL is a bloodlust tale of revenge for the Web3 manga & comic community. What will stop her if death can’t stop her?",
//   "timeLastUpdated": "2022-11-19T19:03:08.042Z",
//   "rawMetadata": {
//     "name": "DEATH GIRL #3901",
//     "description": "DEATH GIRL is a generative character collection of 6669 unique NFTs by artist MORDY4000. DEATH GIRL is a bloodlust tale of revenge for the Web3 manga & comic community. What will stop her if death can’t stop her?",
//     "image": "ipfs://bafybeia6n373x6vupybefn45ksi72hw4s3cpi5gtrae6alzv2jwetvvive",
//     "attributes": [
//       {
//         "value": "Seafoam Green",
//         "trait_type": "BACKGROUND 1"
//       },
//       {
//         "value": "Spiral",
//         "trait_type": "BACKGROUND 2"
//       },
//       {
//         "value": "Green",
//         "trait_type": "BODY COLOR"
//       },
//       {
//         "value": "Devil Wings",
//         "trait_type": "COSTUME"
//       },
//       {
//         "value": "Spiders - Black",
//         "trait_type": "CRITTERS"
//       },
//       {
//         "value": "Bullets - Slime",
//         "trait_type": "DEATH 1"
//       },
//       {
//         "value": "Bleeding Hearts",
//         "trait_type": "EARRINGS"
//       },
//       {
//         "value": "Shocked",
//         "trait_type": "EYES"
//       },
//       {
//         "value": "Short - White",
//         "trait_type": "HAIR"
//       },
//       {
//         "value": "Devil Horns - Red",
//         "trait_type": "HEAD ACCESSORY"
//       },
//       {
//         "value": "Drool",
//         "trait_type": "MOUTH"
//       },
//       {
//         "value": "Fur - Leopard",
//         "trait_type": "JACKETS"
//       },
//       {
//         "value": "Dress - Orange Mesh",
//         "trait_type": "TOPS"
//       }
//     ]
//   },
//   "tokenUri": {
//     "gateway": "https://ipfs.io/ipfs/QmSsxA2MUhieomWn1tamZAM4L3JLuBgiVFNb2FqmCN8HCs/3901.json",
//     "raw": "ipfs://QmSsxA2MUhieomWn1tamZAM4L3JLuBgiVFNb2FqmCN8HCs/3901.json"
//   },
//   "media": [
//     {
//       "gateway": "https://nft-cdn.alchemy.com/eth-mainnet/c390b1f87484370f8ec632d16bdd7d34",
//       "thumbnail": "https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/eth-mainnet/c390b1f87484370f8ec632d16bdd7d34",
//       "raw": "ipfs://bafybeia6n373x6vupybefn45ksi72hw4s3cpi5gtrae6alzv2jwetvvive",
//       "format": "png",
//       "bytes": 1624791
//     }
//   ],
//   "balance": 1
// }
