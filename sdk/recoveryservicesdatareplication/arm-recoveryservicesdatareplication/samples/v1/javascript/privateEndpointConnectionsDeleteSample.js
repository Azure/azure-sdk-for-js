// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  AzureSiteRecoveryManagementServiceAPI,
} = require("@azure/arm-recoveryservicesdatareplication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the private endpoint connection.
 *
 * @summary deletes the private endpoint connection.
 * x-ms-original-file: 2024-09-01/PrivateEndpointConnection_Delete.json
 */
async function deletesThePrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "rgswagger_2024-09-01",
    "4",
    "sdwqtfhigjirrzhpbmqtzgs",
  );
}

async function main() {
  await deletesThePrivateEndpointConnection();
}

main().catch(console.error);
