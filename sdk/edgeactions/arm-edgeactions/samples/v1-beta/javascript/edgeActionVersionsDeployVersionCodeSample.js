// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeActionsManagementClient } = require("@azure/arm-edgeactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to a long-running resource action.
 *
 * @summary a long-running resource action.
 * x-ms-original-file: 2025-12-01-preview/EdgeActionVersions_DeployVersionCode.json
 */
async function deployVersionCode() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  const result = await client.edgeActionVersions.deployVersionCode(
    "testrg",
    "edgeAction1",
    "version2",
    { name: "zippedFile", content: "UEsDBBQAAAAIAI1NzkQAAAAABQAAAA==" },
  );
  console.log(result);
}

async function main() {
  await deployVersionCode();
}

main().catch(console.error);
