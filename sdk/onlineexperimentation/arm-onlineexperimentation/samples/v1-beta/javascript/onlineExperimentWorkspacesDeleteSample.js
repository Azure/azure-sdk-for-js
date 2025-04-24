// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OnlineExperimentationClient } = require("@azure/arm-onlineexperimentation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an experiment workspace
 *
 * @summary deletes an experiment workspace
 * x-ms-original-file: 2025-05-31-preview/OnlineExperimentWorkspaces_Delete.json
 */
async function deleteAnOnlineExperimentWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fa5fc227-a624-475e-b696-cdd604c735bc";
  const client = new OnlineExperimentationClient(credential, subscriptionId);
  await client.onlineExperimentWorkspaces.delete("res9871", "expworkspace3");
}

async function main() {
  await deleteAnOnlineExperimentWorkspace();
}

main().catch(console.error);
