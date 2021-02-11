// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Performs a query over a public dataset
 */

const { SearchClient, AzureKeyCredential, odata } = require("@azure/search-documents");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running readonly query sample`);

  // Variables provided by https://docs.microsoft.com/en-us/samples/azure-samples/azure-search-sample-data/azure-search-sample-data/
  const endpoint = "https://azs-playground.search.windows.net";
  const apiKey = "EA4510A6219E14888741FCFC19BFBB82";
  const indexName = "hotels";

  const credential = new AzureKeyCredential(apiKey);
  const client = new SearchClient(endpoint, indexName, credential);

  const count = await client.getDocumentsCount();
  console.log(`${count} documents in index ${client.indexName}`);

  const state = "FL";
  const country = "USA";
  const searchResults = await client.search(
    "WiFi",
    {
    filter: odata`Address/StateProvince eq ${state} and Address/Country eq ${country}`,
    orderBy: ["Rating desc"],
    select: ["HotelId", "HotelName", "Rating"]
  });
  for await (const result of searchResults.results) {
    console.log(`${result.document.HotelName}: ${result.document.Rating} stars`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
