// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update version.
 *
 * @summary create or update version.
 * x-ms-original-file: 2025-12-01/Workspace/ComponentVersion/createOrUpdate.json
 */
async function createOrUpdateWorkspaceComponentVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.componentVersions.createOrUpdate(
    "test-rg",
    "my-aml-workspace",
    "string",
    "string",
    {
      properties: {
        description: "string",
        componentSpec: { "8ced901b-d826-477d-bfef-329da9672513": null },
        isAnonymous: false,
        properties: { string: "string" },
        tags: { string: "string" },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateWorkspaceComponentVersion();
}

main().catch(console.error);
