// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates Search API usage. Simple queries are performed.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AzureKeyCredential } = require("@azure/core-auth");
const { SearchClient, LatLong } = require("@azure/maps-search");
const dotenv = require("dotenv");
dotenv.config();
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

async function main() {
  let client;

  if (process.env.MAPS_SUBSCRIPTION_KEY) {
    // Use subscription key authentication
    const credential = new AzureKeyCredential(process.env.MAPS_SUBSCRIPTION_KEY);
    client = new SearchClient(credential);
  } else {
    // Use Azure AD authentication
    if (process.env.MAPS_CLIENT_ID) {
      const credential = new DefaultAzureCredential();
      const mapsClientId = process.env.MAPS_CLIENT_ID;
      client = new SearchClient(credential, mapsClientId);
    } else {
      throw Error("Cannot authenticate the client.");
    }
  }

  console.log(" --- Geocode address:");
  console.log(await client.searchAddress("400 Broad, Seattle"));

  console.log(" --- Reverse-geocode coordinates to address:");
  const coordinates = new LatLong(47.59118, -122.3327);
  console.log(await client.reverseSearchAddress(coordinates));

  console.log(" --- Reverse-geocode coordinates to cross street address:");
  console.log(await client.reverseSearchCrossStreetAddress(coordinates));

  console.log(" --- Geocode structured address:");
  const structuredAddress = {
    countryCode: "US",
    streetNumber: "15127",
    streetName: "NE 24th Street",
    municipality: "Redmond",
    countrySubdivision: "WA",
    postalCode: "98052"
  };
  console.log(await client.searchStructuredAddress(structuredAddress));

  console.log(" --- Perform a fuzzy search with coordinates:");
  let fuzzyResult = await client.fuzzySearch("pizza", coordinates);
  console.log(fuzzyResult);

  console.log(" --- Perform a fuzzy search with country filter:");
  fuzzyResult = await client.fuzzySearch("pizza", ["Fr"]);
  console.log(fuzzyResult);

  console.log(" --- Perform a fuzzy search with coordinate and country filter:");
  fuzzyResult = await client.fuzzySearch("pizza", coordinates, ["Fr"]);
  console.log(fuzzyResult);

  // let's save geometry IDs from the fuzzy search for the getSearchPolygon example
  let geometryIds = [];
  fuzzyResult = await client.fuzzySearch("Netherlands", ["NL"]);
  fuzzyResult.results?.forEach((res) => {
    if (res.dataSources?.geometry?.id) {
      geometryIds.push(res.dataSources.geometry.id);
    }
  });
  console.log(" --- Search nearby POI:");
  const searchNearbyCoordinate = new LatLong(40.70627, -74.011454);
  const searchNearbyOptions = { radiusInMeters: 8046 };
  console.log(
    await client.searchNearbyPointOfInterest(searchNearbyCoordinate, searchNearbyOptions)
  );

  console.log(" --- Search POI with coordinates:");
  const searchPOIQuery = "juice bars";
  const searchPOIOptions = {
    top: 5,
    radiusInMeters: 8046
  };
  console.log(
    await client.searchPointOfInterest(
      searchPOIQuery,
      new LatLong(47.606038, -122.333345),
      searchPOIOptions
    )
  );

  console.log(" --- Search POI with countryFilter:");
  console.log(await client.searchPointOfInterest(searchPOIQuery, ["fr"], searchPOIOptions));

  console.log(" --- Search POI with coordinate and countryFilter:");
  console.log(
    await client.searchPointOfInterest(
      searchPOIQuery,
      new LatLong(47.606038, -122.333345),
      ["fr"],
      searchPOIOptions
    )
  );

  console.log(" --- Search POI category with coordinates:");
  const searchPOICategoryQuery = "atm";
  const searchPOICategoryOptions = {
    skip: 5,
    radiusInMeters: 8046
  };
  console.log(
    await client.searchPointOfInterestCategory(
      searchPOICategoryQuery,
      new LatLong(47.606038, -122.333345),
      searchPOICategoryOptions
    )
  );

  console.log(" --- Search POI category with countryFilter:");
  console.log(
    await client.searchPointOfInterestCategory(
      searchPOICategoryQuery,
      ["fr"],
      searchPOICategoryOptions
    )
  );

  console.log(" --- Search POI category with coordinates and countryFilter:");
  console.log(
    await client.searchPointOfInterestCategory(
      searchPOICategoryQuery,
      new LatLong(47.606038, -122.333345),
      ["fr"],
      searchPOICategoryOptions
    )
  );

  console.log(" --- Get search POI category tree:");
  console.log(await client.getPointOfInterestCategoryTree());

  console.log(" --- List polygons by geometry IDs:");
  console.log(geometryIds);
  console.log(await client.listPolygons(geometryIds));

  console.log(" --- Search along route:");
  const searchALongRouteQuery = "burger";
  const maxDetourTime = 1000;

  const searchAlongRoute = {
    type: "LineString",
    coordinates: [
      [-122.143035, 47.653536],
      [-122.187164, 47.617556],
      [-122.114981, 47.570599],
      [-122.132756, 47.654009]
    ]
  };
  const searchAlongRouteOptions = { top: 2 };
  console.log(
    await client.searchAlongRoute(
      searchALongRouteQuery,
      maxDetourTime,
      searchAlongRoute,
      searchAlongRouteOptions
    )
  );

  console.log(" --- Search inside geometry:");
  const searchInsideGeometryQuery = "burger";
  const searchGeometry = {
    type: "Polygon",
    coordinates: [
      [
        [-122.43576049804686, 37.7524152343544],
        [-122.43301391601562, 37.70660472542312],
        [-122.36434936523438, 37.712059855877314],
        [-122.43576049804686, 37.7524152343544]
      ]
    ]
  };
  const searchInsideGeometryOptions = { top: 2 };
  console.log(
    await client.searchInsideGeometry(
      searchInsideGeometryQuery,
      searchGeometry,
      searchInsideGeometryOptions
    )
  );

  // const searchAddressBatchRequest = {
  //   batchItems: [
  //     {
  //       query: "?query=400 Broad St, Seattle, WA 98109&limit=3"
  //     },
  //     {
  //       query: "?query=One, Microsoft Way, Redmond, WA 98052&limit=3"
  //     },
  //     {
  //       query: "?query=350 5th Ave, New York, NY 10118&limit=1"
  //     }
  //   ]
  // };
  const searchAddressRequests = [
    { query: "400 Broad St, Seattle, WA 98109", options: { top: 3 } },
    { query: "One, Microsoft Way, Redmond, WA 98052", options: { top: 3 } },
    { query: "350 5th Ave, New York, NY 10118", options: { top: 1 } }
  ];
  console.log(" --- Search address batch:");
  console.log(await client.searchAddressBatchSync(searchAddressRequests));

  console.log(" --- Search address batch (long-running):");
  const searchPoller = await client.beginSearchAddressBatch(searchAddressRequests);
  console.log(await searchPoller.pollUntilDone());

  // const searchAddressReverseBatchRequest = {
  //   batchItems: [
  //     {
  //       query: "?query=48.858561,2.294911"
  //     },
  //     {
  //       query: "?query=47.639765,-122.127896&radius=5000"
  //     },
  //     {
  //       query: "?query=47.621028,-122.348170"
  //     }
  //   ]
  // };

  const reverseSearchAddressRequests = [
    { coordinates: new LatLong(48.858561, 2.294911) },
    { coordinates: new LatLong(47.639765, -122.127896), options: { radiusInMeters: 5000 } },
    { coordinates: new LatLong(47.621028, -122.34817) }
  ];

  console.log(" --- Search address reverse batch:");
  console.log(await client.reverseSearchAddressBatchSync(reverseSearchAddressRequests));

  console.log(" --- Search address reverse batch (long-running):");
  const reverseSearchPoller = await client.beginReverseSearchAddressBatch(
    reverseSearchAddressRequests
  );
  console.log(await reverseSearchPoller.pollUntilDone());

  // const searchFuzzyBatchRequest = {
  //   batchItems: [
  //     {
  //       query: "?query=atm&lat=47.639769&lon=-122.128362&radius=5000&limit=5"
  //     },
  //     {
  //       query: "?query=Statue Of Liberty&limit=2"
  //     },
  //     {
  //       query: "?query=Starbucks&lat=47.639769&lon=-122.128362&radius=5000"
  //     }
  //   ]
  // };

  const fuzzySearchRequests = [
    {
      query: "atm",
      coordinates: new LatLong(48.858561, 2.294911),
      options: { radiusInMeters: 5000, top: 5 }
    },
    {
      query: "Statue Of Liberty",
      options: { top: 2 }
    },
    {
      query: "Starbucks",
      coordinates: new LatLong(47.621028, -122.34817),
      options: { radiusInMeters: 5000 }
    }
  ];

  console.log(" --- Search fuzzy batch:");
  console.log(await client.fuzzySearchBatchSync(fuzzySearchRequests));

  console.log(" --- Search fuzzy batch (long-running):");
  const fuzzySearchPoller = await client.beginFuzzySearchBatch(fuzzySearchRequests);
  console.log(await fuzzySearchPoller.pollUntilDone());
}

main();
