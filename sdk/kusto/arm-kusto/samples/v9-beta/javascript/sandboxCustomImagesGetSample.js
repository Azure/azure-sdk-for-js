// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a sandbox custom image
 *
 * @summary returns a sandbox custom image
 * x-ms-original-file: 2025-02-14/KustoSandboxCustomImagesGet.json
 */
async function kustoSandboxCustomImagesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.sandboxCustomImages.get(
    "kustorptest",
    "kustoCluster",
    "customImage8",
  );
  console.log(result);
}

async function main() {
  await kustoSandboxCustomImagesGet();
}

main().catch(console.error);
