// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceUpdateClient } from "@azure/arm-deviceregistrysoftwareupdate";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to initiate account linking. Validates and persists binding, sets linkingState=InProgress.
 *
 * @summary initiate account linking. Validates and persists binding, sets linkingState=InProgress.
 * x-ms-original-file: 2026-11-02-preview/UpdateInstances_LinkInitiate.json
 */
async function initiateAccountLinking(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceUpdateClient(credential, subscriptionId);
  await client.updateInstances.linkInitiate("test-rg", "contoso", {
    namespaceResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.DeviceRegistry/namespaces/contoso-ns",
    namespaceUuid: "5d8b3e92-1f4c-4e1a-9b27-fe2a7b8d2a31",
    dataAddress: "eastus2.api.deviceregistry.com",
    inboundCallerIdentity: { type: "SystemAssigned" },
  });
}

async function main(): Promise<void> {
  await initiateAccountLinking();
}

main().catch(console.error);
