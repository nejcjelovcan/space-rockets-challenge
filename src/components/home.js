import React from "react";
import { Flex, Box, Text, Stack, Link } from "@chakra-ui/core";
import { ArrowRight } from "react-feather";
import NextLink from "next/link";

export default function Home() {
  return (
    <Stack m="6" spacing="6">
      <PageLink url="/launches">Browse SpaceX Launches</PageLink>
      <PageLink url="/launch-pads">Browse SpaceX Launch Pads</PageLink>
    </Stack>
  );
}

function PageLink({ url, children, ...rest }) {
  return (
    <NextLink passHref href={url} {...rest}>
      <Flex
        as={Link}
        justifyContent="space-between"
        p="6"
        boxShadow="md"
        borderWidth="1px"
        rounded="lg"
      >
        <Text fontSize="lg">{children}</Text>
        <Box as={ArrowRight} />
      </Flex>
    </NextLink>
  );
}
