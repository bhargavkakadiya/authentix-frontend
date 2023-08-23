import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { ethers } from "ethers";
import { useContractRead, useContractReads } from "wagmi";

import { BigNumber, BigNumberish } from "alchemy-sdk";
import BuyTicket from "./BuyTicket";

import abiJSON from "../public/abi/contractConcertTicket.json";

const ticketContract = {
  address: process.env
    .NEXT_PUBLIC_CONCERT_TICKET_CONTRACT_ADDRESS_BASE as `0x${string}`,
  abi: abiJSON as any,
};

export default function EventCard() {
  const { data, isError, isLoading, error } = useContractReads({
    contracts: [
      {
        ...ticketContract,
        functionName: "name",
        args: [],
      },
      {
        ...ticketContract,
        functionName: "ticketPrice",
        args: [],
      },
    ],
  });

  if (isLoading) return <>Loading...</>;

  if (data?.[0]?.result === undefined || data?.[1]?.result === undefined) {
    return <>No events found, please try other chains</>;
  }

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
            Ticket Name: {data?.[0]?.result?.toString()}
          </Typography>
          {data?.[1]?.result && (
            <Typography sx={{ mb: 1.5 }} color="text.primary">
              Ticket Price:{" "}
              {ethers
                .formatEther(data[1].result as unknown as ethers.BigNumberish)
                .toString()}{" "}
              ETH
            </Typography>
          )}
          <Typography variant="body2">
            Event Venue: Vancouver, BC
            <br />
            Event Date: 31 Oct 2023, 12 pm
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <BuyTicket></BuyTicket>
        </CardActions>
      </Card>
    </>
  );
}
