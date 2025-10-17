// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update an extension.
 *
 * @summary the operation to update an extension.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetExtension_Update_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetExtensionUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSetExtensions.update(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaa",
    {
      properties: {
        autoUpgradeMinorVersion: true,
        publisher: "{extension-Publisher}",
        type: "{extension-Type}",
        typeHandlerVersion: "{handler-version}",
        settings: {},
        forceUpdateTag: "aaaaaaaaa",
        enableAutomaticUpgrade: true,
        protectedSettings: {},
        provisionAfterExtensions: ["aa"],
        suppressFailures: true,
      },
    },
  );
}

/**
 * This sample demonstrates how to the operation to update an extension.
 *
 * @summary the operation to update an extension.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetExtension_Update_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetExtensionUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSetExtensions.update(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaaaa",
    "aa",
    {},
  );
}

async function main(): Promise<void> {
  await virtualMachineScaleSetExtensionUpdateMaximumSetGen();
  await virtualMachineScaleSetExtensionUpdateMinimumSetGen();
}

main().catch(console.error);
