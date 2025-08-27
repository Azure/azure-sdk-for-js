// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a Sql pool's connection policy, which is used with table auditing.
 *
 * @summary Get a Sql pool's connection policy, which is used with table auditing.
 * x-ms-original-file: specification/synapse/resource-manager/Microsoft.Synapse/stable/2021-06-01/examples/GetSqlPoolConnectionPolicy.json
 */

import { SynapseManagementClient } from "@azure/arm-synapse";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAConnectionPolicyOfASqlAnalyticsPool(): Promise<void> {
  const subscriptionId =
    process.env["SYNAPSE_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SYNAPSE_RESOURCE_GROUP"] || "blobauditingtest-6852";
  const workspaceName = "blobauditingtest-2080";
  const sqlPoolName = "testdb";
  const connectionPolicyName = "default";
  const credential = new DefaultAzureCredential();
  const client = new SynapseManagementClient(credential, subscriptionId);
  const result = await client.sqlPoolConnectionPolicies.get(
    resourceGroupName,
    workspaceName,
    sqlPoolName,
    connectionPolicyName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAConnectionPolicyOfASqlAnalyticsPool();
}

main().catch(console.error);
