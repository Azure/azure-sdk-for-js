// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";

import type { ClientOptions } from "@azure-rest/core-client";
import type { ConfidentialLedgerClient } from "./clientDefinitions.js";
import GeneratedConfidentialLedger from "./confidentialLedger.js";

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
