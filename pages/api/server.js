export const loadItems = async () => {
  const res = await fetch("http://localhost:3001/items");
  const itemsData = await res.json();
  return itemsData;
};
