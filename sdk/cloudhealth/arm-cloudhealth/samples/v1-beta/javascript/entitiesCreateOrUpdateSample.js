// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Entity
 *
 * @summary create a Entity
 * x-ms-original-file: 2025-05-01-preview/Entities_CreateOrUpdate.json
 */
async function entitiesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.entities.createOrUpdate(
    "rgopenapi",
    "myHealthModel",
    "uszrxbdkxesdrxhmagmzywebgbjj",
    {
      properties: {
        displayName: "My entity",
        canvasPosition: { x: 14, y: 13 },
        icon: {
          iconName: "Custom",
          customData: "rcitntvapruccrhtxmkqjphbxunkz",
        },
        healthObjective: 62,
        impact: "Standard",
        labels: { key1376: "ixfvzsfnpvkkbrce" },
        signals: {
          azureResource: {
            signalAssignments: [{ signalDefinitions: ["sigdef1"] }],
            authenticationSetting: "B3P1X3e-FZtZ-4Ak-2VLHGQ-4m4-05DE-XNW5zW3P-46XY-DC3SSX",
            azureResourceId:
              "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/rg1/providers/Microsoft.Compute/virtualMachines/vm1",
          },
          azureLogAnalytics: {
            signalAssignments: [
              {
                signalDefinitions: ["B3P1X3e-FZtZ-4Ak-2VLHGQ-4m4-05DE-XNW5zW3P-46XY-DC3SSX"],
              },
            ],
            authenticationSetting: "B3P1X3e-FZtZ-4Ak-2VLHGQ-4m4-05DE-XNW5zW3P-46XY-DC3SSX",
            logAnalyticsWorkspaceResourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.OperationalInsights/workspaces/myworkspace",
          },
          azureMonitorWorkspace: {
            signalAssignments: [
              { signalDefinitions: ["sigdef2"] },
              { signalDefinitions: ["sigdef3"] },
            ],
            authenticationSetting: "B3P1X3e-FZtZ-4Ak-2VLHGQ-4m4-05DE-XNW5zW3P-46XY-DC3SSX",
            azureMonitorWorkspaceResourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.OperationalInsights/workspaces/myworkspace",
          },
          dependencies: { aggregationType: "WorstOf" },
        },
        alerts: {
          unhealthy: {
            severity: "Sev1",
            description: "Alert description",
            actionGroupIds: [
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Insights/actionGroups/myactiongroup",
            ],
          },
          degraded: {
            severity: "Sev4",
            description: "Alert description",
            actionGroupIds: [
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Insights/actionGroups/myactiongroup",
            ],
          },
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await entitiesCreateOrUpdate();
}

main().catch(console.error);
