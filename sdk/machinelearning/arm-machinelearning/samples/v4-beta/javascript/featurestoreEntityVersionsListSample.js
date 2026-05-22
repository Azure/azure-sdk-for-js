// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list versions.
 *
 * @summary list versions.
 * x-ms-original-file: 2025-12-01/Workspace/FeaturestoreEntityVersion/list.json
 */
async function listWorkspaceFeaturestoreEntityVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.featurestoreEntityVersions.list(
    "test-rg",
    "my-aml-workspace",
    "string",
    { tags: "string", listViewType: "ActiveOnly" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listWorkspaceFeaturestoreEntityVersion();
}

main().catch(console.error);
