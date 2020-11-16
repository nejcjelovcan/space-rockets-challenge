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
import { Route, Routes } from "react-router-dom";
import { useFavorites } from "../utils/use-favorites";
import Home from "./home";
import Launch from "./launch";
import LaunchPad from "./launch-pad";
import LaunchPads, { LaunchPadItem } from "./launch-pads";
import Launches, { LaunchItem } from "./launches";

export default function App() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <div>
      <NavBar openDrawer={onOpen} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launches" element={<Launches />} />
        <Route path="/launches/:launchId" element={<Launch />} />
        <Route path="/launch-pads" element={<LaunchPads />} />
        <Route path="/launch-pads/:launchPadId" element={<LaunchPad />} />
      </Routes>
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
