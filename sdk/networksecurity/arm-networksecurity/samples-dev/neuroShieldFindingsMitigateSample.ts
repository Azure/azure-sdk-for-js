// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkSecurityManagementClient } from "@azure/arm-networksecurity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to triggers mitigation for all awaiting-approval mitigations under a finding.
 *
 * @summary triggers mitigation for all awaiting-approval mitigations under a finding.
 * x-ms-original-file: 2026-10-01-preview/NeuroShieldFindings_Mitigate.json
 */
async function mitigateFinding(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const result = await client.neuroShieldFindings.mitigate(
    "myResourceGroup",
    "myNeuroShield",
    "vm-01",
    "CVE-2026-12345-vm-01",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await mitigateFinding();
}

main().catch(console.error);
