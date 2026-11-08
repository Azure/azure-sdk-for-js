// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AgentPlatformClient } = require("@azure/arm-koreaiartemis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an Organization (long-running).
 *
 * Permanently removes the Organization and cascades the deletion to all
 * child Workspaces at the partner. This operation is irreversible.
 *
 * @summary delete an Organization (long-running).
 *
 * Permanently removes the Organization and cascades the deletion to all
 * child Workspaces at the partner. This operation is irreversible.
 * x-ms-original-file: 2026-07-01-preview/Organizations_Delete.json
 */
async function organizationsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  await client.organizations.delete("contoso-rg", "contoso-org");
}

/**
 * This sample demonstrates how to delete an Organization (long-running).
 *
 * Permanently removes the Organization and cascades the deletion to all
 * child Workspaces at the partner. This operation is irreversible.
 *
 * @summary delete an Organization (long-running).
 *
 * Permanently removes the Organization and cascades the deletion to all
 * child Workspaces at the partner. This operation is irreversible.
 * x-ms-original-file: 2026-07-01-preview/Organizations_Delete_MaximumSet_Gen.json
 */
async function organizationsDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  await client.organizations.delete("contoso-rg", "contoso-org");
}

async function main() {
  await organizationsDelete();
  await organizationsDeleteMaximumSetGen();
}

main().catch(console.error);
