import { rest } from "msw";
import { ListVolumesAPIResponse, ListVolumesRequestPayload } from "../../types";
import { volumes as volumeData } from "../data";

export const ListVolumesHandler = rest.post("https://fd.stg.linkedin.com/v1/volume/list", async ({ request }) => {
  const searchFilters = (await request.json()) as ListVolumesRequestPayload;

  const hasNoSearchFilters = Object.keys(searchFilters).length === 0;
  if (hasNoSearchFilters) {
    return new Response(JSON.stringify(volumeData), {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      status: 200,
    });
  }

  // Apply the search filters to the data incrementally.
  let volumes = volumeData.volumes;
  if (searchFilters["name_regex"]) {
    volumes = volumes.filter((volume) => volume.name.includes(searchFilters["name_regex"] as string));
  }
  if (searchFilters["replication"]) {
    volumes = volumes.filter((volume) => volume.replication === searchFilters["replication"]);
  }
  if (searchFilters["volume_type"]) {
    volumes = volumes.filter((volume) => volume.volumeType === searchFilters["volume_type"]);
  }
  if (searchFilters["access_mode"]) {
    volumes = volumes.filter((volume) => volume.accessMode === searchFilters["access_mode"]);
  }
  if (searchFilters["created_by"]) {
    volumes = volumes.filter((volume) => volume.createdBy === searchFilters["created_by"]);
  }
  if (searchFilters["last_modified_by"]) {
    volumes = volumes.filter((volume) => volume.lastModifiedBy === searchFilters["last_modified_by"]);
  }
  if (searchFilters["volume_state"]) {
    volumes = volumes.filter((volume) => volume.state === searchFilters["volume_state"]);
  }
  if (searchFilters["cluster_name"]) {
    volumes = volumes.filter((volume) => volume.clusterName === searchFilters["cluster_name"]);
  }
  if (searchFilters["min_capacity"]) {
    volumes = volumes.filter(
      (volume) => Boolean(volume.capacity) >= Boolean(searchFilters["min_capacity"] as unknown as string)
    );
  }
  if (searchFilters["max_capacity"]) {
    volumes = volumes.filter(
      (volume) => Boolean(volume.capacity) <= Boolean(searchFilters["max_capacity"] as unknown as string)
    );
  }
  // NOTE: we can't mock in the API since it that data is stored in fd-api and not available in the volume data
  // if (searchFilters["client_name")){
  //   volumes = volumes.filter((volume) => volume.name === searchFilters["cluster_name"]);
  // }

  // NOTE: we can't mock in the API since it that data is stored in fd-api and not available in the volume data
  // if (searchFilters["target_name")){
  //   volumes = volumes.filter((volume) => volume.name === searchFilters["cluster_name"]);
  // }
  // NOTE: we can't mock in the API since it that data is stored in fd-api and not available in the volume data
  // if (searchFilters["disk_id")){
  //   volumes = volumes.filter((volume) => volume.name === searchFilters["disk_id"]);
  // }

  const data: ListVolumesAPIResponse = { volumes: volumes };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    status: 200,
  });
});
