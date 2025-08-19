// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns a list of language extensions that can run within KQL queries.
 *
 * @summary Returns a list of language extensions that can run within KQL queries.
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2023-08-15/examples/KustoClusterListLanguageExtensions.json
 */

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function kustoClusterListLanguageExtensions(): Promise<void> {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const resourceGroupName = process.env["KUSTO_RESOURCE_GROUP"] || "kustorptest";
  const clusterName = "kustoCluster";
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusters.listLanguageExtensions(resourceGroupName, clusterName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await kustoClusterListLanguageExtensions();
}

main().catch(console.error);
