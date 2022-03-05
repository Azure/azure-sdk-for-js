// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ClientOptions,
  CertificateCredential,
  isCertificateCredential,
  getClientCertificatePolicy,
} from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

import GeneratedConfidentialLedger, {
  ConfidentialLedgerRestClient,
} from "./generated/src/confidentialLedger";

export default function ConfidentialLedger(
  ledgerBaseUrl: string,
  ledgerTlsCertificate: string,
  credentials: TokenCredential | CertificateCredential,
  options?: ClientOptions
): ConfidentialLedgerRestClient {
  // If certificate credential is passed, we'll handle auth
  const creds = isCertificateCredential(credentials) ? undefined : credentials;

  const confidentialLedger = GeneratedConfidentialLedger(ledgerBaseUrl, creds, options);

  if (isCertificateCredential(credentials)) {
    confidentialLedger.pipeline.addPolicy(
      getClientCertificatePolicy({ ...credentials, ca: ledgerTlsCertificate })
    );
  }

  return confidentialLedger;
}
