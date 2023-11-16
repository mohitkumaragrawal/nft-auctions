import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import WalletBalance from "./WalletBalance";

export default function MyNavBar() {
  return (
    <Navbar>
      <NavbarBrand>NFT Auction</NavbarBrand>
      <NavbarContent justify="center">
        <WalletBalance />
      </NavbarContent>
    </Navbar>
  );
}
