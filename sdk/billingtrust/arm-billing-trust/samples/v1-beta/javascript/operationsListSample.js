// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingTrustClient } = require("@azure/arm-billing-trust");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2026-03-17-preview/Operations_List.json
 */
async function listOperationsForMicrosoftBillingTrust() {
  const credential = new DefaultAzureCredential();
  const client = new BillingTrustClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOperationsForMicrosoftBillingTrust();
}

main().catch(console.error);
