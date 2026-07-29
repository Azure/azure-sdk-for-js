// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the state of specified private endpoint connection associated with the private link. This operation is typically used to approve or reject pending private endpoint connections.
 *
 * @summary update the state of specified private endpoint connection associated with the private link. This operation is typically used to approve or reject pending private endpoint connections.
 * x-ms-original-file: 2026-01-01/PrivateEndpointConnections/PrivateEndpointConnections_CreateOrUpdate.json
 */
async function createOrUpdatePrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.privateEndpointConnections.createOrUpdate("rg", "pls", "pe", {
    privateLinkServiceConnectionState: {
      description: "Approved by administrator",
      actionsRequired: "None",
      status: "Approved",
    },
  });
  console.log(result);
}

async function main() {
  await createOrUpdatePrivateEndpointConnection();
}

main().catch(console.error);
