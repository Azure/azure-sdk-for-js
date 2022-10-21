// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to manipulate batch requests.
 */

import { AzureKeyCredential } from "@azure/core-auth";
// import { DefaultAzureCredential } from "@azure/identity";
import {
  createMapsRouteClient,
  createRouteDirectionsBatchRequest,
  getLongRunningPoller,
  toColonDelimitedLatLonString,
} from "@azure-rest/maps-route";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * We use "/route/directions/batch/" in this example.
 * But the same approach can be used in:
 *  - "/route/matrix/"
 */
async function main() {
  /** Use subscription key authentication */
  const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY || "";
  const credential = new AzureKeyCredential(subscriptionKey);
  const client = createMapsRouteClient(credential);

  /** Or use Azure AD authentication */
  // const credential = new DefaultAzureCredential();
  // const mapsClientId = process.env.MAPS_CLIENT_ID || "";
  // const client = new MapsRouteClient(credential, mapsClientId);

  const routeDirectionRequests = createRouteDirectionsBatchRequest([
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
  ]);

  const routeDirectionBatchInitRes1 = await client
    .path("/route/directions/batch/{format}", "json")
    .post({
      body: routeDirectionRequests,
    });

  const routeDirectionsPoller1 = getLongRunningPoller(client, routeDirectionBatchInitRes1);
  /* We can get a partial of the results first */
  await routeDirectionsPoller1.poll();
  /** And get the results we have right now */
  const result1 = await routeDirectionsPoller1.getResult();
  console.log(result1 && result1.body);
  /** Or simply wait until the total request is done */
  console.log(await (await routeDirectionsPoller1.pollUntilDone()).body);

  /** We can also start it, then serialize it, and start with another poller */
  const routeDirectionsInitRes2 = await client
    .path("/route/directions/batch/{format}", "json")
    .post({
      body: routeDirectionRequests,
    });
  const routeDirectionsPoller2 = getLongRunningPoller(client, routeDirectionsInitRes2);
  await routeDirectionsPoller2.poll();
  const result2 = await routeDirectionsPoller2.getResult();
  console.log(result2 && result2.body);
  /** Serialized the current operation for future poller */
  const serializedState = routeDirectionsPoller2.toString();
  /** Use resume*Batch method to rehydrate the previous operation */
  const rehydratedFuzzySearchPoller = getLongRunningPoller(client, routeDirectionsInitRes2, {
    resumeFrom: serializedState,
  });
  console.log(await (await rehydratedFuzzySearchPoller.pollUntilDone()).body);
}

main().catch((e) => console.error(e));
