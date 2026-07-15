// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an metric alert definition.
 *
 * @summary update an metric alert definition.
 * x-ms-original-file: 2024-03-01-preview/UpdateMetricAlert.json
 */
async function createOrUpdateAnAlertRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlerts.update("gigtest", "chiricutin", {
    description: "This is the description of the rule1",
    actions: [
      {
        actionGroupId:
          "/subscriptions/14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7/resourcegroups/gigtest/providers/microsoft.insights/actiongroups/group2",
        webHookProperties: { key11: "value11", key12: "value12" },
      },
    ],
    autoMitigate: true,
    criteria: {
      allOf: [
        {
          name: "High_CPU_80",
          criterionType: "StaticThresholdCriterion",
          dimensions: [],
          metricName: "\\Processor(_Total)\\% Processor Time",
          operator: "GreaterThan",
          threshold: 80.5,
          timeAggregation: "Average",
        },
      ],
      odataType: "Microsoft.Azure.Monitor.SingleResourceMultipleMetricCriteria",
    },
    enabled: true,
    evaluationFrequency: "PT1M",
    scopes: [
      "/subscriptions/14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7/resourceGroups/gigtest/providers/Microsoft.Compute/virtualMachines/gigwadme",
    ],
    severity: 3,
    windowSize: "PT15M",
    tags: {},
  });
  console.log(result);
}

async function main() {
  await createOrUpdateAnAlertRule();
}

main().catch(console.error);
