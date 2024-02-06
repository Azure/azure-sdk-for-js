// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a MapsRoute to retrieve a setting value.
 */

import { AzureKeyCredential } from "@azure/core-auth";
// import { DefaultAzureCredential } from "@azure/identity";
import MapsRoute, { RouteGetRouteMatrix200Response, isUnexpected } from "@azure-rest/maps-route";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

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
  const client = MapsRoute(credential);

  /** Azure Active Directory (Azure AD) authentication */
  // const credential = new DefaultAzureCredential();
  // const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
  // const client = MapsRoute(credential, mapsClientId);

  /**
   * Calculate route matrix in synchronous way.
   * For asynchronous way, please refer to the sample in lro.ts and resumeLro.ts
   */
  const routeMatrixResult = await client.path("/route/matrix/sync/{format}", "json").post({
    queryParameters: {
      vehicleWidth: 2,
      vehicleHeight: 2,
      vehicleLoadType: "USHazmatClass1",
      travelMode: "truck",
      vehicleCommercial: true,
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

  if (isUnexpected(routeMatrixResult)) {
    throw routeMatrixResult.body.error;
  }

  const { summary, matrix } = (routeMatrixResult as RouteGetRouteMatrix200Response).body;
  console.log(
    `${summary.successfulRoutes}/${summary.totalRoutes} routes are successfully calculated. Following is the detailed info:`
  );
  matrix.forEach((row) => {
    row.forEach((cell) => {
      cell.response && console.dir(cell.response.routeSummary);
    });
  });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
