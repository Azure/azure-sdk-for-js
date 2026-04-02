// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of resources that are onboarded with NSP. These resources can be associated with a network security perimeter
 *
 * @summary gets the list of resources that are onboarded with NSP. These resources can be associated with a network security perimeter
 * x-ms-original-file: 2025-05-01/PerimeterAssociableResourcesList.json
 */
async function networkSecurityPerimeterAssociableResourceTypes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterAssociableResourceTypes.list("westus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await networkSecurityPerimeterAssociableResourceTypes();
}

main().catch(console.error);
