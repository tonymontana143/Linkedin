// src/components/ConnectWallet.js

import React from 'react';

function ConnectWallet({ onConnect, account }) {
  return (
    <div>
      {account ? (
        <p>Wallet Connected: {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}</p>
      ) : (
        <button onClick={onConnect}>Connect Wallet</button>
      )}
    </div>
  );
}

export default ConnectWallet;
