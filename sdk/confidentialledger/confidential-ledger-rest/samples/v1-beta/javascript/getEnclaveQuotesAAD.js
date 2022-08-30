// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list enclave quotes using client AAD Authentication
 *
 * @summary gets a list of all enclave quotes using AAD Authentication
 */
const ConfidentialLedger = require("@azure-rest/confidential-ledger").default,
  { getLedgerIdentity } = require("@azure-rest/confidential-ledger");
const { DefaultAzureCredential } = require("@azure/identity");

require("dotenv").config();

const endpoint = process.env["ENDPOINT"] || "";
const ledgerId = process.env["LEDGER_ID"] || "";

async function main() {
  console.log("== Confidential Ledger ==");

  // Get cert to verify host
  const ledgerIdentity = await getLedgerIdentity(ledgerId);

  // Create the Confidential Ledger Client
  const confidentialLedger = ConfidentialLedger(
    endpoint,
    ledgerIdentity.ledgerIdentityCertificate,
    new DefaultAzureCredential()
  );

  // Get enclave quotes
  const enclaveQuotes = await confidentialLedger.path("/app/enclaveQuotes").get();

  if (enclaveQuotes.status !== "200") {
    throw enclaveQuotes.body.error;
  }

  Object.keys(enclaveQuotes.body.enclaveQuotes).forEach((key) => {
    console.log(enclaveQuotes.body.enclaveQuotes[key].nodeId);
  });
}

main().catch((err) => {
  console.error(err);
});

module.exports = { main };
