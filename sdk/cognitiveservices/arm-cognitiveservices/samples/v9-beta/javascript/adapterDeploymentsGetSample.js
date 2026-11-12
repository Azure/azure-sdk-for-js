// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an adapter deployment by name.
 *
 * @summary gets an adapter deployment by name.
 * x-ms-original-file: 2026-09-15-preview/GetAdapterDeployment.json
 */
async function getAdapterDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.adapterDeployments.get(
    "resourceGroupName",
    "accountName",
    "adapterDeploymentName",
  );
  console.log(result);
}

async function main() {
  await getAdapterDeployment();
}

main().catch(console.error);
