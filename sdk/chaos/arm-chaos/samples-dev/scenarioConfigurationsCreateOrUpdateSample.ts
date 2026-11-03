// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a scenario definition.
 *
 * @summary create or update a scenario definition.
 * x-ms-original-file: 2026-08-01-preview/ScenarioConfigurations_CreateOrUpdate.json
 */
async function createOrUpdateAScenarioConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.scenarioConfigurations.createOrUpdate(
    "exampleRG",
    "exampleWorkspace",
    "12345678-1234-1234-1234-123456789012",
    "config-5678-9012-3456-789012345678",
    {
      properties: {
        scenarioId:
          "/subscriptions/6b052e15-03d3-4f17-b2e1-be7f07588291/resourceGroups/exampleRG/providers/Microsoft.Chaos/workspaces/exampleWorkspace/scenarios/12345678-1234-1234-1234-123456789012",
        parameters: [
          { key: "duration", value: "PT10M" },
          {
            key: "targetResourceIds",
            value:
              '["/subscriptions/6b052e15-03d3-4f17-b2e1-be7f07588291/resourceGroups/exampleRG/providers/Microsoft.Compute/virtualMachines/vm1","/subscriptions/6b052e15-03d3-4f17-b2e1-be7f07588291/resourceGroups/exampleRG/providers/Microsoft.Compute/virtualMachines/vm2"]',
          },
        ],
        resourceTargeting: {
          include: { locations: ["eastus"], zones: ["1"] },
          exclude: {
            resources: [
              "/subscriptions/6b052e15-03d3-4f17-b2e1-be7f07588291/resourceGroups/exampleRG/providers/Microsoft.Compute/virtualMachines/protectedVM",
            ],
            tags: [{ key: "environment", value: "production" }],
            types: ["Microsoft.Compute/virtualMachineScaleSets"],
          },
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a scenario definition.
 *
 * @summary create or update a scenario definition.
 * x-ms-original-file: 2026-08-01-preview/ScenarioConfigurations_CreateOrUpdate_With_Physical_Zones.json
 */
async function createOrUpdateAScenarioConfigurationWithPhysicalZoneTargeting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.scenarioConfigurations.createOrUpdate(
    "exampleRG",
    "exampleWorkspace",
    "12345678-1234-1234-1234-123456789012",
    "config-physical-zone",
    {
      properties: {
        scenarioId:
          "/subscriptions/6b052e15-03d3-4f17-b2e1-be7f07588291/resourceGroups/exampleRG/providers/Microsoft.Chaos/workspaces/exampleWorkspace/scenarios/12345678-1234-1234-1234-123456789012",
        parameters: [{ key: "duration", value: "PT10M" }],
        resourceTargeting: {
          include: { physicalZones: ["westus2-az1"] },
          exclude: {
            resources: [
              "/subscriptions/6b052e15-03d3-4f17-b2e1-be7f07588291/resourceGroups/exampleRG/providers/Microsoft.Compute/virtualMachines/protectedVM",
            ],
          },
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAScenarioConfiguration();
  await createOrUpdateAScenarioConfigurationWithPhysicalZoneTargeting();
}

main().catch(console.error);
