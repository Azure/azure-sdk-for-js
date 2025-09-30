// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Deployment,
  CognitiveServicesManagementClient,
} from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update the state of specified deployments associated with the Cognitive Services account.
 *
 * @summary Update the state of specified deployments associated with the Cognitive Services account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/PutDeployment.json
 */
async function putDeployment(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const deploymentName = "deploymentName";
  const deployment: Deployment = {
    properties: { model: { name: "ada", format: "OpenAI", version: "1" } },
    sku: { name: "Standard", capacity: 1 },
  };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.deployments.beginCreateOrUpdateAndWait(
    resourceGroupName,
    accountName,
    deploymentName,
    deployment,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putDeployment();
}

main().catch(console.error);
