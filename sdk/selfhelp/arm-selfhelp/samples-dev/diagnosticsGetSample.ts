// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpRP } from "@azure/arm-selfhelp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the diagnostics using the 'diagnosticsResourceName' you chose while creating the diagnostic.
 *
 * @summary get the diagnostics using the 'diagnosticsResourceName' you chose while creating the diagnostic.
 * x-ms-original-file: 2024-03-01-preview/GetDiagnosticForKeyVaultResource.json
 */
async function getsADiagnosticForAKeyVaultResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  const result = await client.diagnostics.get(
    "subscriptions/0d0fcd2e-c4fd-4349-8497-200edb3923c6/resourceGroups/myresourceGroup/providers/Microsoft.KeyVault/vaults/test-keyvault-non-read",
    "VMNotWorkingInsight",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsADiagnosticForAKeyVaultResource();
}

main().catch(console.error);
