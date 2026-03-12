// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  AzureSiteRecoveryManagementServiceAPI,
} = require("@azure/arm-recoveryservicesdatareplication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the all private endpoint connections configured on the vault.
 *
 * @summary gets the all private endpoint connections configured on the vault.
 * x-ms-original-file: 2024-09-01/PrivateEndpointConnection_List.json
 */
async function listsThePrivateEndpointConnections() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list("rgswagger_2024-09-01", "4")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsThePrivateEndpointConnections();
}

main().catch(console.error);
