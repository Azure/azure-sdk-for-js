// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformClient } = require("@azure/arm-anyscale");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a workspace.
 *
 * @summary gets a workspace.
 * x-ms-original-file: 2026-09-01/Workspaces_Get.json
 */
async function workspacesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  const result = await client.workspaces.get(
    "rganyscale",
    "testcloud",
    "testproject",
    "testworkspace",
  );
  console.log(result);
}

async function main() {
  await workspacesGet();
}

main().catch(console.error);
