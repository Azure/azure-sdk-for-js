// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get project capabilityHost.
 *
 * @summary Get project capabilityHost.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/ProjectCapabilityHost/get.json
 */
async function getProjectCapabilityHost() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "test-rg";
  const accountName = "account-1";
  const projectName = "project-1";
  const capabilityHostName = "capabilityHostName";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.projectCapabilityHosts.get(
    resourceGroupName,
    accountName,
    projectName,
    capabilityHostName,
  );
  console.log(result);
}

async function main() {
  await getProjectCapabilityHost();
}

main().catch(console.error);
