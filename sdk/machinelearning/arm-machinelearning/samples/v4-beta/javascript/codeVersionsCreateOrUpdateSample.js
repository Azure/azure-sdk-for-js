// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update version.
 *
 * @summary create or update version.
 * x-ms-original-file: 2025-12-01/Workspace/CodeVersion/createOrUpdate.json
 */
async function createOrUpdateWorkspaceCodeVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.codeVersions.createOrUpdate(
    "test-rg",
    "my-aml-workspace",
    "string",
    "string",
    {
      properties: {
        description: "string",
        codeUri: "https://blobStorage/folderName",
        isAnonymous: false,
        properties: { string: "string" },
        tags: { string: "string" },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateWorkspaceCodeVersion();
}

main().catch(console.error);
