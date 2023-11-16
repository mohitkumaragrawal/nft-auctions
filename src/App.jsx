import NFTImage from "./components/NFTImage";

import { ethers } from "ethers";
import FireMen from "./artifacts/contracts/FireMen.sol/FireMen.json";
import { useEffect, useState } from "react";

import { NextUIProvider } from "@nextui-org/react";
import Home from "./Home";

function App() {
  return (
    <NextUIProvider>
      <Home />
    </NextUIProvider>
  );
}

export default App;
