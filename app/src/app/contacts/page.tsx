"use client";

import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { CreateContact } from "../components/main/CreateContactModal";
import { Avatar, Button, Tooltip } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import {
  fetchContacts,
  nextPage,
  previousPage,
  resetPage,
} from "../lib/redux/features/contacts/contactsSlice";
import { Contact } from "../lib/interfaces/contacts.interface";
import DisplaySkeleton from "../components/main/DisplaySkeleton";
import DisplayContactModal from "../components/sub/DisplayContactModal";
import EditContactModal from "../components/sub/EditContactModal";
import DeleteModal from "../components/sub/DeleteModal";

export default function Contacts() {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.contacts);
  const [query, setQuery] = useState("");

  const handlPrevious = () => {
    dispatch(previousPage());
    dispatch(
      fetchContacts({ page: contacts.page - 1, query: query.toLowerCase() })
    );
  };

  const handlNext = () => {
    dispatch(nextPage());
    dispatch(
      fetchContacts({ page: contacts.page + 1, query: query.toLowerCase() })
    );
  };

  useEffect(() => {
    if (contacts.loading === "idle") {
      dispatch(fetchContacts({ page: contacts.page }));
    }
  }, [dispatch, contacts.loading, contacts.page]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setQuery(value);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPage());
    dispatch(fetchContacts({ page: 1, query: query.toLowerCase() }));
  };

  const handlCloseSearch = () => {
    setQuery("");
    dispatch(resetPage());
    dispatch(fetchContacts({ page: 1 }));
  };

  return (
    <div className="bg-background overflow-x-hidden min-h-screen ">
      <div className="flex overflow-x-hidden flex-col w-full px-2  md:w-[90%] mx-auto md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 py-4">
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSearch} className="flex items-center  relative">
            <button
              onClick={handlCloseSearch}
              type="button"
              title="close search"
              className={`absolute z-[10] right-2 ${
                query !== "" ? "block" : "hidden"
              }`}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
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
                value={query}
                onChange={handleChange}
                type="text"
                placeholder="search by names"
                className="pl-10 "
              />
            </div>
          </form>
        </div>

        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <CreateContact query={query} />
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
                    return <ContactBody key={contact.id} contact={contact} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <DisplaySkeleton />
      )}

      {contacts.loading === "succeeded" && contacts.totalPages > 1 && (
        <div className="flex flex-col w-full px-2  md:w-[90%] mx-auto md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 py-4 ">
          <div className="w-full flex justify-end  ">
            <div className="flex w-[30%] justify-end gap-4">
              <Button
                disabled={contacts.page === 1}
                className="bg-primaryOne text-white"
                size="sm"
                variant="flat"
                onClick={handlPrevious}
              >
                Previous
              </Button>
              <Button
                disabled={contacts.totalPages === contacts.page}
                onClick={handlNext}
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
        {contact.company && (
          <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold ">
            {contact.company}
          </span>
        )}
      </td>
      {/* actions */}
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <div className="relative flex items-center gap-2 ">
          <Tooltip content="Details">
            <span className="text-lg text-default-400 cursor-pointer ">
              <DisplayContactModal contact={contact} />
            </span>
          </Tooltip>
          <Tooltip content="Edit user">
            <span className="text-lg text-default-400 cursor-pointer ">
              <EditContactModal contact={contact} />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete user">
            <span className="text-lg text-danger cursor-pointer ">
              <DeleteModal contact={contact} />
            </span>
          </Tooltip>
        </div>
      </td>
    </tr>
  );
};
