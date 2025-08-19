// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Returns a list of database principals of the given Kusto cluster and database.
 *
 * @summary Returns a list of database principals of the given Kusto cluster and database.
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2024-04-13/examples/KustoDatabaseListPrincipals.json
 */
async function kustoDatabaseListPrincipals(): Promise<void> {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const resourceGroupName = process.env["KUSTO_RESOURCE_GROUP"] || "kustorptest";
  const clusterName = "kustoCluster";
  const databaseName = "KustoDatabase8";
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databases.listPrincipals(
    resourceGroupName,
    clusterName,
    databaseName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await kustoDatabaseListPrincipals();
}

main().catch(console.error);
