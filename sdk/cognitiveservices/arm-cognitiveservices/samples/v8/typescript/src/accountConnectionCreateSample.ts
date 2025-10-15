// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update Cognitive Services account connection under the specified account.
 *
 * @summary Create or update Cognitive Services account connection under the specified account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/preview/2025-04-01-preview/examples/AccountConnection/create.json
 */

import {
  ConnectionPropertiesV2BasicResource,
  AccountConnectionsCreateOptionalParams,
  CognitiveServicesManagementClient,
} from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createAccountConnection(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroup-1";
  const accountName = "account-1";
  const connectionName = "connection-1";
  const connection: ConnectionPropertiesV2BasicResource = {
    properties: {
      authType: "None",
      category: "ContainerRegistry",
      expiryTime: new Date("2024-03-15T14:30:00Z"),
      target: "[tartget url]",
    },
  };
  const options: AccountConnectionsCreateOptionalParams = { connection };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.accountConnections.create(
    resourceGroupName,
    accountName,
    connectionName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAccountConnection();
}

main().catch(console.error);
