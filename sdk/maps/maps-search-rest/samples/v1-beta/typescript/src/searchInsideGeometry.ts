// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import MapsSearch, {
  isUnexpected,
  SearchSearchInsideGeometry200Response,
  SearchSearchInsideGeometryDefaultResponse,
} from "@azure-rest/maps-search";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * @summary - Demonstrate how to perform a free form search inside a single geometry or many of them.
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
  const client = MapsSearch(credential);

  /** Azure Active Directory (Azure AD) authentication */
  // const credential = new DefaultAzureCredential();
  // const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
  // const client = MapsSearch(credential, mapsClientId);

  /** We can search for pizza places inside a geometry represented as a GeoJSON FeatureCollection type */
  const featureCollectionResponse = await client.path("/search/geometry/{format}", "json").post({
    queryParameters: { query: "pizza", limit: 2 },
    body: {
      geometry: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [-122.143035, 47.653536],
                  [-122.187164, 47.617556],
                  [-122.114981, 47.570599],
                  [-122.132756, 47.654009],
                  [-122.143035, 47.653536],
                ],
              ],
            },
            properties: {},
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-122.126986, 47.639754],
            },
            properties: {
              subType: "Circle",
              radius: 100,
            },
          },
        ],
      },
    },
  });
  handleResponse(featureCollectionResponse);

  /** We can also search inside a geometry represented as a GeoJSON GeometryCollection  type */
  const geometryCollectionResponse = await client.path("/search/geometry/{format}", "json").post({
    queryParameters: { query: "pizza", limit: 2 },
    body: {
      geometry: {
        type: "GeometryCollection",
        geometries: [
          {
            type: "Polygon",
            coordinates: [
              [
                [-122.43576049804686, 37.7524152343544],
                [-122.43301391601562, 37.70660472542312],
                [-122.36434936523438, 37.712059855877314],
                [-122.43576049804686, 37.7524152343544],
              ],
            ],
          },
          {
            type: "Polygon",
            coordinates: [
              [
                [-123.43576049804686, 37.7524152343544],
                [-123.43301391601562, 37.70660472542312],
                [-123.36434936523438, 37.712059855877314],
                [-123.43576049804686, 37.7524152343544],
              ],
            ],
          },
        ],
      },
    },
  });
  handleResponse(geometryCollectionResponse);

  /** We can also search inside a geometry represented as a GeoJSON Polygon type */
  const polygonResponse = await client.path("/search/geometry/{format}", "json").post({
    queryParameters: { query: "pizza", limit: 2 },
    body: {
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-122.43576049804686, 37.7524152343544],
            [-122.43301391601562, 37.70660472542312],
            [-122.36434936523438, 37.712059855877314],
            [-122.43576049804686, 37.7524152343544],
          ],
        ],
      },
    },
  });
  handleResponse(polygonResponse);
}

function handleResponse(
  response: SearchSearchInsideGeometry200Response | SearchSearchInsideGeometryDefaultResponse
) {
  /** Handle error response */
  if (isUnexpected(response)) {
    throw response.body.error;
  }
  /** Log the response body. */
  console.log(`Search result inside the geometry:`);
  response.body.results.forEach((result) => {
    console.log(`Address: ${result.address.freeformAddress}`);
    console.log(`Coordinate: (${result.position.lat}, ${result.position.lon})`);
  });
}

main().catch(console.error);
