// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadManagerClient } = require("@azure/arm-computeworkloadmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates mutable runtime link properties.
 *
 * @summary updates mutable runtime link properties.
 * x-ms-original-file: 2026-11-01-preview/RuntimeLinks_Update.json
 */
async function updateRuntimeLinkCapacity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  const result = await client.runtimeLinks.update("rg-workload", "managed-agents-prod", "default", {
    properties: { capacityProfile: { minimumNodes: 2, maximumNodes: 150 } },
  });
  console.log(result);
}

async function main() {
  await updateRuntimeLinkCapacity();
}

main().catch(console.error);
