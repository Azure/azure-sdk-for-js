// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to adds a list of callout policies for engine services.
 *
 * @summary adds a list of callout policies for engine services.
 * x-ms-original-file: 2025-02-14/KustoClusterAddCalloutPolicies.json
 */
async function kustoClusterAddCalloutPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  await client.clusters.addCalloutPolicies("kustorptest", "kustoCluster", {
    value: [{ calloutType: "kusto", calloutUriRegex: "*", outboundAccess: "Allow" }],
  });
}

async function main(): Promise<void> {
  await kustoClusterAddCalloutPolicy();
}

main().catch(console.error);
