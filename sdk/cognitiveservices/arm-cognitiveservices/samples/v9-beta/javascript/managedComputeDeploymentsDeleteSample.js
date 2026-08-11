// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified managed compute deployment associated with the Cognitive Services account.
 *
 * @summary deletes the specified managed compute deployment associated with the Cognitive Services account.
 * x-ms-original-file: 2026-05-15-preview/DeleteManagedComputeDeployment.json
 */
async function deleteManagedComputeDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.managedComputeDeployments.delete(
    "resourceGroupName",
    "accountName",
    "gpt-oss-120b-gpu",
  );
}

async function main() {
  await deleteManagedComputeDeployment();
}

main().catch(console.error);
