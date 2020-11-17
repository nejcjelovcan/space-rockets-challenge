import React, { createContext, useContext, useEffect, useReducer } from "react";
import Dexie from "dexie";

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
  var db = new Dexie("space-rockets-challenge");
  db.version(1).stores({
    "favorites-launches": ModelKey.launches,
    "favorites-launchpads": ModelKey.launchpads,
  });

  const [state, dispatch] = useReducer(favoritesReducer, InitialState);

  function isFavorite(model, item) {
    return Boolean(
      state[model].find((i) => i[ModelKey[model]] === item[ModelKey[model]])
    );
  }
  function addFavorite(model, item) {
    dispatch({ type: "addFavorite", model, item });
    return db[`favorites-${model}`].add(item);
  }
  function removeFavorite(model, item) {
    dispatch({ type: "removeFavorite", model, item });
    return db[`favorites-${model}`].delete(item[ModelKey[model]]);
  }
  async function loadLaunches() {
    const items = await db["favorites-launches"].toArray();
    dispatch({ type: "setFavorites", model: "launches", items });
  }
  async function loadLaunchPads() {
    const items = await db["favorites-launchpads"].toArray();
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
