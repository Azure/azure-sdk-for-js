// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists the specified deployments skus associated with the Cognitive Services account.
 *
 * @summary Lists the specified deployments skus associated with the Cognitive Services account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/ListDeploymentSkus.json
 */
async function listDeploymentSkus() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const deploymentName = "deploymentName";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deployments.listSkus(
    resourceGroupName,
    accountName,
    deploymentName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listDeploymentSkus();
}

main().catch(console.error);
