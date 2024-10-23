import { Contact } from "@/app/lib/interfaces/contacts.interface"
import { Modal, ModalBody, ModalContent, ModalTrigger } from "../ui/animated-modal";
import { EyeIcon } from "./EyeIcons";
import  AddContactForm, { ForWhat }  from "./FormAddContact";

interface Props{
    contact : Contact
}
const  DisplayContactModal : React.FC<Props> = ({contact}) =>{
    return (
        <div className=" ">
      <Modal >
        <ModalTrigger className=" max-w-fit">
          
          <EyeIcon/>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <AddContactForm  contact={contact} forWhat={ForWhat.DISPLAY} />
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
    )

}

export default DisplayContactModal;