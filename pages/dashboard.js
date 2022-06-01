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
import dashboard from "../styles/Dashboard.module.css";
import LoadOverlay from "../component/loading";
import { loadingState } from "./store/items";

export const getStaticProps = async () => {
  const itemsData = await loadItems();
  return { props: { itemsData } };
};

const Dashboard = ({ itemsData }) => {
  const router = useRouter();
  const itemMap = useSelector((state) => state.itemReducer.value);
  const stateLoading = useSelector(loadingState);
  //const [stateLoading, setLoadingState] = useState(true);
  const [dbData, setDbData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  //add data to state
  useEffect(() => {
    if (itemMap.length === 0) {
      setDbData(itemsData);
      dispatch(fetchItem(itemsData));
      console.log("db");
    } else {
      setDbData(itemMap);
      console.log("state");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUpdateEffect(() => {
    setDbData(itemMap);
  }, [itemMap]);

  //map
  const mockItem = dbData.map((data) => (
    <Grid xs={3} className={dashboard.itemWrapper} key={data.id}>
      <Card className={dashboard.paper}>
        <div className={dashboard.itemButtonWrapper}>
          <Text h6 size={15} color="black" css={{ mt: 0 }}></Text>
          <Button
            className={dashboard.editButton}
            aria-label="Edit"
            auto
            onPress={() => {
              editItem(data);
            }}
          >
            Edit
          </Button>
          <Button
            className={dashboard.removeButton}
            aria-label="Remove"
            auto
            onPress={() => {
              removeItem(data.id);
            }}
          >
            Remove
          </Button>
        </div>
      </Card>
      <div className={dashboard.itemTitle}>
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
            setDbData(resp.data);
          });
        }, 500);
        return () => clearTimeout(delaySearch);
      } else {
        setDbData(itemMap);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, itemMap]);

  return (
    <div>
      {stateLoading && (
        <div>
          <LoadOverlay />
        </div>
      )}
      <div className={dashboard.root}>
        {/* <h3> Dashboard </h3> */}
        <div className={dashboard.searchbarWrapper}>
          <Input
            aria-label="Search"
            id="search"
            className={dashboard.searchbar}
            type="text"
            value={searchValue}
            placeholder="Type something to search"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>

        <div className={dashboard.addButtonWrapper}>
          <Button auto aria-label="Add" onPress={addNewItem}>
            Add new item
          </Button>
          {/* <Button auto aria-label="Test">
          Test
        </Button> */}
        </div>
        <div className={dashboard.gridWrapper}>
          <Grid.Container gap={2} justify="left">
            {mockItem}
          </Grid.Container>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
