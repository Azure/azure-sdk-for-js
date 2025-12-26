// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to configure RemoteSupport on a cluster
 *
 * @summary configure RemoteSupport on a cluster
 * x-ms-original-file: 2025-12-01-preview/ConfigureRemoteSupport.json
 */
async function configureRemoteSupport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusters.configureRemoteSupport("test-rg", "mycluster", {
    properties: {
      accessLevel: "Diagnostics",
      expirationTimeStamp: new Date("2020-01-01T17:18:19.1234567Z"),
      remoteSupportType: "Enable",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await configureRemoteSupport();
}

main().catch(console.error);
