// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Checks that the attached database configuration resource name is valid and is not already in use.
 *
 * @summary Checks that the attached database configuration resource name is valid and is not already in use.
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2023-08-15/examples/KustoAttachedDatabaseConfigurationCheckNameAvailability.json
 */

import type { AttachedDatabaseConfigurationsCheckNameRequest } from "@azure/arm-kusto";
import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function kustoAttachedDatabaseConfigurationCheckNameAvailability(): Promise<void> {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const resourceGroupName = process.env["KUSTO_RESOURCE_GROUP"] || "kustorptest";
  const clusterName = "kustoCluster";
  const resourceName: AttachedDatabaseConfigurationsCheckNameRequest = {
    name: "adc1",
    type: "Microsoft.Kusto/clusters/attachedDatabaseConfigurations",
  };
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.attachedDatabaseConfigurations.checkNameAvailability(
    resourceGroupName,
    clusterName,
    resourceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoAttachedDatabaseConfigurationCheckNameAvailability();
}

main().catch(console.error);
