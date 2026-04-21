// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all the addresses in a suppression list.
 *
 * @summary get all the addresses in a suppression list.
 * x-ms-original-file: 2026-03-18/suppressionLists/getAddresses.json
 */
async function getAllSuppressionListAddressesResourcesForASuppressionListResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.suppressionListAddresses.list(
    "contosoResourceGroup",
    "contosoEmailService",
    "contoso.com",
    "aaaa1111-bbbb-2222-3333-aaaa11112222",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllSuppressionListAddressesResourcesForASuppressionListResource();
}

main().catch(console.error);
