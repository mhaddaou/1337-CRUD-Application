import { Contact } from "@/app/lib/interfaces/contacts.interface"
import { Modal, ModalBody, ModalContent, ModalTrigger } from "../ui/animated-modal";
import { EyeIcon } from "./EyeIcons";
import { EditIcon } from "./EditIcon";
import AddContactForm, { ForWhat } from "./FormAddContact";

interface Props{
    contact : Contact
}
const  EditContactModal : React.FC<Props> = ({contact}) =>{
    return (
        <div className=" ">
      <Modal >
        <ModalTrigger className=" max-w-fit">
            <EditIcon/>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
          <AddContactForm  contact={contact} forWhat={ForWhat.UPDATE} />
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
    )

}

export default EditContactModal;