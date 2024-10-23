"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
import { Input } from "../ui/input";
import AddContactForm, { ForWhat } from "../sub/FormAddContact";
export function CreateContact() {
  return (
    <div className=" w-full  flex items-center justify-center">
      <Modal>
        <ModalTrigger className="flex items-center justify-center  bg-primaryOne text-white  font-medium rounded-lg text-sm px-4 py-2 hover:bg-primaryOne/80 ">
          <svg
            className="h-3.5 w-3.5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            />
          </svg>
          Add contact
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <AddContactForm forWhat={ForWhat.CREATE} />
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
