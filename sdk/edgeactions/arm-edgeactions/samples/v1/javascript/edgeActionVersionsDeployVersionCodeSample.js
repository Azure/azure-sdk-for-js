// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeActionsManagementClient } = require("@azure/arm-edgeactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to a long-running resource action.
 *
 * @summary a long-running resource action.
 * x-ms-original-file: 2026-10-01/EdgeActionVersions_DeployVersionCode.json
 */
async function deployVersionCode() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  const result = await client.edgeActionVersions.deployVersionCode(
    "testrg",
    "edgeAction1",
    "version2",
    {
      name: "edge_action.js",
      content:
        "UEsDBBQAAAAIAAAAIQAqlc+OKAAAACoAAAAOAAAAZWRnZV9hY3Rpb24uanNLK81LLsnMz1PISMxLyUkt0kgtS80r0VSoVihKLSktylMA860VarkAUEsBAhQAFAAAAAgAAAAhACqVz44oAAAAKgAAAA4AAAAAAAAAAAAAAKSBAAAAAGVkZ2VfYWN0aW9uLmpzUEsFBgAAAAABAAEAPAAAAFQAAAAAAA==",
    },
  );
  console.log(result);
}

async function main() {
  await deployVersionCode();
}

main().catch(console.error);
