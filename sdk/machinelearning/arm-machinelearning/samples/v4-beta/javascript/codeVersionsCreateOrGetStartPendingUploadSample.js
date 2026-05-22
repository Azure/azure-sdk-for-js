// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to generate a storage location and credential for the client to upload a code asset to.
 *
 * @summary generate a storage location and credential for the client to upload a code asset to.
 * x-ms-original-file: 2025-12-01/Workspace/CodeVersion/createOrGetStartPendingUpload.json
 */
async function createOrGetStartPendingUploadWorkspaceCodeVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.codeVersions.createOrGetStartPendingUpload(
    "test-rg",
    "my-aml-workspace",
    "string",
    "string",
    { pendingUploadId: "string", pendingUploadType: "None" },
  );
  console.log(result);
}

async function main() {
  await createOrGetStartPendingUploadWorkspaceCodeVersion();
}

main().catch(console.error);
