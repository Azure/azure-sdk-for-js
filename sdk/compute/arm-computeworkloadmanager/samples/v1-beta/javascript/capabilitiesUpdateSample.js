// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadManagerClient } = require("@azure/arm-computeworkloadmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates mutable capability properties.
 *
 * @summary updates mutable capability properties.
 * x-ms-original-file: 2026-11-01-preview/Capabilities_Update.json
 */
async function updateTheAgentSandboxVersionPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  const result = await client.capabilities.update(
    "rg-workload",
    "managed-agents-prod",
    "agentSandbox",
    { properties: { versionPolicy: "ServiceManaged" } },
  );
  console.log(result);
}

async function main() {
  await updateTheAgentSandboxVersionPolicy();
}

main().catch(console.error);
