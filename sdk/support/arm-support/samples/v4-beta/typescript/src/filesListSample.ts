// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the Files information under a workspace for an Azure subscription.
 *
 * @summary lists all the Files information under a workspace for an Azure subscription.
 * x-ms-original-file: 2025-06-01-preview/ListFilesForSubscriptionUnderFileWorkspace.json
 */
async function listFilesUnderAWorkspaceForASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "132d901f-189d-4381-9214-fe68e27e05a1";
  const client = new MicrosoftSupport(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.files.list("testworkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listFilesUnderAWorkspaceForASubscription();
}

main().catch(console.error);
