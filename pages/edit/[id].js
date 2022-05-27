import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editItemList } from "../store/items";

const Edit = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const index = Number(router.query.id);
  const oldItem = router.query.title;
  const [editName, setEditName] = useState(oldItem);

  //edit item
  const editItem = () => {
    dispatch(editItemList({ index, editName })).then(() => {
      router.push("/dashboard");
    });
  };

  return (
    <div>
      <h1> Edit item {index} </h1>
      <Input
        aria-label="New name"
        type="text"
        value={editName}
        onChange={(event) => {
          setEditName(event.target.value);
        }}
      />
      <Button aria-label="Edit" onPress={editItem}>
        Update
      </Button>
      <Button aria-label="Cancel">Cancel</Button>
    </div>
  );
};

export default Edit;
