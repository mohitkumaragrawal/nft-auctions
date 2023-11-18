import { NextUIProvider } from "@nextui-org/react";
import Home from "./Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyNavBar from "./components/NavBar";
import StartAuction from "./components/StartAuction";
import Auction from "./components/Auction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/startAuction/:tokenId",
    element: <StartAuction />,
  },
  { path: "/auction/:address", element: <Auction /> },
]);

function App() {
  return (
    <NextUIProvider>
      <MyNavBar />
      <RouterProvider router={router} />
    </NextUIProvider>
  );
}

export default App;
