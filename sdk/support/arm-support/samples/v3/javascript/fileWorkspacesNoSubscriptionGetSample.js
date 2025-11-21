// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets details for a specific file workspace.
 *
 * @summary Gets details for a specific file workspace.
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/GetFileWorkspaceDetails.json
 */

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function getDetailsOfAFileWorkspace() {
  const fileWorkspaceName = "testworkspace";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.fileWorkspacesNoSubscription.get(fileWorkspaceName);
  console.log(result);
}

async function main() {
  await getDetailsOfAFileWorkspace();
}

main().catch(console.error);
