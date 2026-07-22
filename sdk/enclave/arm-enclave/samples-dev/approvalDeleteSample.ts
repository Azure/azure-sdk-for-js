// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-enclave";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a ApprovalResource
 *
 * @summary delete a ApprovalResource
 * x-ms-original-file: 2026-03-01-preview/Approvals_Delete.json
 */
async function approvalDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MissionClient(credential);
  await client.approval.delete(
    "subscriptions/c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c/resourceGroups/TestMyRg/providers/Microsoft.Mission/enclaveconnections/TestMyEnclaveConnection",
    "TestApprovals",
  );
}

async function main(): Promise<void> {
  await approvalDelete();
}

main().catch(console.error);
