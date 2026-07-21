// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagementClient } from "@azure/arm-servicefabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all service resources created or in the process of being created in the Service Fabric application resource.
 *
 * @summary gets all service resources created or in the process of being created in the Service Fabric application resource.
 * x-ms-original-file: 2026-03-01-preview/ServiceListOperation_example.json
 */
async function getAListOfServiceResources(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.services.list("resRg", "myCluster", "myApp")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAListOfServiceResources();
}

main().catch(console.error);
