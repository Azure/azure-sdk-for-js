// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Performs a query over a public dataset
 */
import { SearchClient, AzureKeyCredential, odata, GeographyPoint } from "@azure/search-documents";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

interface Hotel {
  HotelId: string;
  HotelName: string;
  Description: string;
  Description_fr: string;
  Category: string;
  Tags: string[];
  ParkingIncluded: boolean;
  LastRenovationDate: Date;
  Rating: number;
  Address: {
    StreetAddress: string;
    City: string;
    StateProvince: string;
    PostalCode: string;
    Country: string;
  };
  Location: GeographyPoint;
  Rooms: Array<{
    Description: string;
    Description_fr: string;
    Type: string;
    BaseRate: number;
    BedOptions: string;
    SleepsCount: number;
    SmokingAllowed: boolean;
    Tags: string[];
  }>;
}

export async function main() {
  console.log(`Running readonly query sample`);

  // Variables provided by https://docs.microsoft.com/en-us/samples/azure-samples/azure-search-sample-data/azure-search-sample-data/
  const endpoint = "https://azs-playground.search.windows.net";
  const apiKey = "EA4510A6219E14888741FCFC19BFBB82";
  const indexName = "hotels";

  const credential = new AzureKeyCredential(apiKey);
  const client = new SearchClient<Hotel>(endpoint, indexName, credential);

  const count = await client.getDocumentsCount();
  console.log(`${count} documents in index ${client.indexName}`);

  const state = "FL";
  const country = "USA";
  const searchResults = await client.search("WiFi", {
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
