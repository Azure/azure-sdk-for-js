// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists eligible region SKUs for Kusto resource provider by Azure region.
 *
 * @summary lists eligible region SKUs for Kusto resource provider by Azure region.
 * x-ms-original-file: 2025-02-14/KustoSkus.json
 */
async function kustoListRegionSkus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.skus.list("westus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await kustoListRegionSkus();
}

main().catch(console.error);
