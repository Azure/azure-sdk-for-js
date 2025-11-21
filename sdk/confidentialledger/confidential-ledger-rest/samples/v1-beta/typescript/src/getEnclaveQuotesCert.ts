// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list enclave quotes using client Certificate Authentication
 *
 * @summary gets a list of all enclave quotes using Client Certificate Authentication
 */

import "dotenv/config";

import ConfidentialLedger, {
  getLedgerIdentity,
  isUnexpected,
} from "@azure-rest/confidential-ledger";
const cert = process.env["USER_CERT"] || "";
const key = process.env["USER_CERT_KEY"] || "";
const endpoint = process.env["ENDPOINT"] || "";
const ledgerId = process.env["LEDGER_ID"] || "";

export async function main(): Promise<void> {
  console.log("== Confidential Ledger ==");

  // Get cert to verify host
  const ledgerIdentity = await getLedgerIdentity(ledgerId);

  // Create the Confidential Ledger Client
  const confidentialLedger = ConfidentialLedger(
    endpoint,
    ledgerIdentity.ledgerIdentityCertificate,
    {
      tlsOptions: {
        cert,
        key,
      },
    },
  );

  // Get enclave quotes
  const enclaveQuotes = await confidentialLedger.path("/app/enclaveQuotes").get();

  if (isUnexpected(enclaveQuotes)) {
    throw enclaveQuotes.body.error;
  }

  Object.keys(enclaveQuotes.body.enclaveQuotes).forEach((property) => {
    console.log(enclaveQuotes.body.enclaveQuotes[property].nodeId);
  });
}

main().catch((err) => {
  console.error(err);
});
