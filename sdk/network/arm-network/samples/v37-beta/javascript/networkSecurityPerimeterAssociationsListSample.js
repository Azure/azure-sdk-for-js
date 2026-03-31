// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the NSP resource associations.
 *
 * @summary lists the NSP resource associations.
 * x-ms-original-file: 2025-05-01/NspAssociationList.json
 */
async function nspAssociationList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterAssociations.list("rg1", "nsp1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await nspAssociationList();
}

main().catch(console.error);
