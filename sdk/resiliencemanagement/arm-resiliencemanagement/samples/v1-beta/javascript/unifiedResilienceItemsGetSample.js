// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a UnifiedResilienceItem
 *
 * @summary get a UnifiedResilienceItem
 * x-ms-original-file: 2026-04-01-preview/UnifiedResilienceItems_Get_MaximumSet_Gen.json
 */
async function unifiedResilienceItemsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.unifiedResilienceItems.get("sg1", "uri1");
  console.log(result);
}

async function main() {
  await unifiedResilienceItemsGetMaximumSet();
}

main().catch(console.error);
