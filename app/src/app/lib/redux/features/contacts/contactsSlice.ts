import { getContacts } from "@/app/lib/api/contactsApi";
import { Contact } from "@/app/lib/interfaces/contacts.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async () => {
    const data = await getContacts();
    return data.data;
});

interface ContactState {
  data: Contact[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}
const initialState = {
  data: [],
  loading: "idle",
  error: "",
} as ContactState;

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      state.data.reverse();

      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch contacts";
      });
  },
  reducers: {
    addContact: (state, action) => {
      state.data.unshift(action.payload); // Add new contact
    },
    updateContact: (state, action) => {
      const { id, ...data } = action.payload;
      const contactIndex = state.data.findIndex((contact) => contact.id === id);
      if (contactIndex !== -1) {
        state.data[contactIndex] = { ...state.data[contactIndex], ...data }; // Update contact
      }
    },
    deleteContact: (state, action) => {
      const id = action.payload; // Get id from action payload
      state.data = state.data.filter((contact) => contact.id !== id); // Remove contact
    },
  },
});

export const { addContact, updateContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;