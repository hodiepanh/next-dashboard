import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Grid, Card, Text } from "@nextui-org/react";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchItem } from "./store/items";
import { delItemList } from "./store/items";
import { itemApi } from "./api/itemApi";
import { useUpdateEffect } from "usehooks-ts";
import { loadItems } from "./api/server";

export const getServerSideProps = async () => {
  const itemsData = await loadItems();
  return { props: { itemsData } };
};

const Dashboard = ({ itemsData }) => {
  const router = useRouter();
  const itemMap = useSelector((state) => state.itemReducer.value);
  const [dbData, setDbDate] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  //add data to state
  useEffect(() => {
    if (itemMap.length === 0) {
      setDbDate(itemsData);
      dispatch(fetchItem(itemsData));
      console.log("db");
    } else {
      setDbDate(itemMap);
      console.log("state");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUpdateEffect(() => {
    setDbDate(itemMap);
  }, [itemMap]);

  //map
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
    router.push(
      {
        pathname: "/create",
        query: { id: mockItem.length },
        //option: { shallow: true },
      },
      undefined,
      { shallow: true }
    );
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
    dispatch(delItemList(index));
  };

  useEffect(() => {
    if (itemMap.length !== 0) {
      if (searchValue !== "") {
        const delaySearch = setTimeout(() => {
          itemApi.searchItems(searchValue).then((resp) => {
            setDbDate(resp.data);
          });
        }, 500);
        return () => clearTimeout(delaySearch);
      } else {
        setDbDate(itemMap);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, itemMap]);

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
        <Button aria-label="Test">Test</Button>
      </div>
      <Grid.Container gap={2} justify="left">
        {mockItem}
      </Grid.Container>
    </div>
  );
};

export default Dashboard;
