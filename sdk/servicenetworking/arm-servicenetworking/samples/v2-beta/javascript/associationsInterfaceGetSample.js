// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceNetworkingManagementClient } = require("@azure/arm-servicenetworking");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Association
 *
 * @summary get a Association
 * x-ms-original-file: 2025-03-01-preview/AssociationGet.json
 */
async function getAssociation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.associationsInterface.get("rg1", "tc1", "as1");
  console.log(result);
}

async function main() {
  await getAssociation();
}

main().catch(console.error);
