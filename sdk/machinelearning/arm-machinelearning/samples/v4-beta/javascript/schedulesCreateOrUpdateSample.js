// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update schedule.
 *
 * @summary create or update schedule.
 * x-ms-original-file: 2025-12-01/Schedule/createOrUpdate.json
 */
async function createOrUpdateSchedule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.schedules.createOrUpdate("test-rg", "my-aml-workspace", "string", {
    properties: {
      description: "string",
      action: {
        actionType: "InvokeBatchEndpoint",
        endpointInvocationDefinition: { "9965593e-526f-4b89-bb36-761138cf2794": null },
      },
      displayName: "string",
      isEnabled: false,
      properties: { string: "string" },
      tags: { string: "string" },
      trigger: {
        endTime: "string",
        expression: "string",
        startTime: "string",
        timeZone: "string",
        triggerType: "Cron",
      },
    },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateSchedule();
}

main().catch(console.error);
