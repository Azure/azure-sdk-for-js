// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceUpdateClient } from "@azure/arm-deviceregistrysoftwareupdate";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to notify linking state change (commit, fail, or namespaceDeleted).
 *
 * @summary notify linking state change (commit, fail, or namespaceDeleted).
 * x-ms-original-file: 2026-11-02-preview/UpdateInstances_LinkNotify.json
 */
async function notifyLinkingStateChangeCommit(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceUpdateClient(credential, subscriptionId);
  await client.updateInstances.linkNotify("test-rg", "contoso", { action: "commit" });
}

async function main(): Promise<void> {
  await notifyLinkingStateChangeCommit();
}

main().catch(console.error);
