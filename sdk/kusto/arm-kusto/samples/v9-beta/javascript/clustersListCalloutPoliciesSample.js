// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the allowed callout policies for the specified service.
 *
 * @summary returns the allowed callout policies for the specified service.
 * x-ms-original-file: 2025-02-14/KustoClustersListCalloutPolicies.json
 */
async function kustoClusterListCalloutPolicies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusters.listCalloutPolicies("kustorptest", "kustoCluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await kustoClusterListCalloutPolicies();
}

main().catch(console.error);
