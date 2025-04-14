// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CodeSigningClient } = require("@azure/arm-trustedsigning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2024-02-05-preview/Operations_List.json
 */
async function listTrustedSigningAccountOperations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new CodeSigningClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  listTrustedSigningAccountOperations();
}

main().catch(console.error);
