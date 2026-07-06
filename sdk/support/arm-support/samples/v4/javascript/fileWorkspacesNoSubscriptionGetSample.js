// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets details for a specific file workspace.
 *
 * @summary gets details for a specific file workspace.
 * x-ms-original-file: 2026-07-01/GetFileWorkspaceDetails.json
 */
async function getDetailsOfAFileWorkspace() {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.fileWorkspacesNoSubscription.get("testworkspace");
  console.log(result);
}

async function main() {
  await getDetailsOfAFileWorkspace();
}

main().catch(console.error);
