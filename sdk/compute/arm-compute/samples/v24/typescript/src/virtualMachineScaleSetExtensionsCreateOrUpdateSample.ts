// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update an extension.
 *
 * @summary the operation to create or update an extension.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetExtension_CreateOrUpdate_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetExtensionCreateOrUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetExtensions.createOrUpdate(
    "rgcompute",
    "aaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaa",
    {
      name: "{extension-name}",
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
 * This sample demonstrates how to the operation to create or update an extension.
 *
 * @summary the operation to create or update an extension.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetExtension_CreateOrUpdate_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetExtensionCreateOrUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetExtensions.createOrUpdate(
    "rgcompute",
    "aaaaaaaaaaa",
    "aaaaaaaaaaa",
    {},
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineScaleSetExtensionCreateOrUpdateMaximumSetGen();
  await virtualMachineScaleSetExtensionCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
