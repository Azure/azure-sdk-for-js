// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevOpsInfrastructureClient } from "@azure/arm-devopsinfrastructure";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ResourceDetailsObject resources by Pool
 *
 * @summary list ResourceDetailsObject resources by Pool
 * x-ms-original-file: 2024-10-19/ResourceDetails_ListByPool.json
 */
async function resourceDetailsListByPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a2e95d27-c161-4b61-bda4-11512c14c2c2";
  const client = new DevOpsInfrastructureClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.resourceDetails.listByPool(
    "my-resource-group",
    "my-dev-ops-pool",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  resourceDetailsListByPool();
}

main().catch(console.error);
