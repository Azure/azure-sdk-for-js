// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureKeyCredential } = require("@azure/core-auth");
const { isUnexpected } = require("@azure-rest/maps-render");
const MapsRender = require("@azure-rest/maps-render").default;
require("dotenv").config();

/**
 * @summary How to get the copyright attribution of a certain tileset.
 */
async function main() {
  /**
   * Azure Maps supports two ways to authenticate requests:
   * - Shared Key authentication (subscription-key)
   * - Azure Active Directory (Azure AD) authentication
   *
   * In this sample you can put MAPS_SUBSCRIPTION_KEY into .env file to use the first approach or populate
   * the three AZURE_CLIENT_ID, AZURE_CLIENT_SECRET & AZURE_TENANT_ID variables for trying out AAD auth.
   *
   * More info is available at https://docs.microsoft.com/en-us/azure/azure-maps/azure-maps-authentication.
   */
  /** Shared Key authentication (subscription-key) */
  const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY || "";
  const credential = new AzureKeyCredential(subscriptionKey);
  const client = MapsRender(credential);

  /** Azure Active Directory (Azure AD) authentication */
  // const credential = new DefaultAzureCredential();
  // const mapsClientId = process.env.MAPS_CLIENT_ID || "";
  // const client = MapsRender(credential, mapsClientId);

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
