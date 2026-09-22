// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get a specific STAC collection by ID.
 *
 * @summary Get a STAC collection.
 */
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const collection = await client.stac.getCollection(collectionId);
  console.log(`Collection: ${collection.id}`);
  console.log(`  Title: ${collection.title}`);
  console.log(`  Description: ${collection.description}`);
  console.log(`  License: ${collection.license}`);
}

main().catch(console.error);
