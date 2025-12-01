// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the default and current limits for quotas
 *
 * @summary get the default and current limits for quotas
 * x-ms-original-file: 2025-09-01-preview/NetAppResourceQuotaLimits_List.json
 */
async function quotaLimits() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.netAppResourceQuotaLimits.list("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await quotaLimits();
}

main().catch(console.error);
