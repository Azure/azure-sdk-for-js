// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all managed application resources created or in the process of being created in the Service Fabric cluster resource.
 *
 * @summary gets all managed application resources created or in the process of being created in the Service Fabric cluster resource.
 * x-ms-original-file: 2025-03-01-preview/ApplicationListOperation_example.json
 */
async function getAListOfApplicationResources(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.applications.list("resRg", "myCluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAListOfApplicationResources();
}

main().catch(console.error);
