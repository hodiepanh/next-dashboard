import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Create = () => {
  const router = useRouter();
  const [createName, setCreateName] = useState("");
  const addNewItem = () => {
    console.log(router.query);
    if (createName !== "") {
      const newItem = {
        id: Number(router.query.id),
        title: createName,
        img: "something",
      };
      console.log(newItem);
      axios.post("http://localhost:3001/items", newItem).then((resp) => {
        console.log(resp.data);
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
