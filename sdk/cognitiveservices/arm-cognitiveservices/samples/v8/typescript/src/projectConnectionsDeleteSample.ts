// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete Cognitive Services project connection by name.
 *
 * @summary Delete Cognitive Services project connection by name.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/ProjectConnection/delete.json
 */
async function deleteProjectConnection(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroup-1";
  const accountName = "account-1";
  const projectName = "project-1";
  const connectionName = "connection-1";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.projectConnections.delete(
    resourceGroupName,
    accountName,
    projectName,
    connectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteProjectConnection();
}

main().catch(console.error);
