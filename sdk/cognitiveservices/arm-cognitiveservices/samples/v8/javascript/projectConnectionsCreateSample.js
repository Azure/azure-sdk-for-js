// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create or update Cognitive Services project connection under the specified project.
 *
 * @summary Create or update Cognitive Services project connection under the specified project.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/ProjectConnection/create.json
 */
async function createProjectConnection() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroup-1";
  const accountName = "account-1";
  const projectName = "project-1";
  const connectionName = "connection-1";
  const connection = {
    properties: {
      authType: "None",
      category: "ContainerRegistry",
      expiryTime: new Date("2024-03-15T14:30:00Z"),
      target: "[tartget url]",
    },
  };
  const options = { connection };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.projectConnections.create(
    resourceGroupName,
    accountName,
    projectName,
    connectionName,
    options,
  );
  console.log(result);
}

async function main() {
  await createProjectConnection();
}

main().catch(console.error);
