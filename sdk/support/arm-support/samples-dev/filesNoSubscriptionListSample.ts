// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the Files information under a workspace for an Azure subscription.
 *
 * @summary lists all the Files information under a workspace for an Azure subscription.
 * x-ms-original-file: 2026-06-01/ListFilesUnderFileWorkspace.json
 */
async function listFilesUnderAWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const resArray = new Array();
  for await (const item of client.filesNoSubscription.list("testworkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listFilesUnderAWorkspace();
}

main().catch(console.error);
