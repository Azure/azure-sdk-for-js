// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeActionsManagementClient } = require("@azure/arm-edgeactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the version code for the edge action version.
 *
 * @summary get the version code for the edge action version.
 * x-ms-original-file: 2025-12-01-preview/EdgeActionVersions_GetVersionCode.json
 */
async function getVersionCode() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  const result = await client.edgeActionVersions.getVersionCode(
    "testrg",
    "edgeAction1",
    "version1",
  );
  console.log(result);
}

async function main() {
  await getVersionCode();
}

main().catch(console.error);
