// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to replace an ingestion source.
 *
 * @summary replace an ingestion source.
 */
const { DefaultAzureCredential } = require("@azure/identity");
const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");

async function main() {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const result = await client.ingestion.replaceSource("00000000-0000-0000-0000-000000000000", {
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
