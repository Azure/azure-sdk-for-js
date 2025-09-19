// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Update the state of specified private endpoint connection associated with the Cognitive Services account.
 *
 * @summary Update the state of specified private endpoint connection associated with the Cognitive Services account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/PutPrivateEndpointConnection.json
 */
async function putPrivateEndpointConnection() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "res7687";
  const accountName = "sto9699";
  const privateEndpointConnectionName = "{privateEndpointConnectionName}";
  const properties = {
    properties: {
      privateLinkServiceConnectionState: {
        description: "Auto-Approved",
        status: "Approved",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.beginCreateOrUpdateAndWait(
    resourceGroupName,
    accountName,
    privateEndpointConnectionName,
    properties,
  );
  console.log(result);
}

async function main() {
  await putPrivateEndpointConnection();
}

main().catch(console.error);
