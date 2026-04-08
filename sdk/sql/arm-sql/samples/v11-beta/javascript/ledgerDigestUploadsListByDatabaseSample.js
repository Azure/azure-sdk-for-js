// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all ledger digest upload settings on a database.
 *
 * @summary gets all ledger digest upload settings on a database.
 * x-ms-original-file: 2025-02-01-preview/LedgerDigestUploadsList.json
 */
async function getsListOfLedgerDigestUploadSettingsOnADatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.ledgerDigestUploads.listByDatabase(
    "ledgertestrg",
    "ledgertestserver",
    "testdb",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsListOfLedgerDigestUploadSettingsOnADatabase();
}

main().catch(console.error);
