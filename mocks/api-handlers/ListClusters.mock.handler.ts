import { rest } from "msw";
import { ListClusterAPIResponse, ListClustersRequestPayload } from "../../types";
import { clusters as clusterData } from "../data";

export const ListClustersHandler = rest.post("https://fd.stg.linkedin.com/v1/clusters/list", async ({ request }) => {
  const searchFilters = (await request.json()) as ListClustersRequestPayload;

  const hasNoSearchFilters = Object.keys(searchFilters).length === 0;
  if (hasNoSearchFilters) {
    return new Response(JSON.stringify(clusterData), {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      status: 200,
    });
  }

  // Apply the search filters to the data incrementally.
  let clusters = clusterData.cluster;
  if (searchFilters["name_regex"]) {
    clusters = clusters.filter((cluster) => cluster.clusterName.includes(searchFilters["name_regex"] as string));
  }
  if (searchFilters["connectivity_type"]) {
    clusters = clusters.filter((cluster) => cluster.connectivityType === searchFilters["connectivity_type"]);
  }
  if (searchFilters["cluster_env"]) {
    clusters = clusters.filter((cluster) => cluster.clusterEnv === searchFilters["cluster_env"]);
  }
  if (searchFilters["cluster_scope"]) {
    clusters = clusters.filter((cluster) => cluster.clusterScope === searchFilters["cluster_scope"]);
  }
  if (searchFilters["cluster_type"]) {
    clusters = clusters.filter((cluster) => cluster.clusterType === searchFilters["cluster_type"]);
  }
  if (searchFilters["cluster_state"]) {
    clusters = clusters.filter((cluster) => cluster.clusterState === searchFilters["cluster_state"]);
  }
  if (searchFilters["fabric"]) {
    clusters = clusters.filter((cluster) => cluster.fabric === searchFilters["fabric"]);
  }
  const data: ListClusterAPIResponse = { cluster: clusters };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    status: 200,
  });
});
