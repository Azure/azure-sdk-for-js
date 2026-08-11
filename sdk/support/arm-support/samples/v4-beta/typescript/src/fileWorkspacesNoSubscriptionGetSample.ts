// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets details for a specific file workspace.
 *
 * @summary gets details for a specific file workspace.
 * x-ms-original-file: 2025-06-01-preview/GetFileWorkspaceDetails.json
 */
async function getDetailsOfAFileWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.fileWorkspacesNoSubscription.get("testworkspace");
  console.log(result);
}

async function main(): Promise<void> {
  await getDetailsOfAFileWorkspace();
}

main().catch(console.error);
