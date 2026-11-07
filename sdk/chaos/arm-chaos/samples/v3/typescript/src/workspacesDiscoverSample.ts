// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts discovery for the workspace. The initial 202 has no body. Poll the operation-bound Location URL until completion: a successful or partially successful discovery returns the typed result; failed or canceled processing returns an Azure error whose target identifies the discovery resource. Ordinary discovery reads return the current resource, including failed or canceled results, while retained.
 *
 * @summary starts discovery for the workspace. The initial 202 has no body. Poll the operation-bound Location URL until completion: a successful or partially successful discovery returns the typed result; failed or canceled processing returns an Azure error whose target identifies the discovery resource. Ordinary discovery reads return the current resource, including failed or canceled results, while retained.
 * x-ms-original-file: 2026-11-01/Workspaces_Discover.json
 */
async function triggerResourceDiscoveryForTheWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.discover("exampleRG", "exampleWorkspace");
  console.log(result);
}

async function main(): Promise<void> {
  await triggerResourceDiscoveryForTheWorkspace();
}

main().catch(console.error);
