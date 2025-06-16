// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OnlineExperimentationClient } = require("@azure/arm-onlineexperimentation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2025-05-31-preview/OnlineExperimentationWorkspaces_OperationsList.json
 */
async function listOnlineExperimentationWorkspacesOperations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new OnlineExperimentationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOnlineExperimentationWorkspacesOperations();
}

main().catch(console.error);
