// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevOpsInfrastructureClient } from "@azure/arm-devopsinfrastructure";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ResourceSku resources by subscription ID
 *
 * @summary list ResourceSku resources by subscription ID
 * x-ms-original-file: 2024-10-19/Sku_ListByLocation.json
 */
async function skuListByLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a2e95d27-c161-4b61-bda4-11512c14c2c2";
  const client = new DevOpsInfrastructureClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.sku.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  skuListByLocation();
}

main().catch(console.error);
