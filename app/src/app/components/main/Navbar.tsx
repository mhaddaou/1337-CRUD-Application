"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import AvatarDropDown from "../sub/AvatarDropDown";
import { fetchUserById } from "@/app/lib/api/userApi";
import { toast } from "sonner";
import { updateUser } from "@/app/lib/redux/features/user/userSLice";

export default function NavBar() {
  const user = useAppSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const loadUser = async () => {
    try {
      const userId = localStorage.getItem("id");
      console.log(userId);
      if (userId) {
        const userData = await fetchUserById(userId);
        dispatch(updateUser(userData));
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  loadUser();

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];



 const AcmeLogo = () => (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );

  return (
    <Navbar className="" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">CONTAXLY</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {
          !user.logged && <NavbarItem className="hidden lg:flex">
          <Link href="/auth/login">Login</Link>
        </NavbarItem>
        }
        <NavbarItem>
          {user.logged ? (
            <AvatarDropDown user={user} />
          ) : (
            <Button
              as={Link}
              color="primary"
              href="/auth/register"
              variant="flat"
            >
              Sign Up
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
