// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Service Fabric managed application type version resource created or in the process of being created in the Service Fabric managed application type name resource.
 *
 * @summary get a Service Fabric managed application type version resource created or in the process of being created in the Service Fabric managed application type name resource.
 * x-ms-original-file: 2025-03-01-preview/ApplicationTypeVersionGetOperation_example.json
 */
async function getAnApplicationTypeVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  const result = await client.applicationTypeVersions.get("resRg", "myCluster", "myAppType", "1.0");
  console.log(result);
}

async function main(): Promise<void> {
  await getAnApplicationTypeVersion();
}

main().catch(console.error);
