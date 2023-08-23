import React from "react";
import { useSignMessage } from "wagmi";
// import tokenizedBallotABI from "../public/abi/contract.json"; //chnage to ABI for events
import { ethers } from "ethers";

export default function SignMessage() {
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: "gm wagmi frens",
  });

  return (
    <div>
      <button disabled={isLoading} onClick={() => signMessage()}>
        Sign message
      </button>
      {isSuccess && <div>Signature: {data}</div>}
      {isError && <div>Error signing message</div>}
    </div>
  );
}
