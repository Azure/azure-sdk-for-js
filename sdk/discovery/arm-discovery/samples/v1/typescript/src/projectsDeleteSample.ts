// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Project
 *
 * @summary delete a Project
 * x-ms-original-file: 2026-06-01/Projects_Delete_MaximumSet_Gen.json
 */
async function projectsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.projects.delete("rgdiscovery", "97520ee2d6a76d232e", "e9f886be682c26b909");
}

async function main(): Promise<void> {
  await projectsDeleteMaximumSet();
}

main().catch(console.error);
