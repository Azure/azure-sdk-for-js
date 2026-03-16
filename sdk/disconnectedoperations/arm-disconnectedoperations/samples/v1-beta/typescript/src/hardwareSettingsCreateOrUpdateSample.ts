// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DisconnectedOperationsManagementClient } from "@azure/arm-disconnectedoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update hardware settings
 *
 * @summary create or update hardware settings
 * x-ms-original-file: 2026-03-15/HardwareSettings_CreateOrUpdate_MaximumSet_Gen.json
 */
async function hardwareSettingsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "AFEEE483-435F-4E9C-8742-4B550746CD70";
  const client = new DisconnectedOperationsManagementClient(credential, subscriptionId);
  const result = await client.hardwareSettings.createOrUpdate(
    "rgdisconnectedOperations",
    "demo-resource",
    "default",
    {
      properties: {
        totalCores: 200,
        diskSpaceInGb: 1024,
        memoryInGb: 64,
        oem: "Contoso",
        hardwareSku: "MC-760",
        nodes: 3,
        versionAtRegistration: "2411.2",
        solutionBuilderExtension: "xyz",
        deviceId: "663ee8a3-4ea8-48ec-8810-b1f8b86cb270",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await hardwareSettingsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
