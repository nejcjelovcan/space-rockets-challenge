import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/core";
import React from "react";
import { List } from "react-feather";
import { useFavorites } from "../utils/use-favorites";
import { LaunchPadItem } from "./launch-pads";
import { LaunchItem } from "./launches";
import Head from "next/head";

export default function Layout({ title, description, image, url, children }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  let titles = ["Space Rockets!"];
  if (title) titles.unshift(title);
  const finalTitle = titles.join(" — ");
  return (
    <div>
      <Head>
        <title>{finalTitle}</title>
        <meta property="og:title" content={finalTitle} />
        {description && <meta name="description" content={description} />}
        {description && (
          <meta property="og:description" content={description} />
        )}
        {image && <meta property="og:image" content={image} />}
        {url && <meta property="og:url" content={url} />}
      </Head>
      <NavBar openDrawer={onOpen} />
      {children}
      <FavoritesDrawer isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

function FavoritesDrawer({ isOpen, onClose }) {
  const { launches, launchpads } = useFavorites();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="sm">
      <DrawerContent overflowY="auto">
        <DrawerCloseButton />
        <DrawerHeader>Favorites</DrawerHeader>
        <DrawerBody>
          <Stack spacing="4">
            <Heading size="sm">Launches ({launches.length})</Heading>
            <SimpleGrid spacing="2">
              {launches.map((launch) => (
                <LaunchItem
                  key={launch.flight_number}
                  launch={launch}
                  displayForFavorites
                />
              ))}
            </SimpleGrid>
            <Heading size="sm">Launch Pads ({launchpads.length})</Heading>
            <SimpleGrid spacing="2">
              {launchpads.map((launchPad) => (
                <LaunchPadItem
                  key={launchPad.id}
                  launchPad={launchPad}
                  displayForFavorites
                />
              ))}
            </SimpleGrid>
          </Stack>
        </DrawerBody>
      </DrawerContent>
      <DrawerOverlay />
    </Drawer>
  );
}

function NavBar({ openDrawer }) {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg="gray.800"
      color="white"
    >
      <Text
        fontFamily="mono"
        letterSpacing="2px"
        fontWeight="bold"
        fontSize="lg"
      >
        ¡SPACE·R0CKETS!
      </Text>
      <Button onClick={openDrawer} variant="solid" variantColor="blue">
        <List />
        {"\xa0"}Favorites
      </Button>
    </Flex>
  );
}
