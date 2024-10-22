"use client";

import { useState } from "react";
import { LabelInputContainer } from "../components/main/SigninForm";
import DispalyContact from "../components/main/Table";
import TableBody from "../components/sub/TableBody";
import { Input } from "../components/ui/input";
import { CreateContact } from "../components/main/CreateContactModal";
const contacts = {
  name: "John Doe",
  phone: "08012345678",
  email: "mhaddaou@student.1337.ma",
  jobTitle: "Software Engineer",
  company: "1337",
};

export default function Contacts() {
  const [isChecked, setIsChecked] = useState(false);
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
              {/* <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primaryThree block w-full pl-10 p-2  "
                      placeholder="Search"
                      required
                    /> */}
            </div>
          </form>
        </div>
        
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <CreateContact/>
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
      <div className="flex flex-col w-full px-2  md:w-[90%] mx-auto md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 py-4 ">
      <div className="overflow-y-hidden w-full rounded-lg border">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
            <th className="px-5 py-3">Full Name</th>
            <th className="px-5 py-3">Phone</th>
            <th className="px-5 py-3">User Role</th>
            <th className="px-5 py-3">Created at</th>
            <th className="px-5 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-500">
          <tr>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">3</p>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img className="h-full w-full rounded-full" src="/images/-ytzjgg6lxK1ICPcNfXho.png" alt="" />
                </div>
                <div className="ml-3">
                  <p className="whitespace-no-wrap">Besique Monroe</p>
                </div>
              </div>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">Administrator</p>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">Sep 28, 2022</p>
            </td>

            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">Active</span>
            </td>
          </tr>
          <tr>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">7</p>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img className="h-full w-full rounded-full" src="/images/ddHJYlQqOzyOKm4CSCY8o.png" alt="" />
                </div>
                <div className="ml-3">
                  <p className="whitespace-no-wrap">James Cavier</p>
                </div>
              </div>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">Author</p>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">Sep 28, 2022</p>
            </td>

            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">Active</span>
            </td>
          </tr>
          <tr>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">12</p>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img className="h-full w-full rounded-full" src="/images/oPf2b7fqx5xa3mo68dYHo.png" alt="" />
                </div>
                <div className="ml-3">
                  <p className="whitespace-no-wrap">Elvis Son</p>
                </div>
              </div>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">Editor</p>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">Sep 28, 2022</p>
            </td>

            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <span className="rounded-full bg-yellow-200 px-3 py-1 text-xs font-semibold text-yellow-900">Suspended</span>
            </td>
          </tr>
          <tr>
            <td className="bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">66</p>
            </td>
            <td className="bg-white px-5 py-5 text-sm">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img className="h-full w-full rounded-full" src="/images/fR71TFZIDTv2jhvKsOMhC.png" alt="" />
                </div>
                <div className="ml-3">
                  <p className="whitespace-no-wrap">Dana White</p>
                </div>
              </div>
            </td>
            <td className="bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">Administrator</p>
            </td>
            <td className="bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">Sep 28, 2022</p>
            </td>

            <td className="bg-white px-5 py-5 text-sm">
              <span className="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900">Inactive</span>
            </td>
          </tr>
          <tr>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">12</p>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img className="h-full w-full rounded-full" src="/images/oPf2b7fqx5xa3mo68dYHo.png" alt="" />
                </div>
                <div className="ml-3">
                  <p className="whitespace-no-wrap">Elvis Son</p>
                </div>
              </div>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">Editor</p>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">Sep 28, 2022</p>
            </td>

            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <span className="rounded-full bg-yellow-200 px-3 py-1 text-xs font-semibold text-yellow-900">Suspended</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
      <span className="text-xs text-gray-600 sm:text-sm"> Showing 1 to 5 of 12 Entries </span>
      <div className="mt-2 inline-flex sm:mt-0">
        <button className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Prev</button>
        <button className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Next</button>
      </div>
    </div>
  </div>

      </div>
      {/* <div className="mx-auto w-full bg-green-400 max-w-screen-lg px-4 py-8 sm:px-8">
  
  <div className="overflow-y-hidden w-full bg-red-500 rounded-lg border">
    <div className="overflow-x-auto w-full">
      <table className="w-full">
        <thead>
          <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
            <th className="px-5 py-3">ID</th>
            <th className="px-5 py-3">Full Name</th>
            <th className="px-5 py-3">User Role</th>
            <th className="px-5 py-3">Created at</th>
            <th className="px-5 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-500">
         
          <tr>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">12</p>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img className="h-full w-full rounded-full" src="/images/oPf2b7fqx5xa3mo68dYHo.png" alt="" />
                </div>
                <div className="ml-3">
                  <p className="whitespace-no-wrap">Elvis Son</p>
                </div>
              </div>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">Editor</p>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">Sep 28, 2022</p>
            </td>

            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <span className="rounded-full bg-yellow-200 px-3 py-1 text-xs font-semibold text-yellow-900">Suspended</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
      <span className="text-xs text-gray-600 sm:text-sm"> Showing 1 to 5 of 12 Entries </span>
      <div className="mt-2 inline-flex sm:mt-0">
        <button className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Prev</button>
        <button className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Next</button>
      </div>
    </div>
  </div>
</div> */}

      <DispalyContact />
    </div>
  );
}
