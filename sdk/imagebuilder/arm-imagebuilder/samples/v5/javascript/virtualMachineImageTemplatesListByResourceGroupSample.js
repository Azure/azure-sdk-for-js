// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ImageBuilderClient } = require("@azure/arm-imagebuilder");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about the VM image templates associated with the specified resource group.
 *
 * @summary gets information about the VM image templates associated with the specified resource group.
 * x-ms-original-file: 2025-10-01/ListImageTemplatesByRg.json
 */
async function listImagesByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ImageBuilderClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineImageTemplates.listByResourceGroup(
    "myResourceGroup",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listImagesByResourceGroup();
}

main().catch(console.error);
