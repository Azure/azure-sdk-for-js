// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the NSP profiles in the specified network security perimeter.
 *
 * @summary lists the NSP profiles in the specified network security perimeter.
 * x-ms-original-file: 2025-05-01/NspProfileList.json
 */
async function nspProfilesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterProfiles.list("rg1", "nsp1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await nspProfilesList();
}

main().catch(console.error);
