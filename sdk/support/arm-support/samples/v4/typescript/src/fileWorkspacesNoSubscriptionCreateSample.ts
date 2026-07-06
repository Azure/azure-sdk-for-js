// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new file workspace.
 *
 * @summary creates a new file workspace.
 * x-ms-original-file: 2026-07-01/CreateFileWorkspace.json
 */
async function createAFileWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.fileWorkspacesNoSubscription.create("testworkspace");
  console.log(result);
}

async function main(): Promise<void> {
  await createAFileWorkspace();
}

main().catch(console.error);
