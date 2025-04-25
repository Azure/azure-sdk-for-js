// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OnlineExperimentationClient } = require("@azure/arm-onlineexperimentation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all experiment workspaces in a resource group.
 *
 * @summary gets all experiment workspaces in a resource group.
 * x-ms-original-file: 2025-05-31-preview/OnlineExperimentWorkspaces_ListByResourceGroup.json
 */
async function listOnlineExperimentWorkspacesInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fa5fc227-a624-475e-b696-cdd604c735bc";
  const client = new OnlineExperimentationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.onlineExperimentWorkspaces.listByResourceGroup("res9871")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOnlineExperimentWorkspacesInAResourceGroup();
}

main().catch(console.error);
