// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements AttestationStatus GET method.
 *
 * @summary implements AttestationStatus GET method.
 * x-ms-original-file: 2026-04-01-preview/AttestationStatuses_Get.json
 */
async function getAttestationStatus() {
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIVMManagementClient(credential);
  const result = await client.attestationStatuses.get(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM",
  );
  console.log(result);
}

async function main() {
  await getAttestationStatus();
}

main().catch(console.error);
