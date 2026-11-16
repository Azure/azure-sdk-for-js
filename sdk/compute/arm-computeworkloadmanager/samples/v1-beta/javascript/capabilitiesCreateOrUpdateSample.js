// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadManagerClient } = require("@azure/arm-computeworkloadmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or replaces a capability.
 *
 * @summary creates or replaces a capability.
 * x-ms-original-file: 2026-11-01-preview/Capabilities_CreateOrUpdate_AgentSandbox.json
 */
async function enableTheAgentSandboxCapability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  const result = await client.capabilities.createOrUpdate(
    "rg-workload",
    "managed-agents-prod",
    "agentSandbox",
    { location: "eastus2", kind: "AgentSandbox", properties: { versionPolicy: "ServiceManaged" } },
  );
  console.log(result);
}

async function main() {
  await enableTheAgentSandboxCapability();
}

main().catch(console.error);
