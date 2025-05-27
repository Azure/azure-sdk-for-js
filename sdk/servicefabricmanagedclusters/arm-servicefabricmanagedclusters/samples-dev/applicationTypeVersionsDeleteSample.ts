// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Service Fabric managed application type version resource with the specified name.
 *
 * @summary delete a Service Fabric managed application type version resource with the specified name.
 * x-ms-original-file: 2025-03-01-preview/ApplicationTypeVersionDeleteOperation_example.json
 */
async function deleteAnApplicationTypeVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  await client.applicationTypeVersions.delete("resRg", "myCluster", "myAppType", "1.0");
}

async function main(): Promise<void> {
  await deleteAnApplicationTypeVersion();
}

main().catch(console.error);
