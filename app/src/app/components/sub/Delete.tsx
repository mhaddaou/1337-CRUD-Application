import { Contact } from "@/app/lib/interfaces/contacts.interface";
import { useModal } from "../ui/animated-modal";
import { deleteContactApi } from "@/app/lib/api/contactsApi";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { deleteContact } from "@/app/lib/redux/features/contacts/contactsSlice";
import { useAppDispatch } from "@/app/lib/redux/hooks";
import { toast } from "sonner";
interface Props {
  contact: Contact;
}

const Delete: React.FC<Props> = ({ contact }) => {
  const [loading, setLoading] = useState(false);
  const { setOpen } = useModal();

  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const result = await deleteContactApi(contact.id);
      dispatch(deleteContact(result.data));
      toast.success(result.message);

      setOpen(false);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleExit = () => {
    setOpen(false);
  };
  return (
    <div className=" flex flex-col gap-5">
      <svg
        className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <div className=" mx-auto">
        <p className="mb-4 text-gray-500 text-center pb-5">
          Are you sure you want to delete this contact
        </p>
        <div className="  flex justify-end gap-5">
          <button
            onClick={handleExit}
            type="button"
            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100  hover:text-gray-900 focus:z-10 "
          >
            No, cancel
          </button>
          <Button
            type="button"
            onClick={handleDelete}
            isLoading={loading}
            className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 "
          >
            Yes, I&apos;m sure
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
