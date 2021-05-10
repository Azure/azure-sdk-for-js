// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions, CertificateCredential } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

import { certificatePolicy } from "./certificatePolicy";
import GeneratedConfidentialLedger, {
  ConfidentialLedgerRestClient,
} from "./generated/src/confidentialLedger";

export default function ConfidentialLedger(
  ledgerBaseUrl: string,
  ledgerTlsCertificate: string,
  credentials: TokenCredential | CertificateCredential,
  options?: ClientOptions
): ConfidentialLedgerRestClient {
  const confidentialLedger = GeneratedConfidentialLedger(
    ledgerBaseUrl,
    credentials as any,
    options
  );

  confidentialLedger.pipeline.addPolicy(certificatePolicy(ledgerTlsCertificate, credentials));

  return confidentialLedger;
}
