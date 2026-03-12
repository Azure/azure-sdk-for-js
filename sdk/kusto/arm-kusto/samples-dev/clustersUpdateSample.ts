// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update a Kusto cluster.
 *
 * @summary Update a Kusto cluster.
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2023-08-15/examples/KustoClustersUpdate.json
 */

import type { ClusterUpdate, ClustersUpdateOptionalParams } from "@azure/arm-kusto";
import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function kustoClustersUpdate(): Promise<void> {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const resourceGroupName = process.env["KUSTO_RESOURCE_GROUP"] || "kustorptest";
  const clusterName = "kustoCluster2";
  const ifMatch = "*";
  const parameters: ClusterUpdate = { location: "westus" };
  const options: ClustersUpdateOptionalParams = { ifMatch };
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.clusters.beginUpdateAndWait(
    resourceGroupName,
    clusterName,
    parameters,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoClustersUpdate();
}

main().catch(console.error);
