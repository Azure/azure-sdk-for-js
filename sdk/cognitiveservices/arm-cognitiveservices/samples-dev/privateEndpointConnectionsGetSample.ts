// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the specified private endpoint connection associated with the Cognitive Services account.
 *
 * @summary Gets the specified private endpoint connection associated with the Cognitive Services account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/GetPrivateEndpointConnection.json
 */

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getPrivateEndpointConnection(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "res6977";
  const accountName = "sto2527";
  const privateEndpointConnectionName = "{privateEndpointConnectionName}";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.privateEndpointConnections.get(
    resourceGroupName,
    accountName,
    privateEndpointConnectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getPrivateEndpointConnection();
}

main().catch(console.error);
