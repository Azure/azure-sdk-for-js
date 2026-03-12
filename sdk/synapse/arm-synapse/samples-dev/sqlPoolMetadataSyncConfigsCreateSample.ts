// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Set the metadata sync configuration for a SQL pool
 *
 * @summary Set the metadata sync configuration for a SQL pool
 * x-ms-original-file: specification/synapse/resource-manager/Microsoft.Synapse/stable/2021-06-01/examples/CreateSqlPoolMetadataSyncConfig.json
 */

import type { MetadataSyncConfig } from "@azure/arm-synapse";
import { SynapseManagementClient } from "@azure/arm-synapse";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function setMetadataSyncConfigForASqlAnalyticsPool(): Promise<void> {
  const subscriptionId =
    process.env["SYNAPSE_SUBSCRIPTION_ID"] || "01234567-89ab-4def-0123-456789abcdef";
  const resourceGroupName = process.env["SYNAPSE_RESOURCE_GROUP"] || "ExampleResourceGroup";
  const workspaceName = "ExampleWorkspace";
  const sqlPoolName = "ExampleSqlPool";
  const metadataSyncConfiguration: MetadataSyncConfig = { enabled: true };
  const credential = new DefaultAzureCredential();
  const client = new SynapseManagementClient(credential, subscriptionId);
  const result = await client.sqlPoolMetadataSyncConfigs.create(
    resourceGroupName,
    workspaceName,
    sqlPoolName,
    metadataSyncConfiguration,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await setMetadataSyncConfigForASqlAnalyticsPool();
}

main().catch(console.error);
