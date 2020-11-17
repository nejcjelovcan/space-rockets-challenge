import React from "react";
import Launch from "../../src/components/launch";
import Layout from "../../src/components/layout";
import { fetcher, getSpaceXUrl } from "../../src/utils/use-space-x";
import { getLaunches } from "../launches";

export default function LaunchPage({ launchId, initialData }) {
  const images = initialData?.links?.flickr_images || [];
  return (
    <Layout
      title={initialData?.mission_name ?? "Launch"}
      description={initialData?.details}
      image={images[0]}
    >
      <Launch launchId={launchId} initialData={initialData} />
    </Layout>
  );
}

export async function getStaticProps({ params: { launchId } }) {
  const initialData = await fetcher(getSpaceXUrl(`/launches/${launchId}`));

  return { props: { launchId, initialData } };
}

export async function getStaticPaths() {
  const launches = await getLaunches();

  return {
    paths: launches.map((launch) => ({
      params: { launchId: launch.flight_number.toString() },
    })),
    fallback: true,
  };
}
