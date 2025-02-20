// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import MapsRender, {
  createPathQuery,
  createPinsQuery,
  isUnexpected,
  positionToTileXY,
} from "../src/index.js";
import type { CircularPath, PinSet, PolygonalPath } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential, AzureSASCredential } from "@azure/core-auth";
// @ts-ignore
import { AzureMapsManagementClient } from "@azure/arm-maps";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import { createWriteStream } from "node:fs";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const credential = new DefaultAzureCredential();
    const client = MapsRender(credential, "<maps-account-client-id>");
  });

  it("ReadmeSampleCreateClient_SubscriptionKey", async () => {
    const credential = new AzureKeyCredential("<subscription-key>");
    const client = MapsRender(credential);
  });

  it("ReadmeSampleCreateClient_SASToken", async () => {
    const credential = new AzureSASCredential("<SAS Token>");
    const client = MapsRender(credential);
  });

  it("ReadmeSampleCreateClient_SAS", async () => {
    const subscriptionId = "<subscription ID of the map account>";
    const resourceGroupName = "<resource group name of the map account>";
    const accountName = "<name of the map account>";
    const mapsAccountSasParameters = {
      start: "<start time in ISO format>", // e.g. "2023-11-24T03:51:53.161Z"
      expiry: "<expiry time in ISO format>", // maximum value to start + 1 day
      maxRatePerSecond: 500,
      principalId: "<principle ID (object ID) of the managed identity>",
      signingKey: "primaryKey",
    };
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const managementClient = new AzureMapsManagementClient(credential, subscriptionId);
    const { accountSasToken } = await managementClient.accounts.listSas(
      resourceGroupName,
      accountName,
      mapsAccountSasParameters,
    );
    // @ts-preserve-whitespace
    if (accountSasToken === undefined) {
      throw new Error("No accountSasToken was found for the Maps Account.");
    }
    // @ts-preserve-whitespace
    const sasCredential = new AzureSASCredential(accountSasToken);
    const client = MapsRender(sasCredential);
  });

  it("ReadmeSampleRequestMapTiles", async () => {
    const credential = new DefaultAzureCredential();
    const client = MapsRender(credential, "<maps-account-client-id>");
    // @ts-preserve-whitespace
    const zoom = 6;
    // Use the helper function `positionToTileXY` to get the tile index from the coordinate.
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
    // @ts-preserve-whitespace
    // Handle the error.
    if (!response.body) {
      throw Error("No response body");
    }
    // @ts-preserve-whitespace
    response.body.pipe(createWriteStream("tile.png"));
  });

  it("ReadmeSampleRequestMapAttribution", async () => {
    const credential = new DefaultAzureCredential();
    const client = MapsRender(credential, "<maps-account-client-id>");
    // @ts-preserve-whitespace
    const response = await client.path("/map/attribution").get({
      queryParameters: {
        tilesetId: "microsoft.base",
        zoom: 6,
        // The order is [SouthwestCorner_Longitude, SouthwestCorner_Latitude, NortheastCorner_Longitude, NortheastCorner_Latitude]
        bounds: [-122.414162, 47.57949, -122.247157, 47.668372],
      },
    });
    // @ts-preserve-whitespace
    // Handle exception.
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    // @ts-preserve-whitespace
    console.log("Copyright attribution for microsoft.base: ");
    response.body.copyrights.forEach((copyright) => console.log(copyright));
  });

  it("ReadmeSampleRequestTilesetMetadata", async () => {
    const credential = new DefaultAzureCredential();
    const client = MapsRender(credential, "<maps-account-client-id>");
    // @ts-preserve-whitespace
    const response = await client.path("/map/tileset").get({
      queryParameters: {
        tilesetId: "microsoft.base",
      },
    });
    // @ts-preserve-whitespace
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    // @ts-preserve-whitespace
    console.log("The metadata of Microsoft Base tileset: ");
    const { maxzoom, minzoom, bounds = [] } = response.body;
    console.log(`The zoom range started from ${minzoom} to ${maxzoom}`);
    console.log(
      `The left bound is ${bounds[0]}, bottom bound is ${bounds[1]}, right bound is ${bounds[2]}, and top bound is ${bounds[3]}`,
    );
  });

  it("ReadmeSampleCreatePathQuery", async () => {
    const credential = new DefaultAzureCredential();
    const client = MapsRender(credential, "<maps-account-client-id>");
    // @ts-preserve-whitespace
    const circularPath: CircularPath = {
      center: [52.4559, 13.228],
      radiusInMeters: 10000,
      options: {
        lineColor: "000000",
        lineOpacity: 0.9,
        lineWidthInPixels: 2,
      },
    };
    // @ts-preserve-whitespace
    const linearPath: PolygonalPath = {
      coordinates: [
        [52.577, 13.35],
        [52.6, 13.2988],
        [52.32, 13.2988],
      ],
      options: {
        lineColor: "000000",
        lineOpacity: 0.9,
        lineWidthInPixels: 2,
      },
    };
    // @ts-preserve-whitespace
    const polygonPath: PolygonalPath = {
      coordinates: [
        [52.577, 13.35],
        [52.6, 13.2988],
        [52.32, 13.2988],
        [52.577, 13.35],
      ],
      options: {
        lineColor: "000000",
        lineOpacity: 0.9,
        lineWidthInPixels: 2,
        fillColor: "FFFFFF",
        fillOpacity: 0.8,
      },
    };
    // @ts-preserve-whitespace
    const path = createPathQuery([circularPath, linearPath, polygonPath]);
    // Send the request
    const response = await client
      .path("/map/static")
      .get({
        queryParameters: {
          bbox: [13.228, 52.4559, 13.5794, 52.629],
          path,
        },
      })
      .asNodeStream();
    // @ts-preserve-whitespace
    // Handle the error.
    if (!response.body) {
      throw Error("No response body");
    }
    // @ts-preserve-whitespace
    response.body.pipe(createWriteStream("path.png"));
  });

  it("ReadmeSampleCreatePinsQuery", async () => {
    const credential = new DefaultAzureCredential();
    const client = MapsRender(credential, "<maps-account-client-id>");
    // @ts-preserve-whitespace
    const pins: PinSet[] = [
      {
        pins: [
          { coordinate: [52.577, 13.35], label: "Label start" },
          { coordinate: [52.6, 13.2988], label: "Label end" },
        ],
        pinImage: "default",
        options: {
          scale: 0.9,
          pinColor: "FF0000",
          labelColor: "0000FF",
          labelSizeInPixels: 18,
        },
      },
    ];
    // @ts-preserve-whitespace
    const path = createPinsQuery(pins);
    // @ts-preserve-whitespace
    const response = await client
      .path("/map/static")
      .get({
        queryParameters: {
          bbox: [13.228, 52.4559, 13.5794, 52.62],
          zoom: 10,
          path,
        },
        skipUrlEncoding: true,
      })
      .asNodeStream();
    // @ts-preserve-whitespace
    // Handle the error.
    if (!response.body) {
      throw Error("No response body");
    }
    // @ts-preserve-whitespace
    response.body.pipe(createWriteStream("pin.png"));
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
