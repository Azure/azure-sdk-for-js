// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to manipulate a long running request.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const MapsRoute = require("@azure-rest/maps-route").default,
  {
    createRouteDirectionsBatchRequest,
    getLongRunningPoller,
    toColonDelimitedLatLonString,
  } = require("@azure-rest/maps-route");
require("dotenv").config();

/**
 * We use "/route/directions/batch/" in this example.
 * But the same approach can be used in:
 *  - "/route/matrix/"
 */
async function main() {
  /** Use Azure AD authentication (Recommended) */
  const credential = new DefaultAzureCredential();
  const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
  const client = MapsRoute(credential, mapsClientId);

  /** Use subscription key authentication */
  // const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY || "";
  // const credential = new AzureKeyCredential(subscriptionKey);
  // const client = MapsRoute(credential);

  const request = createRouteDirectionsBatchRequest([
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
    // This is a failed example, the longitude is out of range.
    {
      query: toColonDelimitedLatLonString([
        [47.620659, -922.348934],
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
  ]);

  const response = await client.path("/route/directions/batch/{format}", "json").post({
    body: request,
  });

  const poller = getLongRunningPoller(client, response);
  /** Wait until the total request is done */
  const finalResult = await poller.pollUntilDone();
  logBatchResponse(finalResult);
}

function logBatchResponse(result) {
  const { summary, batchItems } = result.body;
  console.log(`${summary.successfulRequests}/${summary.totalRequests} requests succeeded.`);
  batchItems.forEach((item, index) => {
    if (item.response.error) {
      console.error(`Request ${index} failed with error: ${item.response.error.message}`);
    } else {
      console.log(`Request ${index} success!`);
      item.response.routes.forEach(({ summary: itemSummary, legs }) => {
        console.log(
          `The total distance is ${itemSummary.lengthInMeters} meters, and it takes ${itemSummary.travelTimeInSeconds} seconds.`,
        );
        legs.forEach(({ summary: legSummary, points }, idx) => {
          console.log(
            `The ${idx + 1}th leg's length is ${legSummary.lengthInMeters} meters, and it takes ${legSummary.travelTimeInSeconds} seconds. Followings are the first 10 points: `,
          );
          console.table(points.slice(0, 10));
        });
      });
    }
  });
}

main().catch((e) => console.error(e));
