// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Removes callout policy for engine services.
 *
 * @summary Removes callout policy for engine services.
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2024-04-13/examples/KustoClusterRemoveCalloutPolicy.json
 */

import type { CalloutPolicyToRemove } from "@azure/arm-kusto";
import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function kustoClusterDropCalloutPolicy(): Promise<void> {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const resourceGroupName = process.env["KUSTO_RESOURCE_GROUP"] || "kustorptest";
  const clusterName = "kustoCluster";
  const calloutPolicy: CalloutPolicyToRemove = { calloutId: "*_kusto" };
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.clusters.beginRemoveCalloutPolicyAndWait(
    resourceGroupName,
    clusterName,
    calloutPolicy,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoClusterDropCalloutPolicy();
}

main().catch(console.error);
