// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an ingestion source.
 *
 * @summary create an ingestion source.
 */
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const result = await client.ingestion.createSource({
    id: "00000000-0000-0000-0000-000000000000",
    connectionInfo: {
      containerUri: "https://mystorageaccount.blob.core.windows.net/sample-container",
      sharedAccessSignatureToken:
        "sv=2021-01-01&st=2024-01-01T00%3A00%3A00Z&se=2025-01-01T00%3A00%3A00Z&sr=c&sp=rl&sig=<your-signature>",
    },
    kind: "SasToken",
  });
  console.log(result);
}

main().catch(console.error);
