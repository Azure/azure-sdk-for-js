// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a sandbox custom image.
 *
 * @summary deletes a sandbox custom image.
 * x-ms-original-file: 2025-02-14/KustoSandboxCustomImageDelete.json
 */
async function sandboxCustomImagesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  await client.sandboxCustomImages.delete("kustorptest", "kustoCluster", "customImage8");
}

async function main() {
  await sandboxCustomImagesDelete();
}

main().catch(console.error);
