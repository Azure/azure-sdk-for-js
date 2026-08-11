// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of hybrid compute operations.
 *
 * @summary gets a list of hybrid compute operations.
 * x-ms-original-file: 2026-06-16-preview/Operations_List.json
 */
async function listHybridComputeProviderOperations() {
  const credential = new DefaultAzureCredential();
  const client = new HybridComputeManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listHybridComputeProviderOperations();
}

main().catch(console.error);
