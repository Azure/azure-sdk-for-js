// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Checks that the managed private endpoints resource name is valid and is not already in use.
 *
 * @summary Checks that the managed private endpoints resource name is valid and is not already in use.
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2023-08-15/examples/KustoManagedPrivateEndpointsCheckNameAvailability.json
 */

import type { ManagedPrivateEndpointsCheckNameRequest } from "@azure/arm-kusto";
import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function kustoManagedPrivateEndpointsCheckNameAvailability(): Promise<void> {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const resourceGroupName = process.env["KUSTO_RESOURCE_GROUP"] || "kustorptest";
  const clusterName = "kustoCluster";
  const resourceName: ManagedPrivateEndpointsCheckNameRequest = {
    name: "pme1",
    type: "Microsoft.Kusto/clusters/managedPrivateEndpoints",
  };
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.managedPrivateEndpoints.checkNameAvailability(
    resourceGroupName,
    clusterName,
    resourceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoManagedPrivateEndpointsCheckNameAvailability();
}

main().catch(console.error);
