// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to called by Client (Portal, CLI, etc) to get available "private link resources" for the workspace.
 * Each "private link resource" is a connection endpoint (IP address) to the resource.
 * Pre single connection endpoint per workspace: the Data Plane IP address, returned by DNS resolution.
 * Other RPs, such as Azure Storage, have multiple - one for Blobs, other for Queues, etc.
 * Defined in the "[NRP] Private Endpoint Design" doc, topic "GET API for GroupIds".
 *
 * @summary called by Client (Portal, CLI, etc) to get available "private link resources" for the workspace.
 * Each "private link resource" is a connection endpoint (IP address) to the resource.
 * Pre single connection endpoint per workspace: the Data Plane IP address, returned by DNS resolution.
 * Other RPs, such as Azure Storage, have multiple - one for Blobs, other for Queues, etc.
 * Defined in the "[NRP] Private Endpoint Design" doc, topic "GET API for GroupIds".
 * x-ms-original-file: 2025-12-01/PrivateLinkResource/list.json
 */
async function workspaceListPrivateLinkResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResources.list("rg-1234", "testworkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await workspaceListPrivateLinkResources();
}

main().catch(console.error);
