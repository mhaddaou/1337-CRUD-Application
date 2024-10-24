import { getPaginationContact, getSearchContact } from "@/app/lib/api/contactsApi";
import { Contact } from "@/app/lib/interfaces/contacts.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async ({ page, query }: { page: number; query?: string }) => {
    if(query){
      const data = await getSearchContact(page, query);
      return data
    }else{
      const data = await getPaginationContact(page);
      return data

    }
  }
);

interface ContactState {
  data: Contact[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  page: number;
  totalPages: number;
}
const initialState = {
  data: [],
  loading: "idle",
  error: "",
  page: 1,
  totalPages: 0,
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
        state.data = action.payload.data;
        state.totalPages = action.payload.totalPage;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch contacts";
      });
  },
  reducers: {
    addContact: (state, action) => {
      state.data.unshift(action.payload);
    },
    updateContact: (state, action) => {
      const { id, ...data } = action.payload;
      const contactIndex = state.data.findIndex((contact) => contact.id === id);
      if (contactIndex !== -1) {
        state.data[contactIndex] = { ...state.data[contactIndex], ...data };
      }
    },
    deleteContact: (state, action) => {
      const id = action.payload.id;
      state.data = state.data.filter((contact) => contact.id !== id);
    },
    resetPage:(state) =>{
      state.page = 1;
    },
    nextPage: (state) => {
      state.page = state.page + 1;
    },
    previousPage: (state) => {
      state.page = state.page - 1;
    },
  },
});

export const {
  addContact,
  updateContact,
  deleteContact,
  nextPage,
  previousPage,
  resetPage
} = contactsSlice.actions;
export default contactsSlice.reducer;
