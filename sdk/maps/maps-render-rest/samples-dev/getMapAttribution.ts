// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DefaultAzureCredential } from "@azure/identity";
import { isUnexpected } from "../src/generated";
import MapsRender from "../src/mapsRender";

/**
 * @summary How to get the copyright attribution of a certain tileset.
 */
async function main(): Promise<void> {
  /**
   * Azure Maps supports two ways to authenticate requests:
   * - Shared Key authentication (subscription-key)
   * - Microsoft Entra ID authentication
   *
   * In this sample you can populate the three AZURE_CLIENT_ID, AZURE_CLIENT_SECRET & AZURE_TENANT_ID variables for Microsoft Entra ID auth,
   * or put MAPS_SUBSCRIPTION_KEY into .env file to use the shared key authentication.
   *
   * More info is available at https://docs.microsoft.com/en-us/azure/azure-maps/azure-maps-authentication.
   */
  /** Microsoft Entra ID authentication */
  const credential = new DefaultAzureCredential();
  const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
  const client = MapsRender(credential, mapsClientId);

  /** Shared Key authentication (subscription-key) */
  // const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY || "";
  // const credential = new AzureKeyCredential(subscriptionKey);
  // const client = MapsRender(credential);

  const baseResponse = await client.path("/map/attribution").get({
    queryParameters: {
      tilesetId: "microsoft.base",
      zoom: 6,
      /** The order is [SouthwestCorner_Longitude, SouthwestCorner_Latitude, NortheastCorner_Longitude, NortheastCorner_Latitude] */
      bounds: [-122.414162, 47.57949, -122.247157, 47.668372],
    },
  });

  if (isUnexpected(baseResponse)) {
    throw baseResponse.body.error;
  }

  console.log("Copyright attribution for microsoft.base: ");
  baseResponse.body.copyrights.forEach((copyright) => console.log(copyright));

  /** Map attribution for different tileset */
  const imageryResponse = await client.path("/map/attribution").get({
    queryParameters: {
      tilesetId: "microsoft.imagery",
      zoom: 6,
      /** The order is [SouthwestCorner_Longitude, SouthwestCorner_Latitude, NortheastCorner_Longitude, NortheastCorner_Latitude] */
      bounds: [-122.414162, 47.57949, -122.247157, 47.668372],
    },
  });

  if (isUnexpected(imageryResponse)) {
    throw imageryResponse.body.error;
  }

  console.log("Copyright attribution for microsoft.imagery: ");
  imageryResponse.body.copyrights.forEach((copyright) => console.log(copyright));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
