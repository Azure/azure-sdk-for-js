// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new file workspace for the specified subscription.
 *
 * @summary creates a new file workspace for the specified subscription.
 * x-ms-original-file: 2026-06-01/CreateFileWorkspaceForSubscription.json
 */
async function createAFileWorkspaceForASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "132d901f-189d-4381-9214-fe68e27e05a1";
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.fileWorkspaces.create("testworkspace");
  console.log(result);
}

async function main(): Promise<void> {
  await createAFileWorkspaceForASubscription();
}

main().catch(console.error);
