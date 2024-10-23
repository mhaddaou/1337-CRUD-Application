"use client";
import { Contact } from "@/app/lib/interfaces/contacts.interface";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "../ui/animated-modal";
import { DeleteIcon } from "./DeleteIcon";
import Delete from "./Delete";
interface Props {
  contact: Contact;
}
const DeleteModal: React.FC<Props> = ({ contact }) => {
  return (
    <div className=" ">
      <Modal>
        <ModalTrigger className=" max-w-fit">
          <DeleteIcon />
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <Delete contact={contact} />
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DeleteModal;
