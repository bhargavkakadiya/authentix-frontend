import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abiJSON from "../public/abi/contractConcertTicket.json";
import { Button } from "@mui/material";
const ticketContract = {
  address: process.env
    .NEXT_PUBLIC_CONCERT_TICKET_CONTRACT_ADDRESS_BASE as `0x${string}`,
  abi: abiJSON as any,
};

export default function BuyTicket() {
  const { config } = usePrepareContractWrite({
    address: ticketContract.address,
    abi: ticketContract.abi,
    functionName: "buyTicket",
    args: [],
    value: BigInt(100000000000000000), // 0.1ETH
  });
  const { data, isLoading, isSuccess, write, error, isError } =
    useContractWrite(config);

  if (isError) return <>Error: {error?.message}</>;

  return (
    <div>
      <Button disabled={!write} onClick={() => write?.()}>
        Buy Ticket
      </Button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
}
