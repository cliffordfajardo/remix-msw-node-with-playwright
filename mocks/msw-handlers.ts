import { ListVolumesHandler, GetVolumeHandler, ListClustersHandler, GetClusterHandler } from "./api-handlers";

/**
 * @description
 * MSW API handlers that intercept requests to the real API and turned mock data.
 */
export const handlers = [
  // -------- Volume handler --------
  GetVolumeHandler,
  ListVolumesHandler,
  // -------- Cluster handlers --------
  GetClusterHandler,
  ListClustersHandler,

  // TODO: mock authentication as some point. Currently we just bypass
  // rest.get("https://login.microsoftonline.com", ({ request, params, cookies }) => {
  //   return passthrough();
  // }),
  // rest.get("https://localhost:3001/auth/microsoft/callback", ({ request, params, cookies }) => {
  //   return passthrough();
  // }),
  // rest.post("https://login.microsoftonline.com", ({ request, params, cookies }) => {
  //   return passthrough();
  // }),
];
