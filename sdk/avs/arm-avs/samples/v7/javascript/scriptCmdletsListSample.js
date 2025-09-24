// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ScriptCmdlet resources by ScriptPackage
 *
 * @summary list ScriptCmdlet resources by ScriptPackage
 * x-ms-original-file: 2024-09-01/ScriptCmdlets_List.json
 */
async function scriptCmdletsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scriptCmdlets.list("group1", "cloud1", "package@1.0.2")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await scriptCmdletsList();
}

main().catch(console.error);
