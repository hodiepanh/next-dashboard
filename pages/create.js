import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addItemList } from "./store/items";
import create from "../styles/Create.module.css";
import LoadOverlay from "../component/loading";
import { loadingState } from "./store/items";

const Create = () => {
  const router = useRouter();
  const [createName, setCreateName] = useState("");
  const stateLoading = useSelector(loadingState);
  const dispatch = useDispatch();
  const addNewItem = () => {
    if (createName !== "") {
      const newItem = {
        id: Number(router.query.id),
        title: createName,
        img: "something",
      };
      dispatch(addItemList(newItem)).then(() => {
        router.push("/dashboard");
      });
    } else {
      alert("please enter name");
    }
  };
  return (
    <div>
      {stateLoading && (
        <div>
          <LoadOverlay />
        </div>
      )}
      <div className={create.createForm}>
        <h2> Create new item </h2>
        <Input
          aria-label="Name"
          placeholder="New item name"
          type="text"
          value={createName}
          onChange={(e) => {
            setCreateName(e.target.value);
          }}
        />
        <div className={create.buttonWrapper}>
          <Button auto aria-label="Add" onPress={addNewItem}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Create;
