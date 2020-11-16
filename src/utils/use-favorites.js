import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useIndexedDB } from "react-indexed-db";

const InitialState = {
  launches: [],
  launchpads: [],
};

const FavoritesContext = createContext({
  ...InitialState,
  addFavorite: (model, item) => {},
  removeFavorite: (model, item) => {},
  isFavorite: (model, item) => {
    return false;
  },
});

const ModelKey = {
  launches: "flight_number",
  launchpads: "id",
};

/**
 * useFavorites
 *
 * Returns FavoritesContext value
 */
export function useFavorites() {
  return useContext(FavoritesContext);
}

/**
 * useFavorite
 *
 * Returns isFavorite boolean and add/removeFavorite callbacks for given item
 *
 * @param   {string}  model   Model name (either 'launches' or 'launchpads')
 * @param   {object}  item    Launch or LaunchPad item
 */
export function useFavorite(model, item) {
  const { addFavorite, removeFavorite, isFavorite } = useContext(
    FavoritesContext
  );
  return {
    addFavorite: () => addFavorite(model, item),
    removeFavorite: () => removeFavorite(model, item),
    isFavorite: isFavorite(model, item),
  };
}

function favoritesReducer(state, action) {
  switch (action.type) {
    case "addFavorite":
      return {
        ...state,
        [action.model]: state[action.model].concat([action.item]),
      };
    case "removeFavorite":
      return {
        ...state,
        [action.model]: state[action.model].filter(
          (l) =>
            l[ModelKey[action.model]] !== action.item[ModelKey[action.model]]
        ),
      };
    case "setFavorites":
      return {
        ...state,
        [action.model]: action.items,
      };
    default:
      return state;
  }
}

export function FavoritesProvider({ children }) {
  const [state, dispatch] = useReducer(favoritesReducer, InitialState);
  const stores = {
    launches: useIndexedDB("favorites-launches"),
    launchpads: useIndexedDB("favorites-launchpads"),
  };

  function isFavorite(model, item) {
    return Boolean(
      state[model].find((i) => i[ModelKey[model]] === item[ModelKey[model]])
    );
  }
  function addFavorite(model, item) {
    dispatch({ type: "addFavorite", model, item });
    return stores[model].add(item);
  }
  function removeFavorite(model, item) {
    dispatch({ type: "removeFavorite", model, item });
    return stores[model].deleteRecord(item[ModelKey[model]]);
  }
  async function loadLaunches() {
    const items = await stores.launches.getAll();
    dispatch({ type: "setFavorites", model: "launches", items });
  }
  async function loadLaunchPads() {
    const items = await stores.launchpads.getAll();
    dispatch({ type: "setFavorites", model: "launchpads", items });
  }

  useEffect(() => {
    loadLaunches();
    loadLaunchPads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ ...state, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const DBConfig = {
  name: "space-rockets-challenge",
  version: 1,
  objectStoresMeta: [
    {
      store: "favorites-launches",
      storeConfig: { keyPath: ModelKey.launches },
      storeSchema: [],
    },
    {
      store: "favorites-launchpads",
      storeConfig: { keyPath: ModelKey.launchpads },
      storeSchema: [],
    },
  ],
};
