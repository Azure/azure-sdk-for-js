// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { GuestConfigurationClient } = require("@azure/arm-guestconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2024-04-05/listOperations.json
 */
async function listsAllOfTheAvailableGuestConfigurationRestAPIOperations() {
  const credential = new DefaultAzureCredential();
  const client = new GuestConfigurationClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsAllOfTheAvailableGuestConfigurationRestAPIOperations();
}

main().catch(console.error);
