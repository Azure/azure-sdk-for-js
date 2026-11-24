// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkSecurityManagementClient } from "@azure/arm-networksecurity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to rolls back succeeded rollbackable mitigations under a finding.
 *
 * @summary rolls back succeeded rollbackable mitigations under a finding.
 * x-ms-original-file: 2026-10-01-preview/NeuroShieldFindings_Rollback.json
 */
async function rollbackFindingMitigations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const result = await client.neuroShieldFindings.rollback(
    "myResourceGroup",
    "myNeuroShield",
    "vm-01",
    "CVE-2026-12345-vm-01",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await rollbackFindingMitigations();
}

main().catch(console.error);
