import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Grid, Card, Text } from "@nextui-org/react";
import Link from "next/link";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3001/items");
  const itemsData = await res.json();
  //console.log(itemsData);
  return { props: { itemsData } };
};

const Dashboard = ({ itemsData }) => {
  // useEffect(() => {
  //   axios.get("http://localhost:3001/items").then((resp) => {
  //     console.log(resp.data);
  //   });
  // });

  // const mockData = [
  //   { id: 0, title: "red", img: "imageOne" },
  //   { id: 1, title: "blue", img: "imgTwo" },
  // ];
  const router = useRouter();
  const [dbData, setDbDate] = useState(itemsData);
  const [searchValue, setSearchValue] = useState("");
  const mockItem = dbData.map((data) => (
    <Grid xs={3} className="card" key={data.id}>
      <Card css={{ aspectRatio: "1/1" }}>
        <Text h6 size={15} color="black" css={{ mt: 0 }}></Text>
        <Button
          aria-label="Edit"
          auto
          onPress={() => {
            editItem(data);
          }}
        >
          Edit
        </Button>
        <Button
          aria-label="Remove"
          auto
          onPress={() => {
            removeItem(data.id);
          }}
        >
          Remove
        </Button>
      </Card>
      <div>
        {data.id} {data.title}
      </div>
    </Grid>
  ));

  //add new item
  const addNewItem = () => {
    router.push({ pathname: "/create", query: { id: mockItem.length } });
  };

  //edit item
  const editItem = (item) => {
    router.push({
      pathname: "/edit/" + item.id,
      query: item,
    });
  };
  //remove item
  const removeItem = (index) => {
    axios.delete(`http://localhost:3001/items/${index}`).then(() => {
      const delItems = dbData.filter((items) => items.id !== index);
      setDbDate(delItems);
    });
  };
  //search item
  // useEffect(() => {
  //   if (mockItem.length !== 0) {
  //     if (searchValue !== "") {
  //       const delaySearch = setTimeout(() => {
  //         axios
  //           .get(`http://localhost:3001/items?title_like=${searchValue}`)
  //           .then((resp) => {
  //             setDbDate(resp.data);
  //           });
  //       }, 500);
  //       return () => clearTimeout(delaySearch);
  //     } else {
  //       setDbDate(itemsData);
  //       console.log(searchValue);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchValue, itemsData]);

  const searchItem = () => {
    if (searchValue !== "") {
      const delaySearch = setTimeout(() => {
        axios
          .get(`http://localhost:3001/items?title_like=${searchValue}`)
          .then((resp) => {
            setDbDate(resp.data);
          });
      }, 500);
      return () => clearTimeout(delaySearch);
    } else {
      setDbDate(itemsData);
      console.log("else");
    }
  };

  return (
    <div>
      <h1> Dashboard </h1>
      <Input
        aria-label="Search"
        id="search"
        className="searchbar"
        type="text"
        value={searchValue}
        placeholder="Type something to search"
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />

      <div>
        <Button aria-label="Add" onPress={addNewItem}>
          Add new item
        </Button>
        <Button aria-label="Test" onPress={searchItem}>
          Test
        </Button>
      </div>
      <Grid.Container gap={2} justify="left">
        {mockItem}
      </Grid.Container>
    </div>
  );
};

export default Dashboard;
