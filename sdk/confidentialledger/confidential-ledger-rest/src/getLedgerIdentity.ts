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

  return cert.body as LedgerIdentity;
}
