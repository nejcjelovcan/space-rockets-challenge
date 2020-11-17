import React from "react";
import LaunchPads, { PAGE_SIZE } from "../src/components/launch-pads";
import Layout from "../src/components/layout";
import { fetcher, getSpaceXUrl } from "../src/utils/use-space-x";

export default function LaunchPadsPage({ initialData }) {
  return (
    <Layout title="Launch pads">
      <LaunchPads initialData={initialData} />
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: { initialData: await getLaunchPads() } };
}

export function getLaunchPads() {
  return fetcher(
    getSpaceXUrl("/launchpads", {
      limit: PAGE_SIZE,
    })
  );
}
