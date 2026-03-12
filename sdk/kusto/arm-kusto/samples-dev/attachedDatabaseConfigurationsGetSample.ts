// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns an attached database configuration.
 *
 * @summary Returns an attached database configuration.
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2024-04-13/examples/KustoAttachedDatabaseConfigurationsGet.json
 */

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function attachedDatabaseConfigurationsGet(): Promise<void> {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const resourceGroupName = process.env["KUSTO_RESOURCE_GROUP"] || "kustorptest";
  const clusterName = "kustoCluster2";
  const attachedDatabaseConfigurationName = "attachedDatabaseConfigurationsTest";
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.attachedDatabaseConfigurations.get(
    resourceGroupName,
    clusterName,
    attachedDatabaseConfigurationName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await attachedDatabaseConfigurationsGet();
}

main().catch(console.error);
