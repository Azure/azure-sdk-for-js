// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to approves or rejects a private endpoint connection
 *
 * @summary approves or rejects a private endpoint connection
 * x-ms-original-file: 2018-06-01/ApproveRejectPrivateEndpointConnection.json
 */
async function approvesOrRejectsAPrivateEndpointConnectionForAFactory() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnection.createOrUpdate(
    "exampleResourceGroup",
    "exampleFactoryName",
    "connection",
    {
      properties: {
        privateEndpoint: {
          id: "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/exampleResourceGroup/providers/Microsoft.DataFactory/factories/exampleFactoryName/privateEndpoints/myPrivateEndpoint",
        },
        privateLinkServiceConnectionState: {
          description: "Approved by admin.",
          actionsRequired: "",
          status: "Approved",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await approvesOrRejectsAPrivateEndpointConnectionForAFactory();
}

main().catch(console.error);
