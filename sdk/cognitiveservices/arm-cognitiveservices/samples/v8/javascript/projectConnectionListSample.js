// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the available Cognitive Services project connections under the specified project.
 *
 * @summary Lists all the available Cognitive Services project connections under the specified project.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/preview/2025-04-01-preview/examples/ProjectConnection/list.json
 */

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function listProjectConnection() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroup-1";
  const accountName = "account-1";
  const projectName = "project-1";
  const target = "[tartget url]";
  const category = "ContainerRegistry";
  const options = { target, category };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.projectConnections.list(
    resourceGroupName,
    accountName,
    projectName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listProjectConnection();
}

main().catch(console.error);
