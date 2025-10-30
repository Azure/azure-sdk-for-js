// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a new ingestion source in a geo-catalog
 *
 * @summary create a new ingestion source in a geo-catalog
 * x-ms-original-file: 2025-04-30-preview/IngestionSources_Create.json
 */
async function ingestionSourcesCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.ingestion.createSource({
    id: "00000000-0000-0000-0000-000000000000",
    connectionInfo: {
      containerUri: "https://SANITIZED.blob.core.windows.net/sample-container",
      sharedAccessSignatureToken:
        "sv=2021-01-01&st=Sanitized&se=Sanitized&sr=c&sp=rl&sig=Sanitized",
    },
    kind: "SasToken",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await ingestionSourcesCreate();
}

main().catch(console.error);
