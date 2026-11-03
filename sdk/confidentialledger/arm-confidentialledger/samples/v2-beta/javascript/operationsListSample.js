// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfidentialLedgerClient } = require("@azure/arm-confidentialledger");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2026-02-23/Operations_Get.json
 */
async function operationsGet() {
  const credential = new DefaultAzureCredential();
  const client = new ConfidentialLedgerClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await operationsGet();
}

main().catch(console.error);
