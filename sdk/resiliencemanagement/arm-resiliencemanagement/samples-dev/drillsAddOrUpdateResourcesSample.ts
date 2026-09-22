// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this enables the user to include, exclude or update resources from their Drill.
 *
 * @summary this enables the user to include, exclude or update resources from their Drill.
 * x-ms-original-file: 2026-04-01-preview/Drills_AddOrUpdateResources_MaximumSet_Gen.json
 */
async function drillsAddOrUpdateResourcesMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.drills.addOrUpdateResources("sampleServiceGroupName", "qmn", "drill1", {
    faultDurationInMin: 0,
    resourceLists: {
      includeResources: [
        {
          faultProperties: {
            customFault: {
              faultName:
                "umofuzwgczqwyzcoakmrdrkjknykdonhypxibwrweggltsmjayvnlzroxdfalwkfsqvuqtfwhhzcnemndbgxdiciqs",
              scriptResourceId:
                "/subscriptions/191973cd-9c54-41e0-ac19-25dd9a92d5a8/resourceGroups/abhinkRG/providers/Microsoft.Automation/automationAccounts/abhinkAcc/runbooks/viveksi",
            },
            overriddenDefaultFault: {
              faultUrn: "urn:csci:microsoft:virtualMachine:shutdown/1.0",
              faultName: "shutdown",
              targetResourceId:
                "/subscriptions/f2edfd5d-5496-4683-b94f-b3588c579009/resourceGroups/testRG/providers/Microsoft.Compute/virtualMachines/vm1",
            },
          },
          id: "/providers/Microsoft.Management/serviceGroups/sampleServiceGroupName/providers/Microsoft.AzureResilienceManagement/drills/drill1/drillResources/2c9b3a1f-f96e-42c2-98fe-15005da8a133",
        },
      ],
      excludeResources: [
        "/providers/Microsoft.Management/serviceGroups/sampleServiceGroupName/providers/Microsoft.AzureResilienceManagement/drills/drill1/drillResources/c2191964-be24-4849-8faf-d9569576c708",
      ],
      updateResources: [
        {
          faultProperties: {
            customFault: {
              faultName:
                "umofuzwgczqwyzcoakmrdrkjknykdonhypxibwrweggltsmjayvnlzroxdfalwkfsqvuqtfwhhzcnemndbgxdiciqs",
              scriptResourceId:
                "/subscriptions/191973cd-9c54-41e0-ac19-25dd9a92d5a8/resourceGroups/abhinkRG/providers/Microsoft.Automation/automationAccounts/abhinkAcc/runbooks/viveksi",
            },
            overriddenDefaultFault: {
              faultUrn: "urn:csci:microsoft:virtualMachine:shutdown/1.0",
              faultName: "shutdown",
              targetResourceId:
                "/subscriptions/f2edfd5d-5496-4683-b94f-b3588c579009/resourceGroups/testRG/providers/Microsoft.Compute/virtualMachines/vm1",
            },
          },
          id: "/providers/Microsoft.Management/serviceGroups/sampleServiceGroupName/providers/Microsoft.AzureResilienceManagement/drills/drill1/drillResources/c26bea42-c34c-4e6f-8cf4-15043e18c8bc",
        },
      ],
    },
    forceInclusionAndUpdate: "Enable",
  });
}

async function main(): Promise<void> {
  await drillsAddOrUpdateResourcesMaximumSet();
}

main().catch(console.error);
