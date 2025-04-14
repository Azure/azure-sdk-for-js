// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getClient } from "@azure-rest/core-client";

export interface LedgerIdentity {
  ledgerIdentityCertificate: string;
  ledgerId: string;
}

export async function getLedgerIdentity(
  ledgerId: string,
  identityServiceBaseUrl: string = "https://identity.confidential-ledger.core.azure.com",
): Promise<LedgerIdentity> {
  const client = getClient(identityServiceBaseUrl);

  const cert = await client.pathUnchecked("/ledgerIdentity/{ledgerId}", ledgerId).get();

  const updatedCert = {
    ledgerIdentityCertificate: cert.body["ledgerTlsCertificate"],
    ledgerId: cert.body["ledgerId"],
  };

  if (!isLedgerIdentity(updatedCert)) {
    throw new Error(
      "Body received from Confidential Ledger Identity is invalid. It must contain ledgerId and ledgerIdentityCertificate",
    );
  }

  return updatedCert;
}

function isLedgerIdentity(identity: any): identity is LedgerIdentity {
  return identity.ledgerIdentityCertificate && identity.ledgerId;
}
