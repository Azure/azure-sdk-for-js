// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks that the sandbox custom image resource name is valid and is not already in use.
 *
 * @summary checks that the sandbox custom image resource name is valid and is not already in use.
 * x-ms-original-file: 2025-02-14/KustoSandboxCustomImagesCheckNameAvailability.json
 */
async function kustoSandboxCustomImagesCheckNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.sandboxCustomImages.checkNameAvailability(
    "kustorptest",
    "kustoCluster",
    { name: "sandboxCustomImage1", type: "Microsoft.Kusto/clusters/sandboxCustomImages" },
  );
  console.log(result);
}

async function main() {
  await kustoSandboxCustomImagesCheckNameAvailability();
}

main().catch(console.error);
