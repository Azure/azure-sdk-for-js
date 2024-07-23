// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a MapsRoute to calculate routes.
 */

import { DefaultAzureCredential } from "@azure/identity";
import MapsRoute, {
  createRouteDirectionsBatchRequest,
  isUnexpected,
  toColonDelimitedLatLonString,
  RouteRequestRouteDirectionsBatchSync200Response,
} from "@azure-rest/maps-route";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

async function main(): Promise<void> {
  /**
   * Azure Maps supports two ways to authenticate requests:
   * - Shared Key authentication (subscription-key)
   * - Microsoft Entra ID authentication
   *
   * In this sample you can populate the three AZURE_CLIENT_ID, AZURE_CLIENT_SECRET & AZURE_TENANT_ID variables for Microsoft Entra ID auth,
   * Or put MAPS_SUBSCRIPTION_KEY into .env file to use the shared key authentication.
   *
   * More info is available at https://docs.microsoft.com/en-us/azure/azure-maps/azure-maps-authentication.
   */
  
  /** Microsoft Entra ID authentication */
  const credential = new DefaultAzureCredential();
  const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
  const client = MapsRoute(credential, mapsClientId);

  /** Shared Key authentication (subscription-key) */
  // const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY || "";
  // const credential = new AzureKeyCredential(subscriptionKey);
  // const client = MapsRoute(credential);

  /**
   * Should provide at least two coordinates, origin and destination to the query.
   */
  const getRouteDirectionsResult = await client.path("/route/directions/{format}", "json").get({
    queryParameters: {
      query: toColonDelimitedLatLonString([
        // Origin
        [47.644702, -122.130137],
        // Waypoints (optional)
        [47.5246, -122.1103],
        [47.4789, -122.3451],
        // Destination
        [47.61397, -122.3352],
      ]),
      /**
       * Could also provide additional conditions to the query.
       */
      vehicleWidth: 2,
      vehicleHeight: 2,
      vehicleLoadType: "USHazmatClass1",
      travelMode: "truck",
      vehicleCommercial: true,
    },
  });

  /**
   * Handle the error when there's an exception
   */
  if (isUnexpected(getRouteDirectionsResult)) {
    throw getRouteDirectionsResult.body.error;
  }

  getRouteDirectionsResult.body.routes.forEach(({ summary, legs }) => {
    console.log(
      `The total distance is ${summary.lengthInMeters} meters, and it takes ${summary.travelTimeInSeconds} seconds.`,
    );
    legs.forEach(({ summary: legSummary, points }, idx) => {
      console.log(
        `The ${idx + 1}th leg's length is ${legSummary.lengthInMeters} meters, and it takes ${
          legSummary.travelTimeInSeconds
        } seconds. Followings are the first 10 points: `,
      );
      console.table(points.slice(0, 10));
    });
  });

  /**
   * We can also do complex calculation with additional parameters.
   * For example, we can provide avoided areas so the route won't pass through them.
   */
  const routeDirectionsWithParamResult = await client
    .path("/route/directions/{format}", "json")
    .post({
      queryParameters: {
        query: toColonDelimitedLatLonString([
          [52.50931, 13.42936],
          [52.50274, 13.43872],
        ]),
      },
      body: {
        avoidAreas: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [-122.39456176757811, 47.489368981370724],
                [-122.00454711914061, 47.489368981370724],
                [-122.00454711914061, 47.65151268066222],
                [-122.39456176757811, 47.65151268066222],
                [-122.39456176757811, 47.489368981370724],
              ],
            ],
            [
              [
                [100.0, 0.0],
                [101.0, 0.0],
                [101.0, 1.0],
                [100.0, 1.0],
                [100.0, 0.0],
              ],
            ],
          ],
        },
      },
    });

  if (isUnexpected(routeDirectionsWithParamResult)) {
    throw routeDirectionsWithParamResult.body.error;
  }

  getRouteDirectionsResult.body.routes.forEach(({ summary, legs }) => {
    console.log(
      `The total distance is ${summary.lengthInMeters} meters, and it takes ${summary.travelTimeInSeconds} seconds.`,
    );
    legs.forEach(({ summary: letSummary, points }, idx) => {
      console.log(
        `The ${idx + 1}th leg's length is ${letSummary.lengthInMeters} meters, and it takes ${
          letSummary.travelTimeInSeconds
        } seconds. Followings are the first 10 points: `,
      );
      console.table(points.slice(0, 10));
    });
  });

  /**
   * We can also use the batch API to do multiple queries at once synchronously.
   * For asynchronous, please refer to the lro.ts and resumeLro.ts
   */
  const routeDirectionBatchInitRes = await client
    .path("/route/directions/batch/sync/{format}", "json")
    .post({
      body: createRouteDirectionsBatchRequest([
        {
          query: toColonDelimitedLatLonString([
            [47.639987, -122.128384],
            [47.621252, -122.184408],
            [47.596437, -122.332],
          ]),
          routeType: "fastest",
          travelMode: "car",
          maxAlternatives: 5,
        },
        {
          query: toColonDelimitedLatLonString([
            [47.620659, -122.348934],
            [47.610101, -122.342015],
          ]),
          routeType: "eco",
          travelMode: "bicycle",
          traffic: false,
        },
        {
          query: toColonDelimitedLatLonString([
            [40.759856, -73.985108],
            [40.771136, -73.973506],
          ]),
          routeType: "shortest",
          travelMode: "pedestrian",
        },
      ]),
    });

  if (isUnexpected(routeDirectionBatchInitRes)) {
    throw routeDirectionBatchInitRes.body.error;
  }

  const { summary, batchItems } = (
    routeDirectionBatchInitRes as RouteRequestRouteDirectionsBatchSync200Response
  ).body;
  console.log(`${summary.successfulRequests}/${summary.totalRequests} requests succeeded.`);
  batchItems.forEach((item, index) => {
    if (item.response.error) {
      console.error(`Request ${index} failed with error: ${item.response.error.message}`);
    } else {
      console.log(`Request ${index} success!`);
      item.response.routes.forEach(({ summary: routeSummary, legs }) => {
        console.log(
          `The total distance is ${routeSummary.lengthInMeters} meters, and it takes ${routeSummary.travelTimeInSeconds} seconds.`,
        );
        legs.forEach(({ summary: legSummary, points }, idx) => {
          console.log(
            `The ${idx + 1}th leg's length is ${legSummary.lengthInMeters} meters, and it takes ${
              legSummary.travelTimeInSeconds
            } seconds. Followings are the first 10 points: `,
          );
          console.table(points.slice(0, 10));
        });
      });
    }
  });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
