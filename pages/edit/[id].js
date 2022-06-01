import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editItemList } from "../store/items";
import edit from "../../styles/Edit.module.css";
import LoadOverlay from "../../component/loading";
import { loadingState } from "../store/items";

const Edit = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const index = Number(router.query.id);
  const oldItem = router.query.title;
  const [editName, setEditName] = useState(oldItem);
  const stateLoading = useSelector(loadingState);

  //edit item
  const editItem = () => {
    dispatch(editItemList({ index, editName })).then(() => {
      router.push("/dashboard");
    });
  };

  return (
    <div>
      {stateLoading && (
        <div>
          <LoadOverlay />
        </div>
      )}
      <div className={edit.editForm}>
        <h2> Edit item {index} </h2>
        <Input
          aria-label="New name"
          type="text"
          value={editName}
          onChange={(event) => {
            setEditName(event.target.value);
          }}
        />
        <div className={edit.buttonWrapper}>
          <Button
            auto
            className={edit.editButton}
            aria-label="Edit"
            onPress={editItem}
          >
            Update
          </Button>
          <Button
            auto
            className={edit.cancelButton}
            aria-label="Cancel"
            onPress={() => {
              router.push("/dashboard");
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
