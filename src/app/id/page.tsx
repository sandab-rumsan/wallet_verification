"use client";

import ConnectWallet from "@/components/wallet/connect-wallet";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSignMessage, useAccount } from "wagmi";

export default function Home() {
  const params = useSearchParams();
  const encryptedData = params.get("encrypted");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const { isConnected } = useAccount();
  const { data: signMessageData, signMessage } = useSignMessage();

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleWalletAddressChange = (event: any) => {
    setWalletAddress(event.target.value);
  };

  const handleVerifyClick = () => {
    const payload = { walletAddress, encryptedData };

    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/beneficiaries/validate-wallet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Wallet Address Verified Successfully");
        console.log(data);
        alert("Wallet Address Verified Successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Wallet Address Verification Failed");
        toast.error("Wallet Address Verification Failed");
      });
  };

  const handleSubmitSignature = async () => {
    //Verify Signature
    const payload = { signature: signMessageData, encryptedData };
    fetch(
      `${process.env.NEXT_PUBLIC_HOST_URL}/beneficiaries/verify-signature`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Signature Signed Successfully");
        console.log(data);
        alert("Signature Signed Successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Sign Signature Failed");
        toast.error("Sign Signature Failed");
      });
  };

  const handleSignMessage = () => {
    if (!isConnected) {
      alert("Please connect your wallet");
      return;
    }
    if (!encryptedData) {
      alert("Encrypted data not found");
      return;
    }
    signMessage({ message: encryptedData });
  };

  return (
    <main className="min-h-screen min-w-screen">
      <header className="bg-black py-8 shadow-md w-full">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-800">
            <Image
              src="/rahat_logo_standard.png"
              alt="rahat-logo"
              height={100}
              width={100}
            />
          </Link>
          <nav>
            <ul className="flex space-x-10">
              <li>
                <ConnectWallet />
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="mt-20 mx-10 md:mx-32 lg:mx-52 ">
        <div>
          <div className="flex justify-center mb-8 text-3xl font-semibold">
            Wallet Verification
          </div>
          <p>
            Welcome to Wallet Verification, This app simplifies the wallet
            verification process, allowing beneficiaries to sign messages using
            their wallets and creating a unique cryptographic signature.
            Harnessing the power of blockchain technology, this app provides
            real-time verification results and adds an extra layer of protection
            against fraud and unauthorized access. With support for various
            cryptocurrencies and a seamless, transparent verification process,
            Wallet Verification ensures the control over your digital assets.
          </p>
          <div className="flex justify-center gap-4 mt-10">
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              className="p-2 w-64 rounded bg-slate-500 text-center"
            >
              <option value="">Select Option</option>
              <option value="walletAddress">Wallet Address</option>
              <option value="signMessage">Sign Message</option>
            </select>
          </div>
          {selectedOption === "walletAddress" && (
            <div className="flex flex-col items-center mt-8">
              {/* Input field for wallet address */}
              <input
                type="text"
                value={walletAddress}
                onChange={handleWalletAddressChange}
                placeholder="Enter Wallet Address"
                className="p-2 mt-2 w-96 rounded border border-gray-400 text-black"
              />
              {/* Verify Wallet Address button */}
              <button
                onClick={handleVerifyClick}
                className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          )}
          {selectedOption === "signMessage" && (
            <div className="flex flex-col items-center mt-8">
              {/* Input field for wallet address */}
              <textarea
                value={`Sign this message using your wallet and submit the signed message to verify your wallet address:
                ${encryptedData}`}
                readOnly
                className="p-2 mt-2 w-96 h-40 rounded border border-gray-400 text-black"
              ></textarea>

              {signMessageData && (
                <>
                  <p className="mt-6 text-center font-semibold">Signature: </p>
                  <textarea
                    value={signMessageData || ""}
                    readOnly
                    className="p-2 mt-2 w-96 h-40 rounded border border-gray-400 text-black"
                  ></textarea>
                </>
              )}
              {/* Verify Wallet Address button */}
              <button
                // onClick={signMessageData ? signMessage(message: encryptedData || '') : handleSignMessage}
                onClick={
                  signMessageData == undefined
                    ? handleSignMessage
                    : handleSubmitSignature
                }
                className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {signMessageData == undefined
                  ? `Sign Message`
                  : "Submit Signature"}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>
    </main>
  );
}
