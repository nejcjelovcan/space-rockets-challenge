import React from "react";
import { Button } from "@chakra-ui/core";
import { Star } from "react-feather";

export default function FavoriteButton({
  isFavorite,
  addFavorite,
  removeFavorite,
  ...buttonProps
}) {
  return (
    <Button
      title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      variantColor={isFavorite ? "yellow" : "gray"}
      onClick={isFavorite ? removeFavorite : addFavorite}
      {...buttonProps}
    >
      <Star />
    </Button>
  );
}
