"use client";

import ConnectWallet from "@/components/wallet/connect-wallet";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [start, setStart] = useState<boolean>(false);
  const [end, setEnd] = useState<boolean>(false);

  const onStartClick = () => {
    setStart(!start);
  };

  const onEndClick = () => {
    setEnd(!end);
  };

  return (
    <main className="min-h-screen min-w-screen">
      <header className="bg-white py-4 shadow-md w-full">
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
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-800"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Contact
                </Link>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="flex justify-center gap-4 mt-10">
            <button
              className={`p-2  w-24 rounded ${
                start ? "bg-green-500" : "bg-slate-500"
              }`}
              onClick={onStartClick}
            >
              Start
            </button>
            <button
              className={`p-2 w-24 rounded ${
                end ? "bg-red-500" : "bg-slate-500"
              }`}
              onClick={onEndClick}
            >
              End
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
