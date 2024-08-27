// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DefaultAzureCredential } = require("@azure/identity");
const { createWriteStream } = require("fs");
const MapsRender = require("@azure-rest/maps-render").default,
  { positionToTileXY } = require("@azure-rest/maps-render");

/**
 * @summary How to get the map tile and store it as a file in **Node.js**.
 */
async function main() {
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

  const zoom = 6;
  const { x, y } = positionToTileXY([47.61559, -122.33817], 6, "256");
  const response = await client
    .path("/map/tile")
    .get({
      queryParameters: {
        tilesetId: "microsoft.base.road",
        zoom,
        x,
        y,
      },
    })
    /**
     * This is a Node.js API and cannot be used in a browser.
     * If you're using a browser, please refer to the `getMapTileInBrowser` sample.
     */
    .asNodeStream();

  if (!response.body) {
    throw Error("No response body");
  }
  response.body.pipe(createWriteStream("tile.png"));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
