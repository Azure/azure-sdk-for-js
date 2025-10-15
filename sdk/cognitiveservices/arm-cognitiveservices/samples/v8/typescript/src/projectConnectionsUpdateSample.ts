// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ConnectionUpdateContent,
  ProjectConnectionsUpdateOptionalParams,
  CognitiveServicesManagementClient,
} from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update Cognitive Services project connection under the specified project.
 *
 * @summary Update Cognitive Services project connection under the specified project.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/ProjectConnection/update.json
 */
async function updateProjectConnection(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "test-rg";
  const accountName = "account-1";
  const projectName = "project-1";
  const connectionName = "connection-1";
  const connection: ConnectionUpdateContent = {
    properties: {
      authType: "AccessKey",
      category: "ADLSGen2",
      credentials: {
        accessKeyId: "some_string",
        secretAccessKey: "some_string",
      },
      expiryTime: new Date("2020-01-01T00:00:00Z"),
      metadata: {},
      target: "some_string",
    },
  };
  const options: ProjectConnectionsUpdateOptionalParams = { connection };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.projectConnections.update(
    resourceGroupName,
    accountName,
    projectName,
    connectionName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateProjectConnection();
}

main().catch(console.error);
