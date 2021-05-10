import { getClient } from "@azure-rest/core-client";

export interface LedgerIdentity {
  ledgerTlsCertificate: string;
  ledgerId: string;
}

export async function getLedgerIdentity(
  ledgerId: string,
  identityServiceBaseUrl: string = "https://identity.accledger.azure.com"
): Promise<LedgerIdentity> {
  const client = getClient(identityServiceBaseUrl);

  const cert = await client.pathUnchecked("/ledgerIdentity/{ledgerId}", ledgerId).get();

  if (!isLedgerIdentity(cert.body)) {
    throw new Error(
      "Body received from Confidential Ledger Identity is invalid. It must contain ledgerId and ledgerTlsCertificate"
    );
  }

  return cert.body;
}

function isLedgerIdentity(identity: any): identity is LedgerIdentity {
  return identity.ledgerTlsCertificate && identity.ledgerId;
}
