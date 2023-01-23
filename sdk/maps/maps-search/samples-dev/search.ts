// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary An overview of Search API usage. Simple queries are performed.
 * @azsdk-weight 100
 */

import { AzureKeyCredential } from "@azure/core-auth";
// import { DefaultAzureCredential } from "@azure/identity";
import {
  MapsSearchClient,
  StructuredAddress,
  SearchAddressRequest,
  ReverseSearchAddressRequest,
  FuzzySearchRequest,
  GeoJsonCircleOrPolygonFeatureCollection,
  GeoJsonLineString,
  GeoJsonPolygon,
  GeoJsonPolygonCollection,
  LatLon,
} from "@azure/maps-search";
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
  const client = new MapsSearchClient(credential);

  /** Azure Active Directory (Azure AD) authentication */
  // const credential = new DefaultAzureCredential();
  // const mapsClientId = process.env.MAPS_CLIENT_ID || "";
  // const client = new MapsSearchClient(credential, mapsClientId);

  console.log(" --- Geocode address:");
  console.log(await client.searchAddress("400 Broad, Seattle"));

  console.log(" --- Reverse-geocode coordinates to address:");
  const coordinates: LatLon = [47.59118, -122.3327];
  console.log(await client.reverseSearchAddress(coordinates));

  console.log(" --- Reverse-geocode coordinates to cross street address:");
  console.log(await client.reverseSearchCrossStreetAddress(coordinates));

  console.log(" --- Geocode structured address:");
  const structuredAddress: StructuredAddress = {
    countryCode: "US",
    streetNumber: "15127",
    streetName: "NE 24th Street",
    municipality: "Redmond",
    countrySubdivision: "WA",
    postalCode: "98052",
  };
  console.log(await client.searchStructuredAddress(structuredAddress));

  console.log(" --- Perform a fuzzy search with coordinates:");
  let fuzzyResult = await client.fuzzySearch({ query: "pizza", coordinates });
  console.log(fuzzyResult);

  console.log(" --- Perform a fuzzy search with country filter:");
  fuzzyResult = await client.fuzzySearch({ query: "pizza", countryCodeFilter: ["Fr"] });
  console.log(fuzzyResult);

  console.log(" --- Perform a fuzzy search with coordinate and country filter:");
  fuzzyResult = await client.fuzzySearch({
    query: "pizza",
    coordinates,
    countryCodeFilter: ["Fr"],
  });
  console.log(fuzzyResult);

  // let's save geometry IDs from the fuzzy search for the getSearchPolygon example
  let geometryIds: string[] = [];
  fuzzyResult = await client.fuzzySearch({ query: "Netherlands", countryCodeFilter: ["NL"] });
  if (fuzzyResult.results) {
    fuzzyResult.results.forEach((res) => {
      if (res.dataSources && res.dataSources.geometry && res.dataSources.geometry.id) {
        geometryIds.push(res.dataSources.geometry.id);
      }
    });
  }

  console.log(" --- Search nearby POI:");
  const searchNearbyCoordinate: LatLon = [40.70627, -74.011454];
  const searchNearbyOptions = { radiusInMeters: 8046 };
  console.log(
    await client.searchNearbyPointOfInterest(searchNearbyCoordinate, searchNearbyOptions)
  );

  console.log(" --- Search POI with coordinates:");
  const searchPOIQuery = "juice bars";
  const searchPOIOptions = {
    top: 5,
    radiusInMeters: 8046,
  };
  console.log(
    await client.searchPointOfInterest(
      {
        query: searchPOIQuery,
        coordinates: [47.606038, -122.333345],
      },
      searchPOIOptions
    )
  );

  console.log(" --- Search POI with countryCodeFilter:");
  console.log(
    await client.searchPointOfInterest(
      {
        query: searchPOIQuery,
        countryCodeFilter: ["fr"],
      },
      searchPOIOptions
    )
  );

  console.log(" --- Search POI with coordinate and countryCodeFilter:");
  console.log(
    await client.searchPointOfInterest(
      {
        query: searchPOIQuery,
        coordinates: [47.606038, -122.333345],
        countryCodeFilter: ["fr"],
      },
      searchPOIOptions
    )
  );

  console.log(" --- Search POI category with coordinates:");
  const searchPOICategoryQuery = "atm";
  const searchPOICategoryOptions = {
    skip: 5,
    radiusInMeters: 8046,
  };
  console.log(
    await client.searchPointOfInterestCategory(
      {
        query: searchPOICategoryQuery,
        coordinates: [47.606038, -122.333345],
      },
      searchPOICategoryOptions
    )
  );

  console.log(" --- Search POI category with countryCodeFilter:");
  console.log(
    await client.searchPointOfInterestCategory(
      {
        query: searchPOICategoryQuery,
        countryCodeFilter: ["fr"],
      },
      searchPOICategoryOptions
    )
  );

  console.log(" --- Search POI category with coordinates and countryCodeFilter:");
  console.log(
    await client.searchPointOfInterestCategory(
      {
        query: searchPOICategoryQuery,
        coordinates: [47.606038, -122.333345],
        countryCodeFilter: ["fr"],
      },
      searchPOICategoryOptions
    )
  );

  console.log(" --- Get search POI category tree:");
  console.log(await client.getPointOfInterestCategories());

  console.log(" --- Get Geometries by geometry IDs:");
  console.log(geometryIds);
  console.log(await client.getGeometries([...geometryIds, "8bceafe8-3d98-4444-b29b-fd81d3e9adf5"]));

  console.log(" --- Search along route:");
  const searchALongRouteQuery = "burger";
  const maxDetourTimeInSeconds = 1000;

  const searchAlongRoute: GeoJsonLineString = {
    type: "LineString",
    coordinates: [
      [-122.143035, 47.653536],
      [-122.187164, 47.617556],
      [-122.114981, 47.570599],
      [-122.132756, 47.654009],
    ],
  };
  const searchAlongRouteOptions = { top: 2 };
  console.log(
    await client.searchAlongRoute(
      searchALongRouteQuery,
      maxDetourTimeInSeconds,
      searchAlongRoute,
      searchAlongRouteOptions
    )
  );

  console.log(" --- Search inside geometry: single polygon");
  const searchInsideGeometryQuery = "burger";
  const searchGeometryPolygon: GeoJsonPolygon = {
    type: "Polygon",
    coordinates: [
      [
        [-122.43576049804686, 37.7524152343544],
        [-122.43301391601562, 37.70660472542312],
        [-122.36434936523438, 37.712059855877314],
        [-122.43576049804686, 37.7524152343544],
      ],
    ],
  };
  const searchInsideGeometryOptions = { top: 2 };
  console.log(
    await client.searchInsideGeometry(
      searchInsideGeometryQuery,
      searchGeometryPolygon,
      searchInsideGeometryOptions
    )
  );

  console.log(" --- Search inside geometry: multiple polygons");
  const searchGeometryPolygons: GeoJsonPolygonCollection = {
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
            [-121.43576049804686, 38.7524152343544],
            [-121.43301391601562, 38.70660472542312],
            [-121.36434936523438, 38.712059855877314],
            [-121.43576049804686, 38.7524152343544],
          ],
        ],
      },
    ],
  };
  console.log(
    await client.searchInsideGeometry(
      searchInsideGeometryQuery,
      searchGeometryPolygons,
      searchInsideGeometryOptions
    )
  );

  console.log(" --- Search inside geometry: circles and polygons");
  const searchGeometryPolygonsOrCircles: GeoJsonCircleOrPolygonFeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-121.43576049804686, 38.7524152343544],
              [-121.43301391601562, 38.70660472542312],
              [-121.36434936523438, 38.712059855877314],
              [-121.43576049804686, 38.7524152343544],
            ],
          ],
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-121.43576049804686, 38.7524152343544],
        },
        properties: {
          subType: "Circle",
          radius: 5000,
        },
      },
    ],
  };
  console.log(
    await client.searchInsideGeometry(
      searchInsideGeometryQuery,
      searchGeometryPolygonsOrCircles,
      searchInsideGeometryOptions
    )
  );

  console.log(" --- Search address batch (long-running):");
  const searchAddressRequests: SearchAddressRequest[] = [
    { query: "400 Broad St, Seattle, WA 98109", options: { top: 3 } },
    { query: "One, Microsoft Way, Redmond, WA 98052", options: { top: 3 } },
    { query: "350 5th Ave, New York, NY 10118", options: { top: 1 } },
  ];
  const searchPoller = await client.beginSearchAddressBatch(searchAddressRequests);
  console.log(await searchPoller.pollUntilDone());

  console.log(" --- Search address reverse batch (long-running):");
  const reverseSearchAddressRequests: ReverseSearchAddressRequest[] = [
    { coordinates: [148.858561, 2.294911] },
    {
      coordinates: [47.639765, -122.127896],
      options: { radiusInMeters: 5000 },
    },
    { coordinates: [47.621028, -122.34817] },
  ];
  const reverseSearchPoller = await client.beginReverseSearchAddressBatch(
    reverseSearchAddressRequests
  );
  console.log(await reverseSearchPoller.pollUntilDone());

  console.log(" --- Search fuzzy batch (long-running):");
  const fuzzySearchRequests: FuzzySearchRequest[] = [
    {
      searchQuery: { query: "atm", coordinates: [48.858561, 2.294911] },
      options: { radiusInMeters: 5000, top: 5 },
    },
    {
      searchQuery: {
        query: "Statue Of Liberty",
        countryCodeFilter: ["us"],
      },
      options: { top: 2 },
    },
    {
      searchQuery: {
        query: "Starbucks",
        coordinates: [47.621028, -122.34817],
      },
      options: { radiusInMeters: 5000 },
    },
  ];
  const fuzzySearchPoller = await client.beginFuzzySearchBatch(fuzzySearchRequests);
  console.log(await fuzzySearchPoller.pollUntilDone());

  console.log(" --- Resume search fuzzy batch:");
  const originalFuzzySearchPoller = await client.beginFuzzySearchBatch(fuzzySearchRequests);
  console.log(await originalFuzzySearchPoller.getResult());
  const serializedState = originalFuzzySearchPoller.toString();
  const rehydratedFuzzySearchPoller = await client.resumeFuzzySearchBatch(serializedState);
  console.log(await rehydratedFuzzySearchPoller.getResult());
}

main();
