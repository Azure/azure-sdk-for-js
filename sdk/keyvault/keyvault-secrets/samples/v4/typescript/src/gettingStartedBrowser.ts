// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Authenticates with Azure Key Vault from a browser using InteractiveBrowserCredential.
 */

import { InteractiveBrowserCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

export async function main(): Promise<void> {
  const credential = new InteractiveBrowserCredential({
    tenantId: "<YOUR_TENANT_ID>",
    clientId: "<YOUR_CLIENT_ID>",
  });
  const url = "<keyvault-url>";
  const client = new SecretClient(url, credential);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
