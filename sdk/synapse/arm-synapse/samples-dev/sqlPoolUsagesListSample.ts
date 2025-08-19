// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets SQL pool usages.
 *
 * @summary Gets SQL pool usages.
 * x-ms-original-file: specification/synapse/resource-manager/Microsoft.Synapse/stable/2021-06-01/examples/SqlPoolUsageMetricsList.json
 */

import { SynapseManagementClient } from "@azure/arm-synapse";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listTheUsagesOfASqlAnalyticsPool(): Promise<void> {
  const subscriptionId =
    process.env["SYNAPSE_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SYNAPSE_RESOURCE_GROUP"] || "sqlcrudtest-6730";
  const workspaceName = "sqlcrudtest-9007";
  const sqlPoolName = "3481";
  const credential = new DefaultAzureCredential();
  const client = new SynapseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sqlPoolUsages.list(
    resourceGroupName,
    workspaceName,
    sqlPoolName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listTheUsagesOfASqlAnalyticsPool();
}

main().catch(console.error);
