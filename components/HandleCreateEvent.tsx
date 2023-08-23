import styles from "../styles/InstructionsComponent.module.css";
import { useState } from "react";
import { useSigner } from "wagmi";
import tokenizedBallotABI from "../public/abi/contract.json"; //chnage to ABI for events
import { ethers } from "ethers";

export function HandleCreateEvent() {
  const [address, setAddress] = useState("");
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);
  const { data: signer } = useSigner(); // <-- Get signer's address

  const handleDelegateTokens = async () => {
    try {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_MY_VOTING_TOKEN_ADDRESS as string,
        myVotingTokenABI,
        signer
      );

      // No need to sign the transaction, just send it
      const tx = await contract.delegate(address);

      // You can still catch events or transaction hashes here, if needed
      console.log(tx.hash);
      setTransaction(tx);
      setError(null);
    } catch (error) {
      console.error(error);
      setTransaction(null);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <h3>Delegate Tokens</h3>
      <input
        type="text"
        value={address}
        className={styles.inputField}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address to delegate to"
      />

      <button className={styles.buttonField} onClick={handleDelegateTokens}>
        Delegate Tokens
      </button>

      {transaction && (
        <div>
          <p>Delegate Tokens Result:</p>
          <p>
            Transaction Hash:{" "}
            <a
              target="blank"
              href={`https://sepolia.etherscan.io/tx/${transaction.hash}`}>
              {transaction.hash}
            </a>
          </p>
          {/* Display additional transaction details as needed */}
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </>
  );
}
