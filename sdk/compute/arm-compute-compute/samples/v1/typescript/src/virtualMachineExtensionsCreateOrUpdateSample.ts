// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update the extension.
 *
 * @summary the operation to create or update the extension.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachineExtension_CreateOrUpdate_MaximumSet_Gen.json
 */
async function virtualMachineExtensionCreateOrUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineExtensions.createOrUpdate(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaa",
    {
      location: "westus",
      properties: {
        autoUpgradeMinorVersion: true,
        publisher: "extPublisher",
        type: "extType",
        typeHandlerVersion: "1.2",
        suppressFailures: true,
        settings: {},
        forceUpdateTag: "a",
        enableAutomaticUpgrade: true,
        protectedSettings: {},
        instanceView: {
          name: "aaaaaaaaaaaaaaaaa",
          type: "aaaaaaaaa",
          typeHandlerVersion: "aaaaaaaaaaaaaaaaaaaaaaaaaa",
          substatuses: [
            {
              code: "aaaaaaaaaaaaaaaaaaaaaaa",
              level: "Info",
              displayStatus: "aaaaaa",
              message: "a",
              time: new Date("2021-11-30T12:58:26.522Z"),
            },
          ],
          statuses: [
            {
              code: "aaaaaaaaaaaaaaaaaaaaaaa",
              level: "Info",
              displayStatus: "aaaaaa",
              message: "a",
              time: new Date("2021-11-30T12:58:26.522Z"),
            },
          ],
        },
      },
      tags: { key9183: "aa" },
    },
  );
}

/**
 * This sample demonstrates how to the operation to create or update the extension.
 *
 * @summary the operation to create or update the extension.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachineExtension_CreateOrUpdate_MinimumSet_Gen.json
 */
async function virtualMachineExtensionCreateOrUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineExtensions.createOrUpdate("rgcompute", "myVM", "myVMExtension", {
    location: "westus",
  });
}

async function main(): Promise<void> {
  await virtualMachineExtensionCreateOrUpdateMaximumSetGen();
  await virtualMachineExtensionCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
