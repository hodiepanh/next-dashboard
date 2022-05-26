import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

// export const getStaticPaths = async () => {
//   const resp = await fetch("http://localhost:3001/items");
//   const data = await resp.json();
//   const paths = data.map((item) => {
//     return { params: { id: item.id } };
//   });

//   return {
//     paths: paths,
//     fallback: false,
//   };
// };

// export const getStaticProps = async (context) => {
//   const id = context.params.id;
//   const res = await fetch(`http://localhost:3001/items/${id}`);
//   const data = res.json();
//   return { props: { data } };
// };

const Edit = () => {
  const router = useRouter();
  const index = router.query.id;
  const oldItem = router.query.title;
  const [editName, setEditName] = useState(oldItem);
  //console.log(index);

  //edit item
  const editItem = (index, editName) => {
    axios
      .patch(`http://localhost:3001/items/${index}`, { title: editName })
      .then(() => {
        router.push("/dashboard");
      });
  };

  //console.log(data);
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
      <Button
        aria-label="Edit"
        onPress={() => {
          editItem(index, editName);
        }}
      >
        Update
      </Button>
      <Button aria-label="Cancel">Cancel</Button>
    </div>
  );
};

export default Edit;
