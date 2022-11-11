// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { createWriteStream } from "fs";
import MapsRender, { createPathQuery, createPinsQuery } from "@azure-rest/maps-render";

/**
 * @summary How to get the map static image and store it as a file in Node.js
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

  /** In this example, we handle the response stream in Node.js. For how to handle the browser stream, please refer to getMapTileInBrowser.ts */
  /** To get static image, one can assign bbox and zoom to the queryParameters */
  const res1 = await client
    .path("/map/static/{format}", "png")
    .get({
      queryParameters: {
        bbox: [13.228, 52.4559, 13.5794, 52.62],
        zoom: 10,
      },
    })
    .asNodeStream();

  if (!res1.body) {
    throw Error("No response body");
  }
  res1.body.pipe(createWriteStream("image1.png"));

  /** The other way is to assign center with image width and height to the queryParameters */
  const res2 = await client
    .path("/map/static/{format}", "png")
    .get({
      queryParameters: {
        center: [13.228, 52.4559],
        width: 800,
        height: 600,
      },
    })
    .asNodeStream();

  if (!res2.body) {
    throw Error("No response body");
  }
  res2.body.pipe(createWriteStream("image2.png"));

  /** In a more complex scenario, we can also add pins and paths on the map to make it more vivid */
  // Prepare pins sets
  const pinsSet1 = createPinsQuery(
    [
      { coordinate: [52.577, 13.35], label: "Label start" },
      { coordinate: [52.6, 13.2988], label: "Label end" },
    ],
    {
      scale: 0.9,
      pinColor: "FF0000",
      labelColor: "0000FF",
      labelSizeInPixels: 18,
    }
  );

  // Prepare path
  const path = createPathQuery(
    [
      [52.577, 13.35],
      [52.6, 13.2988],
    ],
    {
      lineColor: "000000",
      lineWidthInPixels: 5,
    }
  );

  // Make the request
  const res3 = await client
    .path("/map/static/{format}", "png")
    .get({
      queryParameters: {
        bbox: [13.228, 52.4559, 13.5794, 52.62],
        zoom: 10,
        path: [path],
        pins: [pinsSet1],
      },
    })
    .asNodeStream();

  if (!res3.body) {
    throw Error("No response body");
  }
  res3.body.pipe(createWriteStream("image3.png"));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
