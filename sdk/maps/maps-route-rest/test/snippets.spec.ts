// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import MapsRoute, { isUnexpected, toColonDelimitedLatLonString } from "../src/index.js";
import { AzureKeyCredential, AzureSASCredential } from "@azure/core-auth";
import { DefaultAzureCredential } from "@azure/identity";
// @ts-ignore
import { AzureMapsManagementClient } from "@azure/arm-maps";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const credential = new DefaultAzureCredential();
    const client = MapsRoute(credential, "<maps-account-client-id>");
  });

  it("ReadmeSampleCreateClient_SubscriptionKey", async () => {
    const credential = new AzureKeyCredential("<subscription-key>");
    const client = MapsRoute(credential);
  });

  it("ReadmeSampleCreateClient_SASToken", async () => {
    const credential = new AzureSASCredential("<SAS Token>");
    const client = MapsRoute(credential);
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
    const client = MapsRoute(sasCredential);
  });

  it("ReadmeSampleRouteDirections", async () => {
    const credential = new DefaultAzureCredential();
    const client = MapsRoute(credential, "<maps-account-client-id>");
    // @ts-preserve-whitespace
    const routeDirectionsResult1 = await client.path("/route/directions/{format}", "json").get({
      queryParameters: {
        query: "51.368752,-0.118332:41.385426,-0.128929",
      },
    });
    // @ts-preserve-whitespace
    // You can use the helper function `toColonDelimitedLatLonString` to compose the query string.
    const routeDirectionsResult2 = await client.path("/route/directions/{format}", "json").get({
      queryParameters: {
        query: toColonDelimitedLatLonString([
          // Origin:
          [51.368752, -0.118332],
          // Waypoints (Optional):
          [45.49735, 9.182435],
          [48.886128, 2.329742],
          [48.159642, 11.518011],
          // Destination:
          [41.385426, -0.128929],
        ]),
      },
    });
    // @ts-preserve-whitespace
    // Handle the error if the request failed
    if (isUnexpected(routeDirectionsResult2)) {
      throw routeDirectionsResult2.body.error;
    }
    // @ts-preserve-whitespace
    routeDirectionsResult2.body.routes.forEach(({ summary, legs }) => {
      console.log(
        `The total distance is ${summary.lengthInMeters} meters, and it takes ${summary.travelTimeInSeconds} seconds.`,
      );
      legs.forEach(({ summary, points }, idx) => {
        console.log(
          `The ${idx + 1}th leg's length is ${summary.lengthInMeters} meters, and it takes ${
            summary.travelTimeInSeconds
          } seconds. Followings are the first 10 points: `,
        );
        console.table(points.slice(0, 10));
      });
    });
  });

  it("ReadmeSampleRouteDirectionsCommercialVehicle", async () => {
    const credential = new DefaultAzureCredential();
    const client = MapsRoute(credential, "<maps-account-client-id>");
    // @ts-preserve-whitespace
    const routeDirectionsResult = await client.path("/route/directions/{format}", "json").get({
      queryParameters: {
        query: toColonDelimitedLatLonString([
          // Origin
          [51.368752, -0.118332],
          // Waypoints (Optional):
          [45.49735, 9.182435],
          [48.886128, 2.329742],
          [48.159642, 11.518011],
          // Destination:
          [41.385426, -0.128929],
        ]),
        vehicleWidthInMeters: 2,
        vehicleHeightInMeters: 2,
        vehicleLoadType: "USHazmatClass1",
        travelMode: "truck",
        isCommercialVehicle: true,
      },
    });
    // @ts-preserve-whitespace
    if (isUnexpected(routeDirectionsResult)) {
      throw routeDirectionsResult.body.error;
    }
    // @ts-preserve-whitespace
    routeDirectionsResult.body.routes.forEach(({ summary, legs }) => {
      console.log(
        `The total distance is ${summary.lengthInMeters} meters, and it takes ${summary.travelTimeInSeconds} seconds.`,
      );
      legs.forEach(({ summary, points }, idx) => {
        console.log(
          `The ${idx + 1}th leg's length is ${summary.lengthInMeters} meters, and it takes ${
            summary.travelTimeInSeconds
          } seconds. Followings are the first 10 points: `,
        );
        console.table(points.slice(0, 10));
      });
    });
  });

  it("ReadmeSampleRouteDirectionsOptimize", async () => {
    const credential = new DefaultAzureCredential();
    const client = MapsRoute(credential, "<maps-account-client-id>");
    // @ts-preserve-whitespace
    const routeDirectionsResult = await client.path("/route/directions/{format}", "json").get({
      queryParameters: {
        query: toColonDelimitedLatLonString([
          // Origin:
          [51.368752, -0.118332],
          // Waypoints:
          [45.49735, 9.182435],
          [48.886128, 2.329742],
          [48.159642, 11.518011],
          // Destination:
          [41.385426, -0.128929],
        ]),
        computeBestOrder: true,
        routeType: "shortest",
      },
    });
    // @ts-preserve-whitespace
    if (isUnexpected(routeDirectionsResult)) {
      throw routeDirectionsResult.body.error;
    }
    // @ts-preserve-whitespace
    const { summary } = routeDirectionsResult.body.routes[0];
    console.log(
      `The optimized distance is ${summary.lengthInMeters} meters, and it takes ${summary.travelTimeInSeconds} seconds.`,
    );
    console.log("The route is optimized by: ");
    routeDirectionsResult.body.optimizedWaypoints.forEach(
      ({ providedIndex, optimizedIndex }) => `Moving index ${providedIndex} to ${optimizedIndex}`,
    );
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
