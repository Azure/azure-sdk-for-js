// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list capabilityHost.
 *
 * @summary list capabilityHost.
 * x-ms-original-file: 2026-01-15-preview/ProjectCapabilityHost/list.json
 */
async function listProjectCapabilityHosts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.projectCapabilityHosts.list(
    "test-rg",
    "account-1",
    "project-1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listProjectCapabilityHosts();
}

main().catch(console.error);
