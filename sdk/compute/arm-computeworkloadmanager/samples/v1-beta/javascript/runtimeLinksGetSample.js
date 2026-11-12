// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadManagerClient } = require("@azure/arm-computeworkloadmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a runtime link.
 *
 * @summary gets a runtime link.
 * x-ms-original-file: 2026-11-01-preview/RuntimeLinks_Get.json
 */
async function getARuntimeLink() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  const result = await client.runtimeLinks.get("rg-workload", "managed-agents-prod", "default");
  console.log(result);
}

async function main() {
  await getARuntimeLink();
}

main().catch(console.error);
