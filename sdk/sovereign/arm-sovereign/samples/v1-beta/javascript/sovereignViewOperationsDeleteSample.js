// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SovereignClient } = require("@azure/arm-sovereign");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the Sovereign View resource.
 *
 * @summary deletes the Sovereign View resource.
 * x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_Delete.json
 */
async function sovereignViewOperationsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B52DE5E-FE73-4C8B-8968-1E8F0097DDB8";
  const client = new SovereignClient(credential, subscriptionId);
  await client.sovereignViewOperations.delete("ExampleResourceGroup", "ExampleSV");
}

async function main() {
  await sovereignViewOperationsDelete();
}

main().catch(console.error);
