// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceNetworkingManagementClient } = require("@azure/arm-servicenetworking");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Association
 *
 * @summary delete a Association
 * x-ms-original-file: 2025-03-01-preview/AssociationDelete.json
 */
async function deleteAssociation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  await client.associationsInterface.delete("rg1", "tc1", "as1");
}

async function main() {
  await deleteAssociation();
}

main().catch(console.error);
