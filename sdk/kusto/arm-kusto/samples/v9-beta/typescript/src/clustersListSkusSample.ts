// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists eligible SKUs for Kusto resource provider.
 *
 * @summary lists eligible SKUs for Kusto resource provider.
 * x-ms-original-file: 2025-02-14/KustoClustersListSkus.json
 */
async function kustoClustersListSkus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusters.listSkus()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await kustoClustersListSkus();
}

main().catch(console.error);
