// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all Kusto cluster principalAssignments.
 *
 * @summary lists all Kusto cluster principalAssignments.
 * x-ms-original-file: 2025-02-14/KustoClusterPrincipalAssignmentsList.json
 */
async function kustoPrincipalAssignmentsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusterPrincipalAssignments.list("kustorptest", "kustoCluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await kustoPrincipalAssignmentsList();
}

main().catch(console.error);
