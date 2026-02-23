// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeActionsManagementClient } = require("@azure/arm-edgeactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a EdgeActionVersion
 *
 * @summary create a EdgeActionVersion
 * x-ms-original-file: 2025-12-01-preview/EdgeActionVersions_Create.json
 */
async function createEdgeActionVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  const result = await client.edgeActionVersions.create("testrg", "edgeAction1", "version2", {
    location: "global",
    properties: { deploymentType: "zip", isDefaultVersion: "True" },
  });
  console.log(result);
}

async function main() {
  await createEdgeActionVersion();
}

main().catch(console.error);
