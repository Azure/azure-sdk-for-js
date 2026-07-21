// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list UnifiedResilienceItem resources by tenant
 *
 * @summary list UnifiedResilienceItem resources by tenant
 * x-ms-original-file: 2026-04-01-preview/UnifiedResilienceItems_List_MaximumSet_Gen.json
 */
async function unifiedResilienceItemsListMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.unifiedResilienceItems.list("zldmpkvqzifygkqau", {
    skipToken: "xntbyoswztnmvitj",
    top: 69,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list UnifiedResilienceItem resources by tenant
 *
 * @summary list UnifiedResilienceItem resources by tenant
 * x-ms-original-file: 2026-04-01-preview/UnifiedResilienceItems_List_MinimumSet_Gen.json
 */
async function unifiedResilienceItemsListMaximumSetGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.unifiedResilienceItems.list("sampleServiceGroupName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await unifiedResilienceItemsListMaximumSet();
  await unifiedResilienceItemsListMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
