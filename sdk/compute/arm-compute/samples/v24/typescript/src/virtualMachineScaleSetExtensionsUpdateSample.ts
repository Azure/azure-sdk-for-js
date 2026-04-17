// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute";
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
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetExtensions.update(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaa",
    {
      autoUpgradeMinorVersion: true,
      publisher: "{extension-Publisher}",
      typePropertiesType: "{extension-Type}",
      typeHandlerVersion: "{handler-version}",
      settings: {},
      forceUpdateTag: "aaaaaaaaa",
      enableAutomaticUpgrade: true,
      protectedSettings: {},
      provisionAfterExtensions: ["aa"],
      suppressFailures: true,
    },
  );
  console.log(result);
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
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetExtensions.update(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaaaa",
    "aa",
    {},
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineScaleSetExtensionUpdateMaximumSetGen();
  await virtualMachineScaleSetExtensionUpdateMinimumSetGen();
}

main().catch(console.error);
