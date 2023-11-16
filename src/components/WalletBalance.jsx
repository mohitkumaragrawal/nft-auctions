import { useState } from "react";
import { ethers } from "ethers";

export default function WalletBalance() {
  const [balance, setBalance] = useState();

  const getBalance = async () => {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log(account);

    const provider = new ethers.BrowserProvider(window.ethereum);
    console.log(provider);

    const balance = await provider.getBalance(account);
    console.log(balance);

    setBalance(ethers.formatEther(balance));
  };

  return (
    <div>
      <p className="font-bold">your balance: {balance}</p>
      <button onClick={() => getBalance()}>Show My Balance</button>
    </div>
  );
}
