// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to manipulate batch requests.
 */

const { AzureKeyCredential } = require("@azure/core-auth");
// import { DefaultAzureCredential } from "@azure/identity";
const { KnownRouteType, KnownTravelMode, MapsRouteClient } = require("@azure/maps-route");
require("dotenv").config();

/**
 * We use beginRequestRouteDirectionsBatch/resumeRequestRouteDirectionsBatch in this example.
 * But the same approach can be used in:
 *  - beginRequestRouteMatrix/resumeRequestRouteMatrix
 */
async function main() {
  /** Use subscription key authentication */
  const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY || "";
  const credential = new AzureKeyCredential(subscriptionKey);
  const client = new MapsRouteClient(credential);

  /** Or use Azure AD authentication */
  // const credential = new DefaultAzureCredential();
  // const mapsClientId = process.env.MAPS_CLIENT_ID || "";
  // const client = new MapsRouteClient(credential, mapsClientId);

  const routeDirectionsRequests = [
    {
      routePoints: [
        [47.639987, -122.128384],
        [47.621252, -122.184408],
        [47.596437, -122.332],
      ],
      options: {
        routeType: KnownRouteType.Fastest,
        travelMode: KnownTravelMode.Car,
        maxAlternatives: 5,
      },
    },
    {
      routePoints: [
        [47.620659, -122.348934],
        [47.610101, -122.342015],
      ],
      options: {
        routeType: KnownRouteType.Economy,
        travelMode: KnownTravelMode.Bicycle,
        useTrafficData: false,
      },
    },
    {
      routePoints: [
        [40.759856, -73.985108],
        [40.771136, -73.973506],
      ],
      options: { routeType: KnownRouteType.Shortest, travelMode: KnownTravelMode.Pedestrian },
    },
  ];
  /** Batch request is a long running operation. We cannot get the result immediately. Thus return a poller for getting result later. */
  let routeDirectionsPoller = await client.beginRequestRouteDirectionsBatch(
    routeDirectionsRequests
  );
  /** We can get a partial of the results first */
  console.log(await routeDirectionsPoller.getResult());
  /** Or simply wait until the total request is done */
  console.log(await routeDirectionsPoller.pollUntilDone());

  /** We can also start it, then serialize it, and start with another poller */
  routeDirectionsPoller = await client.beginRequestRouteDirectionsBatch(routeDirectionsRequests);
  console.log(await routeDirectionsPoller.getResult());
  /** Serialized the current operation for future poller */
  const serializedState = routeDirectionsPoller.toString();
  /** Use resume*Batch method to rehydrate the previous operation */
  const rehydratedFuzzySearchPoller = await client.resumeRequestRouteDirectionsBatch(
    serializedState
  );
  console.log(await rehydratedFuzzySearchPoller.pollUntilDone());
}

main().catch((e) => console.error(e));
