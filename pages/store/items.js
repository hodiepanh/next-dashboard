import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { itemApi } from "../api/itemApi";

const initialState = {
  value: [],
  loading: false,
};

export const fetchItemList = createAsyncThunk("items/get", async () => {
  const response = await itemApi.getItems();
  const data = response.data;
  return data;
});

export const addItemList = createAsyncThunk("items/create", async (newItem) => {
  const resp = await itemApi.addItems(newItem);
  const data = resp.data;
  return data;
});

export const delItemList = createAsyncThunk("items/delete", async (index) => {
  const resp = await itemApi.deleteItems(index);
  const dataOb = { data: resp.data, id: index };
  return dataOb;
});

export const editItemList = createAsyncThunk("items/edit", async (editData) => {
  const id = editData.index;
  const editName = editData.editName;
  const resp = await itemApi.editItems(id, editName);
  const data = resp.data;
  return data;
});

export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    fetchItem: (state, action) => {
      state.value = action.payload;
      //console.log(current(state).value);
    },
    addItem: (state, action) => {
      const newItem = {
        id: state.value.length,
        title: action.payload,
        img: "something",
      };
      state.value = [...state.value, newItem];
    },
    removeItem: (state, action) => {
      const index = action.payload;
      const delItems = state.value.filter((items) => items.id !== index);
      state.value = [...delItems];
      console.log(current(state).value);
      //state.loading = false;
    },
    editItem: (state, action) => {
      let id = Number(action.payload.id);
      state.value[id].title = action.payload.editName;
    },
  },
  extraReducers: {
    [fetchItemList.pending]: (state) => {
      state.loading = true;
    },
    [fetchItemList.fulfilled]: (state, action) => {
      state.value = action.payload;
      state.loading = false;
    },
    [fetchItemList.rejected]: (state) => {
      state.loading = true;
    },
    [addItemList.pending]: (state) => {
      state.loading = true;
    },
    [addItemList.fulfilled]: (state, action) => {
      state.value = [...state.value, action.payload];
      state.loading = false;
    },
    [addItemList.rejected]: (state) => {
      state.loading = true;
    },
    [delItemList.pending]: (state) => {
      state.loading = true;
    },
    [delItemList.fulfilled]: (state, action) => {
      console.log(action.payload);
      const index = action.payload.id;
      const delItems = state.value.filter((items) => items.id !== index);
      console.log(delItems);
      state.value = [...delItems];
      state.value = current(state).value;
      console.log(state.value);
      state.loading = false;
    },
    [delItemList.rejected]: (state) => {
      state.loading = true;
    },
    [editItemList.pending]: (state) => {
      state.loading = true;
    },
    [editItemList.fulfilled]: (state, action) => {
      console.log(action.payload);
      let id = Number(action.payload.id);
      state.value[id].title = action.payload.title;
      state.loading = false;
    },
    [editItemList.rejected]: (state) => {
      state.loading = true;
    },
  },
});

export const {
  addItem,
  removeItem,
  editItem,
  fetchItem,
  testItem,
  changeLoading,
} = itemSlice.actions;

export const loadingState = (state) => state.itemReducer.loading;

export default itemSlice.reducer;
