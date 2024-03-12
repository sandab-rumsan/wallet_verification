"use client";

import ConnectWallet from "@/components/wallet/connect-wallet";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const params = useSearchParams();
  const encryptedData = params.get("encrypted");
  const [start, setStart] = useState<boolean>(false);
  const [end, setEnd] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");

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
          {/* <div className="flex justify-center gap-4 mt-10">
            <button
              className={`p-2  w-24 rounded ${start ? "bg-green-500" : "bg-slate-500"
                }`}
              onClick={onStartClick}
            >
              Start
            </button>
            <button
              className={`p-2 w-24 rounded ${end ? "bg-red-500" : "bg-slate-500"
                }`}
              onClick={onEndClick}
            >
              End
            </button>
          </div> */}

          <div className="flex justify-center gap-4 mt-10">
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              className="p-2 w-64 rounded bg-slate-500 text-center"
            >
              <option value="">Select Option</option>
              <option value="verify">Wallet Address</option>
              <option value="end">Sign Message</option>
            </select>
          </div>
          {selectedOption === "verify" && (
            <div className="flex flex-col items-center mt-4">
              {/* Input field for wallet address */}
              <input
                type="text"
                value={walletAddress}
                onChange={handleWalletAddressChange}
                placeholder="Enter Wallet Address"
                className="p-2 mt-2 w-64 rounded border border-gray-400 text-black"
              />
              {/* Verify Wallet Address button */}
              <button
                onClick={handleVerifyClick}
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Verify Wallet Address
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>
    </main>
  );
}
