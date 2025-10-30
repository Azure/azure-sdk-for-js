// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an existing ingestion source in a geo-catalog
 *
 * @summary update an existing ingestion source in a geo-catalog
 * x-ms-original-file: 2025-04-30-preview/IngestionSources_Replace.json
 */
async function ingestionSourcesReplace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.ingestion.replaceSource(
    "00000000-0000-0000-0000-000000000000",
    {
      id: "00000000-0000-0000-0000-000000000000",
      connectionInfo: {
        containerUri:
          "https://SANITIZED.blob.core.windows.net/sample-container",
        sharedAccessSignatureToken:
          "sp=rl&st=Sanitized&se=Sanitized&sv=Sanitized&sr=c&sig=Sanitized",
      },
      kind: "SasToken",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await ingestionSourcesReplace();
}

main().catch(console.error);
