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

export function useFavorite(storeName, id, item) {
  const { getByID, add, deleteRecord } = useIndexedDB(storeName);

  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    async function fetchItem() {
      const item = await getByID(id);
      setIsFavorite(Boolean(item));
    }
    fetchItem();
  }, [getByID, id]);

  const addFavorite = async (event) => {
    event.preventDefault();
    await add(item);
    setIsFavorite(true);
  };
  const removeFavorite = async (event) => {
    event.preventDefault();
    await deleteRecord(id);
    setIsFavorite(false);
  };

  return { isFavorite, addFavorite, removeFavorite };
}
