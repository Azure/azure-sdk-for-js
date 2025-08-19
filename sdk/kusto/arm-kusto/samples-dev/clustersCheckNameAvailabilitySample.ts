// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Checks that the cluster name is valid and is not already in use.
 *
 * @summary Checks that the cluster name is valid and is not already in use.
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2023-08-15/examples/KustoClustersCheckNameAvailability.json
 */

import type { ClusterCheckNameRequest } from "@azure/arm-kusto";
import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function kustoClustersCheckNameAvailability(): Promise<void> {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const location = "westus";
  const clusterName: ClusterCheckNameRequest = {
    name: "kustoCluster",
    type: "Microsoft.Kusto/clusters",
  };
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.clusters.checkNameAvailability(location, clusterName);
  console.log(result);
}

async function main(): Promise<void> {
  await kustoClustersCheckNameAvailability();
}

main().catch(console.error);
