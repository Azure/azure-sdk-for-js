// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ConnectionPropertiesV2BasicResource,
  ProjectConnectionsCreateOptionalParams,
  CognitiveServicesManagementClient,
} from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update Cognitive Services project connection under the specified project.
 *
 * @summary Create or update Cognitive Services project connection under the specified project.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/ProjectConnection/create.json
 */
async function createProjectConnection(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroup-1";
  const accountName = "account-1";
  const projectName = "project-1";
  const connectionName = "connection-1";
  const connection: ConnectionPropertiesV2BasicResource = {
    properties: {
      authType: "None",
      category: "ContainerRegistry",
      expiryTime: new Date("2024-03-15T14:30:00Z"),
      target: "[tartget url]",
    },
  };
  const options: ProjectConnectionsCreateOptionalParams = { connection };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.projectConnections.create(
    resourceGroupName,
    accountName,
    projectName,
    connectionName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createProjectConnection();
}

main().catch(console.error);
