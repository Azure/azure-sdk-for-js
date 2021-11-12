// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CertificateCredential,
  ClientOptions,
  isCertificateCredential
} from "@azure-rest/core-client";
import GeneratedConfidentialLedger, { ConfidentialLedgerRestClient, } from "./generated/src/confidentialLedger";
import { TokenCredential } from "@azure/core-auth";
import { certificatePolicy } from "./certificatePolicy";

export default function ConfidentialLedger(
  ledgerBaseUrl: string,
  ledgerTlsCertificate: string,
  credentials: TokenCredential | CertificateCredential,
  options?: ClientOptions
): ConfidentialLedgerRestClient {
  // If certificate credential is passed, we'll handle auth
  const creds = isCertificateCredential(credentials) ? undefined : credentials;

  const confidentialLedger = GeneratedConfidentialLedger(ledgerBaseUrl, creds, options);

  confidentialLedger.pipeline.addPolicy(certificatePolicy(ledgerTlsCertificate, credentials));

  return confidentialLedger;
}
