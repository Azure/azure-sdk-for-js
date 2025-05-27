// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all service resources created or in the process of being created in the Service Fabric managed application resource.
 *
 * @summary gets all service resources created or in the process of being created in the Service Fabric managed application resource.
 * x-ms-original-file: 2025-03-01-preview/ServiceListOperation_example.json
 */
async function getAListOfServiceResources(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.services.listByApplications("resRg", "myCluster", "myApp")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAListOfServiceResources();
}

main().catch(console.error);
