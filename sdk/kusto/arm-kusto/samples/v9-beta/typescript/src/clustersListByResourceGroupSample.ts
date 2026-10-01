// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all Kusto clusters within a resource group.
 *
 * @summary lists all Kusto clusters within a resource group.
 * x-ms-original-file: 2025-02-14/KustoClustersListByResourceGroup.json
 */
async function kustoClustersListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusters.listByResourceGroup("kustorptest")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await kustoClustersListByResourceGroup();
}

main().catch(console.error);
