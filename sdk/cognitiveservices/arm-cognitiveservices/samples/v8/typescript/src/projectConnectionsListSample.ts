// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ProjectConnectionsListOptionalParams,
  CognitiveServicesManagementClient,
} from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists all the available Cognitive Services project connections under the specified project.
 *
 * @summary Lists all the available Cognitive Services project connections under the specified project.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/ProjectConnection/list.json
 */
async function listProjectConnection(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroup-1";
  const accountName = "account-1";
  const projectName = "project-1";
  const target = "[tartget url]";
  const category = "ContainerRegistry";
  const options: ProjectConnectionsListOptionalParams = { target, category };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
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

async function main(): Promise<void> {
  await listProjectConnection();
}

main().catch(console.error);
