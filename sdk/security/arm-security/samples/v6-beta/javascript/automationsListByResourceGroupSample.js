// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the security automations in the specified resource group. Use the 'nextLink' property in the response to get the next page of security automations for the specified resource group.
 *
 * @summary lists all the security automations in the specified resource group. Use the 'nextLink' property in the response to get the next page of security automations for the specified resource group.
 * x-ms-original-file: 2023-12-01-preview/Automations/GetAutomationsResourceGroup_example.json
 */
async function listAllSecurityAutomationsOfASpecifiedResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a5caac9c-5c04-49af-b3d0-e204f40345d5";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.automations.listByResourceGroup("exampleResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllSecurityAutomationsOfASpecifiedResourceGroup();
}

main().catch(console.error);
