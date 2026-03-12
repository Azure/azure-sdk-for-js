// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Configure RemoteSupport on a cluster
 *
 * @summary Configure RemoteSupport on a cluster
 * x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/stable/2024-04-01/examples/ConfigureRemoteSupport.json
 */

import type { RemoteSupportRequest } from "@azure/arm-azurestackhci";
import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function configureRemoteSupport(): Promise<void> {
  const subscriptionId =
    process.env["AZURESTACKHCI_SUBSCRIPTION_ID"] || "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const resourceGroupName = process.env["AZURESTACKHCI_RESOURCE_GROUP"] || "test-rg";
  const clusterName = "mycluster";
  const remoteSupportRequest: RemoteSupportRequest = {
    properties: {
      accessLevel: "Diagnostics",
      expirationTimeStamp: new Date("2020-01-01T17:18:19.1234567Z"),
      remoteSupportType: "Enable",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusters.beginConfigureRemoteSupportAndWait(
    resourceGroupName,
    clusterName,
    remoteSupportRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await configureRemoteSupport();
}

main().catch(console.error);
