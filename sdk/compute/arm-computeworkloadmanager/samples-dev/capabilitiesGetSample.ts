// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadManagerClient } from "@azure/arm-computeworkloadmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a capability.
 *
 * @summary gets a capability.
 * x-ms-original-file: 2026-11-01-preview/Capabilities_Get.json
 */
async function getTheAgentSandboxCapability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  const result = await client.capabilities.get(
    "rg-workload",
    "managed-agents-prod",
    "agentSandbox",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTheAgentSandboxCapability();
}

main().catch(console.error);
