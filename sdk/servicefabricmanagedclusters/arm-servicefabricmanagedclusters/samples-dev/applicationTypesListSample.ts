// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all application type name resources created or in the process of being created in the Service Fabric managed cluster resource.
 *
 * @summary gets all application type name resources created or in the process of being created in the Service Fabric managed cluster resource.
 * x-ms-original-file: 2025-03-01-preview/ApplicationTypeNameListOperation_example.json
 */
async function getAListOfApplicationTypeNameResources(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.applicationTypes.list("resRg", "myCluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAListOfApplicationTypeNameResources();
}

main().catch(console.error);
