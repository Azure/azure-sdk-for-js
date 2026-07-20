// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-enclave";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ApprovalResource
 *
 * @summary get a ApprovalResource
 * x-ms-original-file: 2026-03-01-preview/Approvals_Get.json
 */
async function approvalGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MissionClient(credential);
  const result = await client.approval.get(
    "subscriptions/c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c/resourceGroups/TestMyRg/providers/Microsoft.Mission/enclaveconnections/TestMyEnclaveConnection",
    "TestApprovals",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await approvalGet();
}

main().catch(console.error);
