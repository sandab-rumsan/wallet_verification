"use client";

import { ConnectKitButton } from "connectkit";
import { Account } from "./account";
import { FaWallet } from "react-icons/fa6";

function ConnectWallet() {
  return (
    <div>
      <ConnectKitButton.Custom>
        {({ show, isConnected, ensName }) => {
          if (isConnected) {
            return <Account />;
          }

          return <button onClick={show} style={{ display: 'flex', alignItems: 'center' }}>
            <FaWallet style={{ marginRight: '8px' }} />
            Connect Wallet
          </button>
        }}
      </ConnectKitButton.Custom>
    </div>
  );
}

export default ConnectWallet;
