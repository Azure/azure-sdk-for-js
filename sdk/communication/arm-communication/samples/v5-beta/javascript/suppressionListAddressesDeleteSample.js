// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to delete a single address from a suppression list.
 *
 * @summary operation to delete a single address from a suppression list.
 * x-ms-original-file: 2026-03-18/suppressionLists/deleteAddress.json
 */
async function deleteASuppressionListAddressResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  await client.suppressionListAddresses.delete(
    "MyResourceGroup",
    "MyEmailServiceResource",
    "mydomain.com",
    "aaaa1111-bbbb-2222-3333-aaaa11112222",
    "11112222-3333-4444-5555-999999999999",
  );
}

async function main() {
  await deleteASuppressionListAddressResource();
}

main().catch(console.error);
