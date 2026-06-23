// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list mosaics for a collection.
 *
 * @summary list mosaics for a collection.
 */
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const result = await client.stac.getMosaics(collectionId);
  console.log(result);
}

main().catch(console.error);
