// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to handles requests to list all resources in a resource group.
 *
 * @summary handles requests to list all resources in a resource group.
 * x-ms-original-file: 2026-03-18/communicationServices/listByResourceGroup.json
 */
async function listByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.communicationServices.listByResourceGroup("MyResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listByResourceGroup();
}

main().catch(console.error);
