// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Service Fabric service resource created or in the process of being created in the Service Fabric managed application resource.
 *
 * @summary get a Service Fabric service resource created or in the process of being created in the Service Fabric managed application resource.
 * x-ms-original-file: 2025-03-01-preview/ServiceGetOperation_example.json
 */
async function getAService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.services.get("resRg", "myCluster", "myApp", "myService");
  console.log(result);
}

async function main(): Promise<void> {
  await getAService();
}

main().catch(console.error);
