import { rest } from "msw";
import { GetVolumeAPIResponse } from "../../types";
import { volumes as volumeData } from "../data";

export const GetVolumeHandler = rest.get("https://fd.stg.linkedin.com/v1/volume/get/:volume_name", ({ params }) => {
  const volume = volumeData.volumes.find((volume) => {
    return volume.name === params.volume_name;
  });
  const data = { volume: volume } as GetVolumeAPIResponse;

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    status: 200,
  });
});
