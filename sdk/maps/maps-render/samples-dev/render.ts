// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates Render API usage. Simple queries are performed.
 */

import fs from "fs";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { MapsRenderClient, KnownTilesetId, KnownRasterTileFormat } from "@azure/maps-render";
import * as dotenv from "dotenv";
dotenv.config();

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

async function main() {
  let client: MapsRenderClient;

  if (process.env.MAPS_SUBSCRIPTION_KEY) {
    // Use subscription key authentication
    const credential = new AzureKeyCredential(process.env.MAPS_SUBSCRIPTION_KEY);
    client = new MapsRenderClient(credential);
  } else {
    // Use Azure AD authentication
    if (process.env.MAPS_CLIENT_ID) {
      const credential = new DefaultAzureCredential();
      const mapsClientId = process.env.MAPS_CLIENT_ID;
      client = new MapsRenderClient(credential, mapsClientId);
    } else {
      throw Error("Cannot authenticate the client.");
    }
  }

  console.log(" --- Get copyright caption:");
  console.log(await client.getCopyrightCaption());

  console.log(" --- Get copyright for tile:");
  let tileIndex = { z: 6, x: 9, y: 22 };
  console.log(await client.getCopyrightForTile(tileIndex));

  console.log(" --- Get copyright for world:");
  console.log(await client.getCopyrightForWorld());

  console.log(" --- Get copyright from bounding box:");
  const boundingBox = {
    bottomRight: { latitude: 52.41064, longitude: 4.84239 },
    topLeft: { latitude: 52.41072, longitude: 4.84228 },
  };
  console.log(await client.getCopyrightFromBoundingBox(boundingBox));

  if (!fs.existsSync("tmp")) fs.mkdirSync("tmp");

  const statesetId = process.env.CREATOR_STATESET_ID;
  if (typeof statesetId === "string" && statesetId.length == 36) {
    console.log(" --- Get map state tile:");
    let result = await client.getMapStateTile(statesetId, tileIndex);
    // use result.blobBody for Browser, readableStreamBody for Node.js:
    result.readableStreamBody &&
      result.readableStreamBody.pipe(fs.createWriteStream("tmp/state_tile.pbf"));
  }

  console.log(" --- Get map static image:");
  const mapStaticImageOptions = {
    layer: "basic",
    style: "dark",
    zoom: 2,
    boundingBox: {
      bottomRight: { latitude: 42.982261, longitude: 24.980233 },
      topLeft: { latitude: 56.526017, longitude: 1.355233 },
    },
  };
  let result = await client.getMapStaticImage(KnownRasterTileFormat.Png, mapStaticImageOptions);
  // use result.blobBody for Browser, readableStreamBody for Node.js:
  result.readableStreamBody &&
    result.readableStreamBody.pipe(fs.createWriteStream("tmp/static_image.png"));

  console.log(" --- Get map tile v2:");
  const mapTileOptions = { tileSize: "512" };
  result = await client.getMapTile(KnownTilesetId.MicrosoftBase, tileIndex, mapTileOptions);
  // use result.blobBody for Browser, readableStreamBody for Node.js:
  result.readableStreamBody &&
    result.readableStreamBody.pipe(fs.createWriteStream("tmp/tile_v2.vector.pbf"));

  console.log(" --- Get attribution:");
  const attribution = await client.getMapAttribution(KnownTilesetId.MicrosoftBase, 6, {
    bottomRight: { latitude: 47.57949, longitude: -122.247157 },
    topLeft: { latitude: 47.668372, longitude: -122.414162 },
  });
  console.log(attribution);

  console.log(" --- Get tileset metadata:");
  const metadata = await client.getMapTileset(KnownTilesetId.MicrosoftBase);
  console.log(metadata);
}

main();
