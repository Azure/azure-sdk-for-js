// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a MapsRouteClient to retrieve a setting value.
 */

const { AzureKeyCredential } = require("@azure/core-auth");
// import { DefaultAzureCredential } from "@azure/identity";
const MapsRouteClient = require("@azure-rest/maps-route").default,
  {
    createRouteDirectionsBatchRequest,
    getLongRunningPoller,
    isUnexpected,
    toColonDelimitedLatLonString,
  } = require("@azure-rest/maps-route");

// Load the .env file if it exists
require("dotenv").config();

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
  const client = MapsRouteClient(credential);

  /** Azure Active Directory (Azure AD) authentication */
  // const credential = new DefaultAzureCredential();
  // const mapsClientId = process.env.MAPS_CLIENT_ID || "";
  // const client = MapsRouteClient(credential, mapsClientId);

  console.log(" --- Get route directions:");
  const getRouteDirectionsResult = await client.path("/route/directions/{format}", "json").get({
    queryParameters: {
      query: toColonDelimitedLatLonString([
        [51.368752, -0.118332],
        [41.385426, -0.128929],
      ]),
      vehicleWidthInMeters: 2,
      vehicleHeightInMeters: 2,
      vehicleLoadType: "USHazmatClass1",
      travelMode: "truck",
      isCommercialVehicle: true,
    },
  });

  if (isUnexpected(getRouteDirectionsResult)) {
    throw getRouteDirectionsResult.body.error;
  }
  console.log(getRouteDirectionsResult.body);

  console.log(" --- Get route directions with additional parameters:");
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
        supportingPoints: {
          type: "GeometryCollection",
          geometries: [
            {
              type: "Point",
              coordinates: [13.42936, 52.5093],
            },
            {
              type: "Point",
              coordinates: [13.42859, 52.50844],
            },
          ],
        },
        avoidVignette: ["AUS", "CHE"],
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
  console.log(routeDirectionsWithParamResult.body);

  console.log(" --- Get route range:");
  const routeRangeResult = await client
    .path("/route/range/{format}", "json")
    .get({ queryParameters: { query: [50.97452, 5.86605], timeBudgetInSec: 6000 } });

  if (isUnexpected(routeRangeResult)) {
    throw routeRangeResult.body.error;
  }
  console.log(routeRangeResult.body);

  console.log(" --- Request route directions batch:");
  const routeDirectionBatchInitRes = await client
    .path("/route/directions/batch/{format}", "json")
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
          useTrafficData: false,
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

  const routeDirectionBatchPoller = getLongRunningPoller(client, routeDirectionBatchInitRes);
  const routeDirectionsBatchResults = await routeDirectionBatchPoller.pollUntilDone();
  routeDirectionsBatchResults.body.batchItems.map((item, idx) => {
    console.log(`${idx}:`);
    console.log(item.response);
  });

  console.log(" --- Post route matrix:");
  const routeMatrixInitRes = await client.path("/route/matrix/{format}", "json").post({
    queryParameters: {
      vehicleWidthInMeters: 2,
      vehicleHeightInMeters: 2,
      vehicleLoadType: "USHazmatClass1",
      travelMode: "truck",
      isCommercialVehicle: true,
    },
    body: {
      origins: {
        type: "MultiPoint",
        coordinates: [
          [4.85106, 52.36006],
          [4.85056, 52.36187],
        ],
      },
      destinations: {
        type: "MultiPoint",
        coordinates: [
          [4.85003, 52.36241],
          [13.42937, 52.50931],
        ],
      },
    },
  });

  const routeMatrixPoller = getLongRunningPoller(client, routeMatrixInitRes);
  const routeMatrixResult = await routeMatrixPoller.pollUntilDone();
  console.log(routeMatrixResult.body.matrix);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
