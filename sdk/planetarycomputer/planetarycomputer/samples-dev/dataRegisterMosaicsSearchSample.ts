// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to register a mosaic search query.
 *
 * @summary register a mosaic search query.
 */
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const result = await client.data.registerMosaicsSearch({
    collections: [collectionId],
    filterLang: "cql2-json",
    filter: { op: "=", args: [{ property: "collection" }, collectionId] },
  });
  console.log(result);
}

main().catch(console.error);
