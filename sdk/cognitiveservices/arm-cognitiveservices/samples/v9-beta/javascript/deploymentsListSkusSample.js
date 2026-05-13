// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the specified deployments skus associated with the Cognitive Services account.
 *
 * @summary lists the specified deployments skus associated with the Cognitive Services account.
 * x-ms-original-file: 2026-01-15-preview/ListDeploymentSkus.json
 */
async function listDeploymentSkus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deployments.listSkus(
    "resourceGroupName",
    "accountName",
    "deploymentName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDeploymentSkus();
}

main().catch(console.error);
