// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Update specified deployments associated with the Cognitive Services account.
 *
 * @summary Update specified deployments associated with the Cognitive Services account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/UpdateDeployment.json
 */
async function updateDeployment() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const deploymentName = "deploymentName";
  const deployment = {
    sku: { name: "Standard", capacity: 1 },
  };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.deployments.beginUpdateAndWait(
    resourceGroupName,
    accountName,
    deploymentName,
    deployment,
  );
  console.log(result);
}

async function main() {
  await updateDeployment();
}

main().catch(console.error);
