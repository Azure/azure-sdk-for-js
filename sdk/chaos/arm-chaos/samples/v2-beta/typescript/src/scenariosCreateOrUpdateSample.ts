// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a scenario.
 *
 * @summary create or update a scenario.
 * x-ms-original-file: 2026-05-01-preview/Scenarios_CreateOrUpdate.json
 */
async function createOrUpdateAScenario(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.scenarios.createOrUpdate(
    "exampleRG",
    "exampleWorkspace",
    "zoneDownScenario",
    {
      properties: {
        description:
          "Induces an outage of all discovered VM and VMSS instances in the target zone with an option to invoke custom scripted actions using Automation Runbooks. Additionally, it forces failover of discovered Redis instances to simulate backend zonal outage.",
        parameters: [
          {
            name: "duration",
            type: "string",
            default: "PT15M",
            required: false,
            description: "The duration of the outage scenario.",
          },
          {
            name: "customRunbook1ResourceId",
            type: "string",
            required: false,
            description:
              "Optional custom runbook 1 resource ID. If not provided, this action will be skipped.",
          },
          {
            name: "customRunbook1ParametersJson",
            type: "string",
            required: false,
            default: "{}",
            description: "Optional custom runbook 1 parameters in JSON format.",
          },
        ],
        actions: [
          {
            name: "vmssZoneDown",
            actionId: "urn:csci:microsoft:compute:shutdown/1.0.0",
            description: "Force shutdown VMSS instances in target zone",
            duration: "%%{parameters.duration}%%",
            parameters: [{ key: "zones", value: "%%{filters.zones}%%" }],
          },
          {
            name: "vmZoneDown",
            actionId: "urn:csci:microsoft:compute:shutdown/1.0.0",
            description: "Force shutdown VM instances in target zone",
            duration: "%%{parameters.duration}%%",
            parameters: [{ key: "zones", value: "%%{filters.zones}%%" }],
          },
          {
            name: "redisFailover",
            actionId: "urn:csci:microsoft:azureClusteredCacheForRedis:Reboot/1.0.0",
            description: "Force failover of Redis instances to simulate backend zonal outage",
            duration: "PT5M",
            parameters: [{ key: "RebootType", value: "PrimaryNode" }],
          },
          {
            name: "custom-runbook-1",
            actionId: "urn:csci:microsoft:Automation:StartRunbook/1.0.0",
            description: "Custom Runbook 1",
            duration: "PT30M",
            parameters: [
              { key: "RunbookParameters", value: "%%{parameters.customRunbook1ParametersJson}%%" },
            ],
            externalResource: {
              resourceId:
                "/subscriptions/6b052e15-03d3-4f17-b2e1-be7f07588291/resourceGroups/exampleRG/providers/Microsoft.Automation/automationAccounts/exampleAutomationAccount/runbooks/exampleRunbook",
            },
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAScenario();
}

main().catch(console.error);
