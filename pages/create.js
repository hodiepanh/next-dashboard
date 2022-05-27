import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addItemList } from "./store/items";

const Create = () => {
  const router = useRouter();
  const [createName, setCreateName] = useState("");
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
      <h1> Create new item </h1>
      <Input
        aria-label="Name"
        placeholder="New item name"
        type="text"
        value={createName}
        onChange={(e) => {
          setCreateName(e.target.value);
        }}
      />
      <Button aria-label="Add" onPress={addNewItem}>
        Add
      </Button>
    </div>
  );
};

export default Create;
