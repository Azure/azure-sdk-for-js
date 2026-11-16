// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a scenario.
 *
 * @summary create or update a scenario.
 * x-ms-original-file: 2026-11-01/Scenarios_CreateOrUpdate.json
 */
async function createOrUpdateAScenario() {
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
            name: "logicalZone",
            type: "string",
            required: true,
            description:
              "Logical availability-zone label to test in each target subscription, for example 1.",
          },
          {
            name: "location",
            type: "string",
            required: true,
            description:
              "Azure location name in which to test the logical zone, for example eastus.",
          },
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
            actionId: "microsoft-compute-shutdown/2.0",
            description: "Force shutdown VMSS instances in target zone",
            duration: "%%{parameters.duration}%%",
            parameters: [],
            selectors: [
              { name: "logicalZone", value: "%%{parameters.logicalZone}%%" },
              { name: "location", value: "%%{parameters.location}%%" },
            ],
          },
          {
            name: "vmZoneDown",
            actionId: "microsoft-compute-shutdown/2.0",
            description: "Force shutdown VM instances in target zone",
            duration: "%%{parameters.duration}%%",
            parameters: [],
            selectors: [
              { name: "logicalZone", value: "%%{parameters.logicalZone}%%" },
              { name: "location", value: "%%{parameters.location}%%" },
            ],
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

/**
 * This sample demonstrates how to create or update a scenario.
 *
 * @summary create or update a scenario.
 * x-ms-original-file: 2026-11-01/Scenarios_CreateOrUpdate_CreateOnly.json
 */
async function createAScenarioOnlyWhenAbsentOrReturn412WhenItAlreadyExists() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.scenarios.createOrUpdate(
    "exampleRG",
    "exampleWorkspace",
    "exampleScenario",
    {
      properties: {
        parameters: [],
        actions: [
          {
            name: "restart",
            actionId: "microsoft-compute-shutdown/2.0",
            duration: "PT5M",
            selectors: [
              { name: "logicalZone", value: "1" },
              { name: "location", value: "eastus" },
            ],
          },
        ],
      },
    },
    { ifNoneMatch: "*" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a scenario.
 *
 * @summary create or update a scenario.
 * x-ms-original-file: 2026-11-01/Scenarios_CreateOrUpdate_From_Template.json
 */
async function createAScenarioFromABuiltInScenarioTemplateVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.scenarios.createOrUpdate(
    "exampleRG",
    "exampleWorkspace",
    "computeZoneDownScenario",
    {
      properties: {
        createdFrom: "/providers/Microsoft.Chaos/scenarioTemplates/ComputeZoneDown/versions/1.2",
        description:
          "Simulates a datacenter/availability zone failure by shutting down VMSS instances and standalone VMs in the target zone. Zone failures account for ~25% of all cloud incidents — this scenario validates your application's cross-zone resilience.",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a scenario.
 *
 * @summary create or update a scenario.
 * x-ms-original-file: 2026-11-01/Scenarios_CreateOrUpdate_UpdateOnly.json
 */
async function updateAScenarioOnlyWhenPresentOrReturn412WhenItDoesNotExist() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.scenarios.createOrUpdate(
    "exampleRG",
    "exampleWorkspace",
    "exampleScenario",
    {
      properties: {
        parameters: [],
        actions: [
          {
            name: "restart",
            actionId: "microsoft-compute-shutdown/2.0",
            duration: "PT5M",
            selectors: [
              { name: "logicalZone", value: "1" },
              { name: "location", value: "eastus" },
            ],
          },
        ],
      },
    },
    { ifMatch: "*" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a scenario.
 *
 * @summary create or update a scenario.
 * x-ms-original-file: 2026-11-01/Scenarios_CreateOrUpdate_With_Failure_Behavior.json
 */
async function createOrUpdateAScenarioThatContinuesPastSuppressedActionFailures() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.scenarios.createOrUpdate(
    "exampleRG",
    "exampleWorkspace",
    "bestEffortProbeScenario",
    {
      properties: {
        description:
          "Probes dependencies best-effort, then runs a critical shutdown whose failure must stop the run.",
        failureBehavior: "Continue",
        actions: [
          {
            name: "dependencyProbe",
            actionId: "urn:csci:microsoft:agent:networkDisconnect/1.0.0",
            description:
              "Best-effort dependency probe. Inherits the scenario-level Continue behavior, so a failure here does not fail the run.",
            duration: "PT5M",
          },
          {
            name: "criticalShutdown",
            actionId: "urn:csci:microsoft:compute:shutdown/1.0.0",
            description:
              "Critical shutdown. Overrides the scenario default so that a failure stops the run.",
            duration: "PT10M",
            failureBehavior: "Stop",
            runAfter: {
              behavior: "All",
              items: [
                { type: "Action", name: "dependencyProbe", onActionLifecycle: "AnyTerminal" },
              ],
            },
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAScenario();
  await createAScenarioOnlyWhenAbsentOrReturn412WhenItAlreadyExists();
  await createAScenarioFromABuiltInScenarioTemplateVersion();
  await updateAScenarioOnlyWhenPresentOrReturn412WhenItDoesNotExist();
  await createOrUpdateAScenarioThatContinuesPastSuppressedActionFailures();
}

main().catch(console.error);
