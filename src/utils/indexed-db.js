import { useEffect, useState } from "react";
import { useIndexedDB } from "react-indexed-db";

export const DBConfig = {
  name: "space-rockets-challenge",
  version: 1,
  objectStoresMeta: [
    {
      store: "favorites-launches",
      storeConfig: { keyPath: "flight_number" },
      storeSchema: [],
    },
    {
      store: "favorites-launchpads",
      storeConfig: { keyPath: "id" },
      storeSchema: [],
    },
  ],
};

function getMinimalFavoriteData(storeName, item) {
  switch (storeName) {
    case "favorites-launches":
      return {
        flight_number: item.flight_number,
        mission_name: item.mission_name,
      };
    case "favorites-launchpads":
      return {
        id: item.id,
        name: item.name,
      };
    default:
      throw new Error(`Unrecognized store name: ${storeName}`);
  }
}

function getFavoriteId(storeName, item) {
  switch (storeName) {
    case "favorites-launches":
      return item.flight_number;
    case "favorites-launchpads":
      return item.id;
    default:
      throw new Error(`Unrecognized store name: ${storeName}`);
  }
}

export function useFavorite(storeName, item) {
  const { getByID, add, deleteRecord } = useIndexedDB(storeName);

  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    async function fetchItem() {
      const result = await getByID(getFavoriteId(storeName, item));
      setIsFavorite(Boolean(result));
    }
    fetchItem();
  }, [getByID, storeName, item]);

  const addFavorite = async (event) => {
    event.preventDefault();
    await add(getMinimalFavoriteData(storeName, item));
    setIsFavorite(true);
  };
  const removeFavorite = async (event) => {
    event.preventDefault();
    await deleteRecord(getFavoriteId(storeName, item));
    setIsFavorite(false);
  };

  return { isFavorite, addFavorite, removeFavorite };
}
