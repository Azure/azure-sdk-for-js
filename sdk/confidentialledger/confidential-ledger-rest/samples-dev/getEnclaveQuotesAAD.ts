// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "dotenv/config";

/**
 * This sample demonstrates how to list enclave quotes using client AAD Authentication
 *
 * @summary gets a list of all enclave quotes using AAD Authentication
 * @azsdk-weight 30
 */
import ConfidentialLedger, {
  getLedgerIdentity,
  isUnexpected,
} from "@azure-rest/confidential-ledger";

import { DefaultAzureCredential } from "@azure/identity";
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
    new DefaultAzureCredential(),
  );

  // Get enclave quotes
  const enclaveQuotes = await confidentialLedger.path("/app/enclaveQuotes").get();

  if (isUnexpected(enclaveQuotes)) {
    throw enclaveQuotes.body.error;
  }

  await Object.keys(enclaveQuotes.body.enclaveQuotes).forEach((property) => {
    console.log(enclaveQuotes.body.enclaveQuotes[property].nodeId);
  });
}

main().catch((err) => {
  console.error(err);
});
