import { User } from "@/app/lib/interfaces/User.interface";
import { logout } from "@/app/lib/redux/features/user/userSLice";
import { useAppDispatch } from "@/app/lib/redux/hooks";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface Props {
  user: User;
}

export default function AvatarDropDown({ user }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handlLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className="flex items-center gap-4 ">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src="https://i.pravatar.cc/150?img=56"
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          className="bg-light"
        >
          <DropdownItem
            key="profile"
            className="h-14 gap-2"
            textValue="signed in as"
          >
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user.email}</p>
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={handlLogout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
