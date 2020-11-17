import React from "react";
import LaunchPad from "../../src/components/launch-pad";
import { PAGE_SIZE } from "../../src/components/launches";
import Layout from "../../src/components/layout";
import { getSpaceXUrl, fetcher } from "../../src/utils/use-space-x";

export default function LaunchPadPage({ launchPadId, initialData }) {
  return (
    <Layout
      title={initialData?.site_name_long ?? "Launch Pad"}
      description={initialData?.details}
    >
      <LaunchPad launchPadId={launchPadId} initialData={initialData} />
    </Layout>
  );
}

export async function getStaticProps({ params: { launchPadId } }) {
  const initialData = await fetcher(getSpaceXUrl(`/launchpads/${launchPadId}`));
  return { props: { launchPadId, initialData } };
}

export async function getStaticPaths() {
  const data = await fetcher(
    getSpaceXUrl("/launchpads", {
      limit: PAGE_SIZE,
    })
  );

  return {
    paths: data.flat().map((launch) => ({
      params: { launchPadId: launch.site_id },
    })),
    fallback: true,
  };
}
