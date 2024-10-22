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


  // const Logo = () =>{
  //   return (
  //     <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="2048" height="2048" style="shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;fill-rule:evenodd;clip-rule:evenodd"><defs><style>.fil0,.fil1{fill:#212121;fill-rule:nonzero}.fil1{fill:#66bb6a}</style></defs><g id="Layer_x0020_1"><path class="fil0" d="M574.516 255.999h1010.97c16.504 0 31.49 6.735 42.34 17.584 10.85 10.85 17.584 25.837 17.584 42.34v1416.15c0 16.504-6.734 31.491-17.584 42.34-10.85 10.85-25.836 17.585-42.34 17.585H574.516c-16.505 0-31.492-6.736-42.341-17.583-10.848-10.85-17.584-25.837-17.584-42.341V315.923c0-16.505 6.736-31.492 17.584-42.342C543.025 262.735 558.01 256 574.516 256zm1010.97 48H574.516c-3.254 0-6.232 1.349-8.404 3.52-2.172 2.173-3.52 5.15-3.52 8.404v1416.15c0 3.254 1.348 6.232 3.52 8.404 2.172 2.172 5.15 3.52 8.404 3.52h1010.97c3.253 0 6.23-1.35 8.402-3.521 2.172-2.172 3.522-5.15 3.522-8.403V315.923c0-3.252-1.35-6.23-3.522-8.402-2.172-2.172-5.15-3.522-8.402-3.522z"/><path class="fil0" d="M426.591 455.887c-13.254 0-24 10.746-24 24s10.746 24 24 24h224.001c13.254 0 24-10.746 24-24s-10.746-24-24-24H426.591zM426.591 727.943c-13.254 0-24 10.746-24 24s10.746 24 24 24h224.001c13.254 0 24-10.746 24-24s-10.746-24-24-24H426.591zM426.591 1000c-13.254 0-24 10.746-24 24s10.746 24 24 24h224.001c13.254 0 24-10.746 24-24s-10.746-24-24-24H426.591zM426.591 1272.06c-13.254 0-24 10.746-24 24s10.746 24 24 24h224.001c13.254 0 24-10.746 24-24s-10.746-24-24-24H426.591zM426.591 1544.11c-13.254 0-24 10.746-24 24s10.746 24 24 24h224.001c13.254 0 24-10.746 24-24s-10.746-24-24-24H426.591z"/><g id="_475112304"><path id="_475112232" class="fil1" d="M1126.94 700.277c89.392 0 170.322 36.235 228.905 94.818s94.818 139.514 94.818 228.906-36.235 170.323-94.818 228.905c-58.581 58.583-139.513 94.818-228.905 94.818-89.39 0-170.323-36.235-228.905-94.818-58.583-58.582-94.818-139.513-94.818-228.905s36.235-170.323 94.818-228.906 139.513-94.818 228.905-94.818zm194.967 128.756c-49.893-49.893-118.826-80.756-194.967-80.756-76.141 0-145.074 30.863-194.967 80.756-49.894 49.895-80.756 118.827-80.756 194.968 0 76.141 30.861 145.074 80.756 194.967 49.893 49.895 118.827 80.756 194.967 80.756 76.141 0 145.074-30.861 194.967-80.756 49.895-49.893 80.756-118.826 80.756-194.967 0-76.141-30.861-145.074-80.756-194.968z"/><path id="_475112520" class="fil1" d="M928.831 1264.26c-1.812 13.098 7.34 25.188 20.438 27 13.098 1.812 25.188-7.34 27-20.438 2.995-21.63 13.951-40.88 29.812-54.698 15.598-13.589 35.942-21.844 58.11-21.844h7.256c7.223 5.147 14.787 9.402 22.648 12.575 10.573 4.268 21.562 6.612 32.85 6.612 11.289 0 22.278-2.344 32.85-6.612 7.86-3.173 15.425-7.428 22.647-12.575h7.257c21.965 0 42.145 8.113 57.69 21.495 15.806 13.605 26.813 32.6 30.04 54 1.966 13.1 14.183 22.124 27.281 20.157 13.098-1.966 22.123-14.182 20.157-27.28-4.99-33.093-21.903-62.369-46.165-83.253-23.951-20.619-55.082-33.12-89.003-33.12H1174.476a23.894 23.894 0 0 0-15.221 5.444l15.22 18.557-15.187-18.47c-5.597 4.592-11.4 8.222-17.307 10.607-4.877 1.969-9.91 3.05-15.036 3.05-5.129 0-10.161-1.082-15.037-3.05-5.417-2.187-10.746-5.421-15.91-9.484a23.921 23.921 0 0 0-16.585-6.653h-15.222c-34.205 0-65.577 12.72-89.61 33.657-24.304 21.173-41.113 50.841-45.75 84.323z"/><path id="_475112592" class="fil1" d="M1126.94 823.599c38.928 0 74.595 9.7 100.341 30.287 24.632 19.697 39.673 48.268 39.673 86.483 0 39.224-17.091 91.508-44.134 130.742-24.527 35.585-57.8 61.57-95.88 61.57-38.077 0-71.352-25.985-95.88-61.57-27.042-39.234-44.133-91.518-44.133-130.742 0-38.215 15.04-66.786 39.673-86.483 25.746-20.588 61.412-30.287 100.34-30.287zm70.527 67.6c-16.66-13.322-41.85-19.6-70.527-19.6s-53.867 6.278-70.527 19.6c-13.34 10.668-21.487 26.847-21.487 49.17 0 30.596 13.752 71.99 35.51 103.556 16.236 23.556 36.26 40.756 56.504 40.756 20.243 0 40.269-17.2 56.504-40.756 21.758-31.566 35.51-72.96 35.51-103.556 0-22.323-8.146-38.502-21.487-49.17z"/></g></g><path style="fill:none" d="M0 0h2048v2048H0z"/></svg>
  //   )
  // }

  
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
