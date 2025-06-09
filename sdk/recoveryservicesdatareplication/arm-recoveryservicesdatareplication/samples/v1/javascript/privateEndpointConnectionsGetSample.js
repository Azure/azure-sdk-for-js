// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  AzureSiteRecoveryManagementServiceAPI,
} = require("@azure/arm-recoveryservicesdatareplication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private endpoint connection details.
 *
 * @summary gets the private endpoint connection details.
 * x-ms-original-file: 2024-09-01/PrivateEndpointConnection_Get.json
 */
async function getsThePrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get("rgswagger_2024-09-01", "4", "vbkm");
  console.log(result);
}

async function main() {
  await getsThePrivateEndpointConnection();
}

main().catch(console.error);
