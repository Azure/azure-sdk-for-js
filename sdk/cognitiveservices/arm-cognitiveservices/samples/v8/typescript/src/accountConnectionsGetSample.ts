// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists Cognitive Services account connection by name.
 *
 * @summary Lists Cognitive Services account connection by name.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/AccountConnection/get.json
 */
async function getAccountConnection(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroup-1";
  const accountName = "account-1";
  const connectionName = "connection-1";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.accountConnections.get(
    resourceGroupName,
    accountName,
    connectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAccountConnection();
}

main().catch(console.error);
