// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to manipulate the response `SearchAddressResult`.
 */

const { AzureKeyCredential } = require("@azure/core-auth");
// import { DefaultAzureCredential } from "@azure/identity";
const { MapsSearchClient, KnownSearchAddressResultType } = require("@azure/maps-search");
require("dotenv").config();

/**
 * We use fuzzySearch in this example.
 * But the same approach can be used in all APIs that return `SearchAddressResult`.
 */
async function main() {
  /** Use subscription key authentication */
  const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY || "";
  const credential = new AzureKeyCredential(subscriptionKey);
  const client = new MapsSearchClient(credential);

  /** Or use Azure AD authentication */
  // const credential = new DefaultAzureCredential();
  // const mapsClientId = process.env.MAPS_CLIENT_ID || "";
  // const client = new MapsSearchClient(credential, mapsClientId);

  /** Get the search results and the size of current page */
  const { results, numberResults } = await client.fuzzySearch({ query: "Starbucks" });

  for (let i = 0; i < numberResults; i++) {
    console.log(`${i}th result:`);
    /**
     * Different result types may have different properties.
     * See the type definition of `SearchAddressResultItem` for more details.
     */
    switch (results[i].type) {
      case KnownSearchAddressResultType.POI:
        /** Handle the result for the type of POI */
        console.log(results[i]);
        break;
      case KnownSearchAddressResultType.Street:
        /** Handle the result for the type of Street */
        console.log(results[i]);
        break;
      case KnownSearchAddressResultType.Geography:
        /** Handle the result for the type of Geography */
        console.log(results[i]);
        break;
      case KnownSearchAddressResultType.PointAddress:
        /** Handle the result for the type of PointAddress */
        console.log(results[i]);
        break;
      case KnownSearchAddressResultType.AddressRange:
        /** Handle the result for the type of AddressRange */
        console.log(results[i]);
        break;
      case KnownSearchAddressResultType.CrossStreet:
        /** Handle the result for the type of CrossStreet */
        console.log(results[i]);
        break;
      default:
        console.log(results[i]);
    }
  }

  /** The results are returned in pagination. The default page size is 10 and the offset is 0. We can modify them */
  const pageSize = 5;
  let page = 0;
  const firstResults = await client.fuzzySearch(
    { query: "Starbucks" },
    { top: pageSize, skip: page * pageSize }
  );
  console.log(`First ${pageSize} results:`);
  console.log(firstResults.results);
  page++;
  const secondResults = await client.fuzzySearch(
    { query: "Starbucks" },
    { top: pageSize, skip: page * pageSize }
  );
  console.log(`Second ${pageSize} results:`);
  console.log(secondResults.results);
}

main().catch((e) => console.error(e));
