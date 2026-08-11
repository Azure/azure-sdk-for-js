// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfidentialLedgerClient } = require("@azure/arm-confidentialledger");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to to check whether a resource name is available.
 *
 * @summary to check whether a resource name is available.
 * x-ms-original-file: 2026-02-23/CheckNameAvailability.json
 */
async function checkNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfidentialLedgerClient(credential, subscriptionId);
  const result = await client.checkNameAvailability({
    name: "sample-name",
    type: "Microsoft.ConfidentialLedger/ledgers",
  });
  console.log(result);
}

async function main() {
  await checkNameAvailability();
}

main().catch(console.error);
