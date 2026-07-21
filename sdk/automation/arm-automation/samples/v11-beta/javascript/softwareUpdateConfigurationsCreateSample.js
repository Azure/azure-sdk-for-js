// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new software update configuration with the name given in the URI.
 *
 * @summary create a new software update configuration with the name given in the URI.
 * x-ms-original-file: 2024-10-23/softwareUpdateConfiguration/createSoftwareUpdateConfiguration.json
 */
async function createSoftwareUpdateConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.softwareUpdateConfigurations.create(
    "mygroup",
    "myaccount",
    "testpatch",
    {
      scheduleInfo: {
        advancedSchedule: { weekDays: ["Monday", "Thursday"] },
        expiryTime: new Date("2018-11-09T11:22:57+00:00"),
        frequency: "Hour",
        interval: 1,
        startTime: new Date("2017-10-19T12:22:57+00:00"),
        timeZone: "America/Los_Angeles",
      },
      tasks: {
        postTask: { source: "GetCache" },
        preTask: { parameters: { COMPUTERNAME: "Computer1" }, source: "HelloWorld" },
      },
      updateConfiguration: {
        azureVirtualMachines: [
          "/subscriptions/5ae68d89-69a4-454f-b5ce-e443cc4e0067/resourceGroups/myresources/providers/Microsoft.Compute/virtualMachines/vm-01",
          "/subscriptions/5ae68d89-69a4-454f-b5ce-e443cc4e0067/resourceGroups/myresources/providers/Microsoft.Compute/virtualMachines/vm-02",
          "/subscriptions/5ae68d89-69a4-454f-b5ce-e443cc4e0067/resourceGroups/myresources/providers/Microsoft.Compute/virtualMachines/vm-03",
        ],
        duration: "PT2H0M",
        nonAzureComputerNames: ["box1.contoso.com", "box2.contoso.com"],
        operatingSystem: "Windows",
        targets: {
          azureQueries: [
            {
              locations: ["Japan East", "UK South"],
              scope: [
                "/subscriptions/5ae68d89-69a4-454f-b5ce-e443cc4e0067/resourceGroups/myresources",
                "/subscriptions/5ae68d89-69a4-454f-b5ce-e443cc4e0067",
              ],
              tagSettings: {
                filterOperator: "All",
                tags: {
                  tag1: ["tag1Value1", "tag1Value2", "tag1Value3"],
                  tag2: ["tag2Value1", "tag2Value2", "tag2Value3"],
                },
              },
            },
          ],
          nonAzureQueries: [
            { functionAlias: "SavedSearch1", workspaceId: "WorkspaceId1" },
            { functionAlias: "SavedSearch2", workspaceId: "WorkspaceId2" },
          ],
        },
        windows: {
          excludedKbNumbers: ["168934", "168973"],
          includedUpdateClassifications: "Critical",
          rebootSetting: "IfRequired",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createSoftwareUpdateConfiguration();
}

main().catch(console.error);
