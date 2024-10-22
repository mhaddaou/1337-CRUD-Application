'use client'
import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  ChipProps,
  Button,
} from "@nextui-org/react";
import { DeleteIcon } from "../sub/DeleteIcon";
import { EyeIcon } from "../sub/EyeIcons";
import { columns } from "@/app/lib/data";
import { EditIcon } from "../sub/EditIcon";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { fetchContacts } from "@/app/lib/redux/features/contacts/contactsSlice";
import { Contacts } from "@/app/lib/interfaces/contacts.interface";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};



export default function DispalyContact() {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(state => state.contacts);

  useEffect(() => {
    if (contacts.loading === 'idle') {
      dispatch(fetchContacts());
      console.log(contacts.data);
      console.log('nice');
    }
  }, [contacts.loading, dispatch]);

  const renderCell = React.useCallback((contact: Contacts, columnKey: React.Key) => {
    const cellValue = contact[columnKey as keyof Contacts];

    // switch (columnKey) {
    //   case "name":
    //     return (
    //       <User description={contact.email} name={cellValue}>
    //         {contact.email}
    //       </User>
    //     );
    //   case "jobTitle":
    //     return (
    //       <div className="flex flex-col">
    //         <p className="text-bold text-sm capitalize">{cellValue}</p>
    //       </div>
    //     );
    //   case "company":
    //     return (
    //       <Chip
    //         className="capitalize bg-background"
    //         color={statusColorMap[contact.company]}
    //         size="sm"
    //         variant="flat"
    //       >
    //         {cellValue}
    //       </Chip>
    //     );
    //   case "actions":
    //     return (
    //       <div className="relative flex items-center gap-2 ">
    //         <Tooltip content="Details">
    //           <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
    //             <EyeIcon />
    //           </span>
    //         </Tooltip>
    //         <Tooltip content="Edit user">
    //           <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
    //             <EditIcon />
    //           </span>
    //         </Tooltip>
    //         <Tooltip color="danger" content="Delete user">
    //           <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => console.log('span clicked')}>
    //             <DeleteIcon />
    //           </span>
    //         </Tooltip>
    //       </div>
    //     );
    //   default:
    //     return cellValue;
    // }
  }, []);

  return (
    <section className="w-full px-2 md:w-[90%] mx-auto">
      <Table aria-label="table with your contacts">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align="start" className="bg-background">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        {
          <TableBody>
            {contacts.data.map((item) => (
              <TableRow key={item.id}>
                {columns.map((column) => (
                  <TableCell key={column.uid}>
                    {renderCell(item, columnKey)}
                  </TableCell>
                ))}
              </TableRow>
            ))}

          </TableBody>
        }
        {/* <TableBody items={contacts.data} >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody> */}
      </Table>
      <div className="w-full flex justify-end pt-5 pr-2">
        <div className="hidden sm:flex w-[30%] justify-end gap-4">
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
    </section>
  );
}
