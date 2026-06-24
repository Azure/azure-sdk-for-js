// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to diagnoses network connectivity status for external resources on which the service is dependent on.
 *
 * @summary diagnoses network connectivity status for external resources on which the service is dependent on.
 * x-ms-original-file: 2025-02-14/KustoClustersDiagnoseVirtualNetwork.json
 */
async function kustoClusterDiagnoseVirtualNetwork(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.clusters.diagnoseVirtualNetwork("kustorptest", "kustoCluster");
  console.log(result);
}

async function main(): Promise<void> {
  await kustoClusterDiagnoseVirtualNetwork();
}

main().catch(console.error);
