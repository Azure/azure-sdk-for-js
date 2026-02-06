// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to only returns the latest version of each node image. For example there may be an AKSUbuntu-1804gen2containerd-2024.01.26, but only AKSUbuntu-1804gen2containerd-2024.02.02 is visible in this list.
 *
 * @summary only returns the latest version of each node image. For example there may be an AKSUbuntu-1804gen2containerd-2024.01.26, but only AKSUbuntu-1804gen2containerd-2024.02.02 is visible in this list.
 * x-ms-original-file: 2025-10-02-preview/NodeImageVersions_List.json
 */
async function listNodeImageVersions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerService.listNodeImageVersions("location1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listNodeImageVersions();
}

main().catch(console.error);
