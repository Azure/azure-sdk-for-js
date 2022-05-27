// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import GeneratedConfidentialLedger, {
  ConfidentialLedgerRestClient,
} from "./generated/src/confidentialLedger";
import { TokenCredential, isTokenCredential } from "@azure/core-auth";

import { ClientOptions } from "@azure-rest/core-client";

export default function ConfidentialLedger(
  ledgerBaseUrl: string,
  ledgerTlsCertificate: string,
  options?: ClientOptions
): ConfidentialLedgerRestClient;
export default function ConfidentialLedger(
  ledgerBaseUrl: string,
  ledgerTlsCertificate: string,
  credentials: TokenCredential,
  options?: ClientOptions
): ConfidentialLedgerRestClient;
export default function ConfidentialLedger(
  ledgerBaseUrl: string,
  ledgerTlsCertificate: string,
  credentialsOrOptions?: TokenCredential | ClientOptions,
  opts?: ClientOptions
): ConfidentialLedgerRestClient {
  let credentials: TokenCredential | undefined;
  let options: ClientOptions;

  if (isTokenCredential(credentialsOrOptions)) {
    credentials = credentialsOrOptions;
    options = opts ?? {};
  } else {
    options = credentialsOrOptions ?? {};
  }

  const tlsOptions = options?.tlsOptions ?? {};
  tlsOptions.ca = ledgerTlsCertificate;
  const confidentialLedger = GeneratedConfidentialLedger(ledgerBaseUrl, credentials, {
    ...options,
    tlsOptions,
  });
  return confidentialLedger;
}
