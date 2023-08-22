// displays a ticket card which is basically a NFT
// that is being sold on the marketplace
// this component is used in the marketplace page
// and the event page

// src/components/TicketCard.tsx
import React from "react";
import Image from "next/image";

const eventImage = "/public/event.jpg";

export default function TicketCard(nft: any) {
  const traits = getTraits(nft);
  return (
    <div className="max-w-lg rounded overflow-hidden shadow-lg">
      <Image
        src={eventImage}
        alt={nft.nft.title}
        width={345}
        height={345}></Image>
      <div className="px-4 py-4">
        <div className="font-bold text-teal-600 text-xl mb-2">
          {nft.nft.title}
        </div>
      </div>
      <div className="px-6 py-4">
        {/* {traits?.map((trait, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700 mr-2">
            {trait.trait_type}:{trait.value}
          </span>
        ))} */}
        {/* <div>{nft.nft.contract.address}</div> */}
      </div>
    </div>
  );
}

async function getTraits(nft: any) {
  const tokenUri = nft.nft.tokenUri.gateway;
  const response = await fetch(tokenUri).then((res) => res.json());
  return response.attributes;
}
