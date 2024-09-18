// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenCredential, isTokenCredential } from "@azure/core-auth";

import { ClientOptions } from "@azure-rest/core-client";
import { ConfidentialLedgerClient } from "./generated/src/clientDefinitions";
import GeneratedConfidentialLedger from "./generated/src/confidentialLedger";

export default function ConfidentialLedger(
  ledgerEndpoint: string,
  ledgerIdentityCertificate: string,
  options?: ClientOptions,
): ConfidentialLedgerClient;
export default function ConfidentialLedger(
  ledgerEndpoint: string,
  ledgerIdentityCertificate: string,
  credentials: TokenCredential,
  options?: ClientOptions,
): ConfidentialLedgerClient;
export default function ConfidentialLedger(
  ledgerEndpoint: string,
  ledgerIdentityCertificate: string,
  credentialsOrOptions?: TokenCredential | ClientOptions,
  opts?: ClientOptions,
): ConfidentialLedgerClient {
  let credentials: TokenCredential | undefined;
  let options: ClientOptions;

  if (isTokenCredential(credentialsOrOptions)) {
    credentials = credentialsOrOptions;
    options = opts ?? {};
  } else {
    options = credentialsOrOptions ?? {};
  }

  const tlsOptions = options?.tlsOptions ?? {};
  tlsOptions.ca = ledgerIdentityCertificate;
  const confidentialLedger = GeneratedConfidentialLedger(ledgerEndpoint, credentials!, {
    ...options,
    tlsOptions,
  });
  return confidentialLedger;
}
