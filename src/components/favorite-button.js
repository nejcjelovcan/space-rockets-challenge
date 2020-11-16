import React from "react";
import { Button } from "@chakra-ui/core";
import { Star } from "react-feather";

export default function FavoriteButton({
  isFavorite,
  addFavorite,
  removeFavorite,
  showText,
  ...buttonProps
}) {
  const display = isFavorite ? "Remove from Favorites" : "Add to Favorites";
  return (
    <Button
      title={display}
      variant="solid"
      variantColor={isFavorite ? "yellow" : "gray"}
      onClick={isFavorite ? removeFavorite : addFavorite}
      {...buttonProps}
    >
      <Star />
      {showText && `\xa0${display}`}
    </Button>
  );
}
