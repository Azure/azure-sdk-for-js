// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as dotenv from "dotenv";

/**
 * This sample demonstrates how to list enclave quotes using client Certificate Authentication
 *
 * @summary gets a list of all enclave quotes using Client Certificate Authentication
 * @azsdk-weight 40
 */
import ConfidentialLedger, { getLedgerIdentity } from "@azure-rest/confidential-ledger";

dotenv.config();

const cert = process.env["USER_CERT"] || "";
const key = process.env["USER_CERT_KEY"] || "";
const endpoint = process.env["ENDPOINT"] || "";
const ledgerId = process.env["LEDGER_ID"] || "";

export async function main() {
  console.log("== Confidential Ledger ==");

  // Get cert to verify host
  const ledgerIdentity = await getLedgerIdentity(ledgerId);

  // Create the Confidential Ledger Client
  const confidentialLedger = ConfidentialLedger(endpoint, ledgerIdentity.ledgerTlsCertificate, {
    tlsOptions: {
      cert,
      key,
    },
  });

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
