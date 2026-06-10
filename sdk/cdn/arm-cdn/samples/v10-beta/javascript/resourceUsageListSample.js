// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to check the quota and actual usage of the CDN profiles under the given subscription.
 *
 * @summary check the quota and actual usage of the CDN profiles under the given subscription.
 * x-ms-original-file: 2025-12-01/ResourceUsage_List.json
 */
async function resourceUsageList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resourceUsage.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await resourceUsageList();
}

main().catch(console.error);
