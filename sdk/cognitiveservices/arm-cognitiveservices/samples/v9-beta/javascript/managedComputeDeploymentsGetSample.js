// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified managed compute deployment associated with the Cognitive Services account.
 *
 * @summary gets the specified managed compute deployment associated with the Cognitive Services account.
 * x-ms-original-file: 2026-03-15-preview/GetManagedComputeDeployment.json
 */
async function getManagedComputeDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.managedComputeDeployments.get(
    "resourceGroupName",
    "accountName",
    "gpt-oss-120b-gpu",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified managed compute deployment associated with the Cognitive Services account.
 *
 * @summary gets the specified managed compute deployment associated with the Cognitive Services account.
 * x-ms-original-file: 2026-03-15-preview/GetVmManagedComputeDeployment.json
 */
async function getVmManagedComputeDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.managedComputeDeployments.get(
    "resourceGroupName",
    "accountName",
    "gpt-oss-120b-byoc",
  );
  console.log(result);
}

async function main() {
  await getManagedComputeDeployment();
  await getVmManagedComputeDeployment();
}

main().catch(console.error);
