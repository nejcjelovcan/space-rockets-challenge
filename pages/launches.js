import React from "react";
import Launches, { PAGE_SIZE } from "../src/components/launches";
import Layout from "../src/components/layout";
import { fetcher, getSpaceXUrl } from "../src/utils/use-space-x";

export default function LaunchesPage({ initialData }) {
  return (
    <Layout title="Launches">
      <Launches initialData={initialData} />
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: { initialData: await getLaunches() } };
}

export function getLaunches() {
  return fetcher(
    getSpaceXUrl("/launches/past", {
      limit: PAGE_SIZE,
      order: "desc",
      sort: "launch_date_utc",
    })
  );
}
