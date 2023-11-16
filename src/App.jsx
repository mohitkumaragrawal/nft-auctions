import WalletBalance from "./components/WalletBalance";

import { ethers } from "ethers";
import FireMen from "./artifacts/contracts/FireMen.sol/FireMen.json";
import { useEffect, useState } from "react";

import { NextUIProvider } from "@nextui-org/react";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const provider = new ethers.BrowserProvider(window.ethereum);

const signer = await provider.getSigner();
console.log(signer);

const contract = new ethers.Contract(contractAddress, FireMen.abi, signer);

console.log(contract);

function App() {
  const [count, setCount] = useState(0);
  const getCount = async () => {
    const cnt = await contract.count();
    setCount(Number(cnt));
  };

  const handleMint = () => {
    setCount((cnt) => cnt + 1);
  };

  useEffect(() => {
    getCount();
  }, [count]);

  const minted = [];
  for (let i = 0; i < Number(count) + 1; ++i) {
    minted.push(i);
  }

  return (
    <NextUIProvider>
      <WalletBalance />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {minted.map((idx) => (
          <NFTImage key={idx} tokenId={idx} handleMint={handleMint} />
        ))}
      </div>
    </NextUIProvider>
  );
}

function NFTImage({ tokenId, handleMint }) {
  const contentId = "Qmdmx4h6DFwF856apmbGtTWst1iiVGatNVXfRzkDEnn1YV";
  const metadataURI = `${contentId}/${tokenId}.json`;

  const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;

  const [isMinted, setIsMinted] = useState(false);

  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log(result);

    setIsMinted(result);
  };

  const mintToken = async () => {
    const connection = contract.connect(signer.address);
    const addr = signer.address;

    console.log(addr);

    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.parseEther("0.25"),
    });

    await result.wait();
    getMintedStatus();

    handleMint();
  };

  const getUri = async () => {
    const uri = await contract.tokenURI(tokenId);
    const owner = await contract.ownerOf(tokenId);
    console.log(owner);
    console.log(uri);
  };

  if (!isMinted) {
    return (
      <div
        style={{
          border: "2px solid rgba(200, 200, 200, 0.6)",
          borderRadius: "10px",
          padding: "20px",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        <h5>ID #{tokenId}</h5>
        <p>Not Minted</p>
        <button onClick={mintToken}>Mint</button>
      </div>
    );
  } else {
    return (
      <div
        style={{
          border: "2px solid rgba(200, 200, 200, 0.6)",
          borderRadius: "10px",
          padding: "20px",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        <h5>ID #{tokenId}</h5>
        <img
          src={imageURI}
          width={200}
          height={200}
          style={{ display: "block" }}
        />
        <button onClick={getUri}>Taken! Show URI</button>
      </div>
    );
  }
}

export default App;
