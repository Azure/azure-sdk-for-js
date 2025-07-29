// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  AzureSiteRecoveryManagementServiceAPI,
} = require("@azure/arm-recoveryservicesdatareplication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updated the private endpoint connection status (Approval/Rejected). This gets invoked by resource admin.
 *
 * @summary updated the private endpoint connection status (Approval/Rejected). This gets invoked by resource admin.
 * x-ms-original-file: 2024-09-01/PrivateEndpointConnection_Update.json
 */
async function updatesThePrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.privateEndpointConnections.update(
    "rgswagger_2024-09-01",
    "4",
    "jitf",
    {
      properties: {
        privateEndpoint: { id: "cwcdqoynostmqwdwy" },
        privateLinkServiceConnectionState: {
          status: "Approved",
          description: "y",
          actionsRequired: "afwbq",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await updatesThePrivateEndpointConnection();
}

main().catch(console.error);
