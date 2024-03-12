"use client";

import { ConnectKitButton } from "connectkit";
import { Account } from "./account";

function ConnectWallet() {
  return (
    <div>
      <ConnectKitButton.Custom>
        {({ show, isConnected, ensName }) => {
          if (isConnected) {
            return <Account />;
          }
          return <button onClick={show}>Connect Wallet</button>;
        }}
      </ConnectKitButton.Custom>
    </div>
  );
}

export default ConnectWallet;
