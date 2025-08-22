// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a new file workspace.
 *
 * @summary Creates a new file workspace.
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CreateFileWorkspace.json
 */

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createAFileWorkspace(): Promise<void> {
  const fileWorkspaceName = "testworkspace";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.fileWorkspacesNoSubscription.create(fileWorkspaceName);
  console.log(result);
}

async function main(): Promise<void> {
  await createAFileWorkspace();
}

main().catch(console.error);
