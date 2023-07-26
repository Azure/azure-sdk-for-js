// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { createWriteStream } from "fs";
import MapsRender, { positionToTileXY } from "@azure-rest/maps-render";
import * as dotenv from "dotenv";
dotenv.config();

/**
 * @summary How to get the map tile and store it as a file in Node.js.
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
  // const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
  // const client = MapsRender(credential, mapsClientId);

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
    .asNodeStream();

  if (!response.body) {
    throw Error("No response body");
  }
  response.body.pipe(createWriteStream("tile.png"));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
