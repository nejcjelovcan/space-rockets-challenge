import React, { useCallback } from "react";
import { Button } from "@chakra-ui/core";
import { Star, XCircle } from "react-feather";

export default function FavoriteButton({
  isFavorite,
  addFavorite,
  removeFavorite,
  showText,
  removeOnly,
  ...buttonProps
}) {
  const display = isFavorite ? "Remove from Favorites" : "Add to Favorites";
  const onClick = useCallback(isFavorite ? removeFavorite : addFavorite, [
    isFavorite,
    addFavorite,
    removeFavorite,
  ]);

  return (
    <Button
      title={display}
      variant="solid"
      variantColor={removeOnly ? "red" : isFavorite ? "yellow" : "gray"}
      onClick={onClick}
      {...buttonProps}
    >
      {removeOnly ? <XCircle /> : <Star />}
      {showText && `\xa0${display}`}
    </Button>
  );
}
