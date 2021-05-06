// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to make a simple call to the Azure Document Translator
 * service to get a list of supported file formats
 *
 * @summary gets a list of all supported document formats
 * @azsdk-weight 40
 */
import ConfidentialLedger, { getLedgerIdentity } from "@azure-rest/confidential-ledger";

import * as dotenv from "dotenv";
dotenv.config();

// const endpoint = process.env["ENDPOINT"] || "document-translator endpoint";

const cert = process.env["USER_CERT"] || "";

export async function main() {
  console.log("== Confidential Ledger ==");

  // Get cert to verify host
  const ledgerIdentity = await getLedgerIdentity("sdk-test-ledger-prod");

  // Create the Confidential Ledger Client
  const confidentialLedger = ConfidentialLedger(
    "https://sdk-test-ledger-prod.eastus.cloudapp.azure.com",
    ledgerIdentity.ledgerTlsCertificate,
    { cert: cert, certKey: cert }
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
