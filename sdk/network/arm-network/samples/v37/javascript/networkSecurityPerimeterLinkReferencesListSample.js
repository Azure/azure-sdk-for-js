// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the NSP LinkReference resources in the specified network security perimeter.
 *
 * @summary lists the NSP LinkReference resources in the specified network security perimeter.
 * x-ms-original-file: 2025-05-01/NspLinkReferenceList.json
 */
async function nspLinkReferenceList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterLinkReferences.list("rg1", "nsp2")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await nspLinkReferenceList();
}

main().catch(console.error);
