// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the specified deployments associated with the Cognitive Services account.
 *
 * @summary Gets the specified deployments associated with the Cognitive Services account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/GetDeployment.json
 */
async function getDeployment() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const deploymentName = "deploymentName";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.deployments.get(resourceGroupName, accountName, deploymentName);
  console.log(result);
}

async function main() {
  await getDeployment();
}

main().catch(console.error);
