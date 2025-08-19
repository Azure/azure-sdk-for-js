// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to virtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesExecuteCreate_MaximumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesExecuteCreateMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0505D8E4-D41A-48FB-9CA5-4AF8D93BE75F";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesExecuteCreate(
    "oslhbouzgevzpeydssyelhw",
    {
      resourceConfigParameters: {
        baseProfile: {
          hardwareProfile: { name: "F1" },
          provisioningState: 0,
          storageProfile: { osDisk: { osType: 0 } },
          vmExtensions: [
            {
              autoUpgradeMinorVersion: true,
              protectedSettings: "SomeDecryptedSecretValue",
              provisioningState: 0,
              enableAutomaticUpgrade: true,
              publisher: "Microsoft.Azure.Monitor",
              type: "AzureMonitorLinuxAgent",
              typeHandlerVersion: "1.0",
            },
            { name: "myExtensionName" },
          ],
          resourcegroupName: "RG5ABF491C-3164-42A6-8CB5-BF3CB53B018B",
          computeApiVersion: "2024-07-01",
        },
        resourceOverrides: [
          {
            name: "myFleet_523",
            location: "LocalDev",
            properties: {
              hardwareProfile: { vmSize: "Standard_F1s" },
              provisioningState: 0,
              osProfile: {
                computerName: "myFleet000000",
                adminUsername: "adminUser",
                windowsConfiguration: {
                  additionalUnattendContent: [
                    { passName: "someValue", content: "" },
                    {
                      passName: "someOtherValue",
                      content: "SomeDecryptedSecretValue",
                    },
                  ],
                },
                adminPassword: "SomeDecryptedSecretValue",
              },
              priority: 0,
            },
            zones: ["1"],
          },
          {
            name: "myFleet_524",
            location: "LocalDev",
            properties: {
              hardwareProfile: { vmSize: "Standard_G1s" },
              provisioningState: 0,
              osProfile: {
                computerName: "myFleet000000",
                adminUsername: "adminUser",
                windowsConfiguration: {
                  additionalUnattendContent: [
                    { passName: "someValue", content: "" },
                    {
                      passName: "someOtherValue",
                      content: "SomeDecryptedSecretValue",
                    },
                  ],
                },
                adminPassword: "SomeDecryptedSecretValue",
              },
              priority: 0,
            },
            zones: ["2"],
          },
        ],
        resourceCount: 2,
        resourcePrefix: "TL1",
      },
      executionParameters: {
        retryPolicy: { retryCount: 5, retryWindowInMinutes: 40 },
      },
      correlationid: "dfe927c5-16a6-40b7-a0f7-8524975ed642",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesExecuteCreate_MinimumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesExecuteCreateMinimumSetGenGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0505D8E4-D41A-48FB-9CA5-4AF8D93BE75F";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesExecuteCreate("useast", {
    resourceConfigParameters: {
      baseProfile: {
        hardwareProfile: { name: "F1" },
        provisioningState: 0,
        storageProfile: { osDisk: { osType: 0 } },
        vmExtensions: [
          {
            autoUpgradeMinorVersion: true,
            protectedSettings: "SomeDecryptedSecretValue",
            provisioningState: 0,
            enableAutomaticUpgrade: true,
            publisher: "Microsoft.Azure.Monitor",
            type: "AzureMonitorLinuxAgent",
            typeHandlerVersion: "1.0",
          },
          { name: "myExtensionName" },
        ],
        resourcegroupName: "RG5ABF491C-3164-42A6-8CB5-BF3CB53B018B",
        computeApiVersion: "2024-07-01",
      },
      resourceOverrides: [
        {
          name: "myFleet_523",
          location: "LocalDev",
          properties: {
            hardwareProfile: { vmSize: "Standard_F1s" },
            provisioningState: 0,
            osProfile: {
              computerName: "myFleet000000",
              adminUsername: "adminUser",
              windowsConfiguration: {
                additionalUnattendContent: [
                  { passName: "someValue", content: "" },
                  {
                    passName: "someOtherValue",
                    content: "SomeDecryptedSecretValue",
                  },
                ],
              },
              adminPassword: "SomeDecryptedSecretValue",
            },
            priority: 0,
          },
          zones: ["1"],
        },
        {
          name: "myFleet_524",
          location: "LocalDev",
          properties: {
            hardwareProfile: { vmSize: "Standard_G1s" },
            provisioningState: 0,
            osProfile: {
              computerName: "myFleet000000",
              adminUsername: "adminUser",
              windowsConfiguration: {
                additionalUnattendContent: [
                  { passName: "someValue", content: "" },
                  {
                    passName: "someOtherValue",
                    content: "SomeDecryptedSecretValue",
                  },
                ],
              },
              adminPassword: "SomeDecryptedSecretValue",
            },
            priority: 0,
          },
          zones: ["2"],
        },
      ],
      resourceCount: 2,
    },
    executionParameters: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsVirtualMachinesExecuteCreateMaximumSetGenGeneratedByMaximumSetRule();
  await scheduledActionsVirtualMachinesExecuteCreateMinimumSetGenGeneratedByMinimumSetRule();
}

main().catch(console.error);
