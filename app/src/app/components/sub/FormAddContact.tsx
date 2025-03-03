"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

import { LabelInputContainer } from "../main/SigninForm";
import { Textarea } from "@nextui-org/react";
import { createContact, updateContactApi } from "@/app/lib/api/contactsApi";
import { toast } from "sonner";
import { useModal } from "../ui/animated-modal";
import { useAppDispatch } from "@/app/lib/redux/hooks";
import {
  addContact,
  updateContact,
} from "@/app/lib/redux/features/contacts/contactsSlice";
import { Contact } from "@/app/lib/interfaces/contacts.interface";

export enum ForWhat {
  "UPDATE" = "update",
  "DISPLAY" = "display",
  "CREATE" = "create",
}

interface Props {
  contact?: Contact;
  forWhat: ForWhat;
  query?: string;
}

const AddContactForm: React.FC<Props> = ({ query, contact, forWhat }) => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(contact?.category || "Family");
  const [vip, setVip] = useState(contact?.vip || false);
  const { setOpen } = useModal();
  const dispatch = useAppDispatch();

  const [formValues, setFormValues] = useState(
    contact || {
      name: "",
      phone: "",
      email: "",
      company: "",
      jobTitle: "",
      address: "",
      category: "family",
      note: "",
      vip: false,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (forWhat === ForWhat.CREATE) {
        const result = await createContact({
          ...formValues,
          name: formValues.name.toLowerCase(),
          category,
          vip,
        });
        if (query?.trim() === "") {
          dispatch(addContact(result.data));
        }
        toast.success(result.message);
      } else {
        const result = await updateContactApi(
          {
            ...formValues,
            category,
            vip,
          },
          contact?.id
        );
        dispatch(updateContact(result.data));
        toast.success(result.message);
      }
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full    bg-white  ">
      <form className="mt-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="name">Name</Label>
            <Input
              required
              value={formValues.name}
              onChange={handleChange}
              readOnly={forWhat === ForWhat.DISPLAY}
              name="name"
              placeholder="Full name"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="phone">Phone number</Label>
            <Input
              required
              value={formValues.phone}
              readOnly={forWhat === ForWhat.DISPLAY}
              onChange={handleChange}
              name="phone"
              placeholder="+212 648787878"
              type="text"
            />
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="email">Email</Label>
            <Input
              value={formValues.email}
              onChange={handleChange}
              readOnly={forWhat === ForWhat.DISPLAY}
              name="email"
              placeholder="email@example.com"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="adress">Address</Label>
            <Input
              value={formValues.address}
              onChange={handleChange}
              readOnly={forWhat === ForWhat.DISPLAY}
              name="address"
              placeholder="address"
              type="text"
            />
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="jobTitle">Job title</Label>
            <Input
              onChange={handleChange}
              value={formValues.jobTitle}
              readOnly={forWhat === ForWhat.DISPLAY}
              name="jobTitle"
              placeholder="software engineer"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="jobTitle">Company name</Label>
            <Input
              onChange={handleChange}
              value={formValues.company}
              readOnly={forWhat === ForWhat.DISPLAY}
              name="company"
              placeholder="Company"
              type="text"
            />
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="category">Category</Label>
            {contact && forWhat !== ForWhat.CREATE ? (
              <Category
                category={contact.category}
                forWhat={forWhat}
                setCategory={setCategory}
              />
            ) : (
              <Category
                category={category}
                forWhat={forWhat}
                setCategory={setCategory}
              />
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="vip">Vip</Label>
            {contact && forWhat !== ForWhat.CREATE ? (
              <Vip vip={contact.vip} forWhat={forWhat} setVip={setVip} />
            ) : (
              <Vip vip={vip} forWhat={forWhat} setVip={setVip} />
            )}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Textarea
            label="Note"
            name="note"
            onChange={handleChange}
            variant="bordered"
            placeholder="Enter your note"
            value={formValues.note}
            readOnly={forWhat === ForWhat.DISPLAY}
            disableAnimation
            disableAutosize
            classNames={{
              base: "max-w-full",
              input: "resize-y min-h-[100px]",
            }}
          />
        </LabelInputContainer>

        {forWhat !== ForWhat.DISPLAY && (
          <Button
            isLoading={loading}
            className="bg-gradient-to-br mt-5 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            <div
              className={`w-full  items-center justify-center ${
                loading ? "hidden" : "flex"
              }`}
            >
              {forWhat === ForWhat.CREATE ? (
                <>
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
                </>
              ) : (
                <p>Update contact</p>
              )}
            </div>

            <BottomGradient />
          </Button>
        )}
      </form>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

interface CategoryProps {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  forWhat: ForWhat;
}

const Category: React.FC<CategoryProps> = ({
  category,
  forWhat,
  setCategory,
}) => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([category]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleSelectionChange = (keys: any) => {
    const newSelectedKeys = new Set([keys.currentKey]);
    setSelectedKeys(newSelectedKeys);
    setCategory(newSelectedKeys.keys().next().value);
  };

  return (
    <Dropdown isTriggerDisabled={forWhat === ForWhat.DISPLAY}>
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
      >
        <DropdownItem key="family">Family</DropdownItem>
        <DropdownItem key="friends">Friends</DropdownItem>
        <DropdownItem key="work">Work</DropdownItem>
        <DropdownItem key="emergency">Emergency</DropdownItem>
        <DropdownItem key="education">Education</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

interface VipProps {
  setVip: React.Dispatch<React.SetStateAction<boolean>>;
  vip: boolean;
  forWhat: ForWhat;
}

const Vip: React.FC<VipProps> = ({ vip, forWhat, setVip }) => {
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set([vip ? "yes" : "no"])
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleSelectionChange = (keys: any) => {
    const newSelectedKeys = new Set([keys.currentKey]);
    setSelectedKeys(newSelectedKeys);
    setVip(newSelectedKeys.keys().next().value === "yes" ? true : false);
  };

  return (
    <Dropdown isTriggerDisabled={forWhat === ForWhat.DISPLAY}>
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
      >
        <DropdownItem key="no">No</DropdownItem>
        <DropdownItem key="yes">Yes</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AddContactForm;
