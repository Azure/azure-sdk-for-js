// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadManagerClient } from "@azure/arm-computeworkloadmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to disables and deletes a capability.
 *
 * @summary disables and deletes a capability.
 * x-ms-original-file: 2026-11-01-preview/Capabilities_Delete.json
 */
async function deleteTheAgentSandboxCapability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  await client.capabilities.delete("rg-workload", "managed-agents-prod", "agentSandbox");
}

async function main(): Promise<void> {
  await deleteTheAgentSandboxCapability();
}

main().catch(console.error);
