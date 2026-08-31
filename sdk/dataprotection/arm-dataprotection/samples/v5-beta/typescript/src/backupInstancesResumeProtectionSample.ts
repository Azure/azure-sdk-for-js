// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation will resume protection for a stopped backup instance
 *
 * @summary this operation will resume protection for a stopped backup instance
 * x-ms-original-file: 2026-04-01-preview/BackupInstanceOperations/ResumeProtection.json
 */
async function resumeProtection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  await client.backupInstances.resumeProtection("testrg", "testvault", "testbi", {
    parameters: {
      identityDetails: {
        useSystemAssignedIdentity: false,
        userAssignedIdentityArmUrl:
          "/subscriptions/f75d8d8b-6735-4697-82e1-1a7a3ff0d5d4/resourceGroups/rg-name/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testUami",
      },
      objectType: "ResumeProtectionRequest",
    },
  });
}

async function main(): Promise<void> {
  await resumeProtection();
}

main().catch(console.error);
