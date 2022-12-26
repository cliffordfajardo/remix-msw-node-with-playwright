import { rest } from "msw";
import { GetClusterAPIResponse } from "../../types";
import { clusters as clusterData } from "../data";

export const GetClusterHandler = rest.post("https://fd.stg.linkedin.com/v1/cluster/get", async ({ request }) => {
  const searchFilter = (await request.json()) as { cluster_name: string };
  const cluster = clusterData.cluster.find((cluster) => {
    return cluster.clusterName === searchFilter.cluster_name;
  });
  const data = { cluster: cluster } as GetClusterAPIResponse;

  console.log(`cluster dat?`, clusterData);
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    status: 200,
  });
});
