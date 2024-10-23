"use client";

import { useEffect } from "react";
import { Input } from "../components/ui/input";
import { CreateContact } from "../components/main/CreateContactModal";
import { Avatar, Button, Tooltip } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { fetchContacts } from "../lib/redux/features/contacts/contactsSlice";
import { DeleteIcon } from "../components/sub/DeleteIcon";
import { EyeIcon } from "../components/sub/EyeIcons";
import { EditIcon } from "../components/sub/EditIcon";
import { Contact } from "../lib/interfaces/contacts.interface";
import DisplaySkeleton from "../components/main/DisplaySkeleton";
import DisplayContactModal from "../components/sub/DisplayContactModal";
import EditContactModal from "../components/sub/EditContactModal";

export default function Contacts() {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.contacts);
  useEffect(() => {
    if (contacts.loading === "idle") {
      dispatch(fetchContacts());
    }
  }, [dispatch]);
  return (
    <div className="bg-background overflow-x-hidden min-h-screen ">
      <div className="flex overflow-x-hidden flex-col w-full px-2  md:w-[90%] mx-auto md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 py-4">
        <div className="w-full md:w-1/2">
          <form className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative  w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <Input
                id="search"
                type="text"
                name="password"
                className="pl-10 "
              />
            </div>
          </form>
        </div>

        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <CreateContact />
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <button
              id="actionsDropdownButton"
              data-dropdown-toggle="actionsDropdown"
              className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              type="button"
            >
              <svg
                className="-ml-1 mr-1.5 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
              Actions
            </button>

            <button
              id="filterDropdownButton"
              data-dropdown-toggle="filterDropdown"
              className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-4 w-4 mr-2 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clipRule="evenodd"
                />
              </svg>
              Filter
              <svg
                className="-mr-1 ml-1.5 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {contacts.loading === "succeeded" ? (
        <div className="flex  flex-col w-full px-2  md:w-[90%] mx-auto md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 py-4 ">
          <div className="overflow-y-hidden bg-white w-full p-4 rounded-xl border-[0.5px] border-black/20">
            <div className="overflow-x-auto ">
              <table className="w-full ">
                <thead className="bg-background ">
                  <tr className="text-left text-xs text-slate-900/70  font-semibold uppercase tracking-widest ">
                    <th className="px-6 py-3  rounded-l-lg">Full Name</th>
                    <th className="px-6 py-3">Phone</th>
                    <th className="px-6 py-3">JOB TITLE</th>
                    <th className="px-6 py-3">COMPANY</th>
                    <th className="px-6 py-3 rounded-r-md">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="text-gray-500 border-none">
                  {contacts.data.map((contact) => {
                    return <ContactBody contact={contact} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <DisplaySkeleton />
      )}

      {contacts.loading === "succeeded" && contacts.data.length > 15 && (
        <div className="flex flex-col w-full px-2  md:w-[90%] mx-auto md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 py-4 ">
          <div className="w-full flex justify-end  ">
            <div className="flex w-[30%] justify-end gap-4">
              <Button
                className="bg-primaryOne text-white"
                size="sm"
                variant="flat"
              >
                Previous
              </Button>
              <Button
                className="bg-primaryOne text-white"
                size="sm"
                variant="flat"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface Props {
  contact: Contact;
}

const ContactBody: React.FC<Props> = ({ contact }) => {
  return (
    <tr className="border-none text-slate-900/70" key={contact.id}>
      <td className="border-b border-gray-200 bg-white gap-3 px-5 py-5 flex text-sm">
        {/* full name and email */}
        <Avatar />
        <div className="">
          <p className="text-bold text-sm capitalize">{contact.name}</p>
          <p className="text-bold text-sm ">{contact.email}</p>
        </div>
      </td>
      {/* phone */}
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm text-bold ">
        {contact.phone}
      </td>
      {/* job title */}
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="text-bold text-sm capitalize">{contact.jobTitle}</p>
      </td>
      {/* company */}
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        {contact.company &&
          <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold ">
          {contact.company}
        </span>
        }
      </td>
      {/* actions */}
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <div className="relative flex items-center gap-2 ">
          <Tooltip content="Details" >
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              {/* <EyeIcon /> */}
              <DisplayContactModal contact={contact}/>
            </span>
          </Tooltip>
          <Tooltip content="Edit user">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              {/* <EditIcon /> */}
              <EditContactModal contact={contact}/>
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete user">
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => console.log("span clicked")}
            >
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      </td>
    </tr>
  );
};
