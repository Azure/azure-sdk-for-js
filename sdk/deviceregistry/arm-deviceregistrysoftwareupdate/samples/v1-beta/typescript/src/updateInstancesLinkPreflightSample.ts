// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceUpdateClient } from "@azure/arm-deviceregistrysoftwareupdate";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to preflight check for account linking readiness. No state change.
 *
 * @summary preflight check for account linking readiness. No state change.
 * x-ms-original-file: 2026-11-02-preview/UpdateInstances_LinkPreflight.json
 */
async function preflightCheckForAccountLinking(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceUpdateClient(credential, subscriptionId);
  const result = await client.updateInstances.linkPreflight("test-rg", "contoso", {
    namespaceResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.DeviceRegistry/namespaces/contoso-ns",
    namespaceUuid: "5d8b3e92-1f4c-4e1a-9b27-fe2a7b8d2a31",
    inboundCallerIdentity: { type: "SystemAssigned" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await preflightCheckForAccountLinking();
}

main().catch(console.error);
