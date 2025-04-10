/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  AutoscaleSettingResourcePatch,
  MonitorClient,
} from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates an existing AutoscaleSettingsResource. To update other fields use the CreateOrUpdate method.
 *
 * @summary Updates an existing AutoscaleSettingsResource. To update other fields use the CreateOrUpdate method.
 * x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/stable/2022-10-01/examples/patchAutoscaleSetting.json
 */
async function patchAnAutoscaleSetting(): Promise<void> {
  const subscriptionId =
    process.env["MONITOR_SUBSCRIPTION_ID"] ||
    "b67f7fec-69fc-4974-9099-a26bd6ffeda3";
  const resourceGroupName =
    process.env["MONITOR_RESOURCE_GROUP"] || "TestingMetricsScaleSet";
  const autoscaleSettingName = "MySetting";
  const autoscaleSettingResource: AutoscaleSettingResourcePatch = {
    enabled: true,
    notifications: [
      {
        email: {
          customEmails: ["gu@ms.com", "ge@ns.net"],
          sendToSubscriptionAdministrator: true,
          sendToSubscriptionCoAdministrators: true,
        },
        operation: "Scale",
        webhooks: [{ properties: {}, serviceUri: "http://myservice.com" }],
      },
    ],
    predictiveAutoscalePolicy: { scaleMode: "Enabled" },
    profiles: [
      {
        name: "adios",
        capacity: { default: "1", maximum: "10", minimum: "1" },
        fixedDate: {
          end: new Date("2015-03-05T14:30:00Z"),
          start: new Date("2015-03-05T14:00:00Z"),
          timeZone: "UTC",
        },
        rules: [
          {
            metricTrigger: {
              dividePerInstance: false,
              metricName: "Percentage CPU",
              metricResourceUri:
                "/subscriptions/b67f7fec-69fc-4974-9099-a26bd6ffeda3/resourceGroups/TestingMetricsScaleSet/providers/Microsoft.Compute/virtualMachineScaleSets/testingsc",
              operator: "GreaterThan",
              statistic: "Average",
              threshold: 10,
              timeAggregation: "Average",
              timeGrain: "PT1M",
              timeWindow: "PT5M",
            },
            scaleAction: {
              type: "ChangeCount",
              cooldown: "PT5M",
              direction: "Increase",
              value: "1",
            },
          },
          {
            metricTrigger: {
              dividePerInstance: false,
              metricName: "Percentage CPU",
              metricResourceUri:
                "/subscriptions/b67f7fec-69fc-4974-9099-a26bd6ffeda3/resourceGroups/TestingMetricsScaleSet/providers/Microsoft.Compute/virtualMachineScaleSets/testingsc",
              operator: "GreaterThan",
              statistic: "Average",
              threshold: 15,
              timeAggregation: "Average",
              timeGrain: "PT2M",
              timeWindow: "PT5M",
            },
            scaleAction: {
              type: "ChangeCount",
              cooldown: "PT6M",
              direction: "Decrease",
              value: "2",
            },
          },
        ],
      },
      {
        name: "saludos",
        capacity: { default: "1", maximum: "10", minimum: "1" },
        recurrence: {
          frequency: "Week",
          schedule: { days: ["1"], hours: [5], minutes: [15], timeZone: "UTC" },
        },
        rules: [
          {
            metricTrigger: {
              dividePerInstance: false,
              metricName: "Percentage CPU",
              metricResourceUri:
                "/subscriptions/b67f7fec-69fc-4974-9099-a26bd6ffeda3/resourceGroups/TestingMetricsScaleSet/providers/Microsoft.Compute/virtualMachineScaleSets/testingsc",
              operator: "GreaterThan",
              statistic: "Average",
              threshold: 10,
              timeAggregation: "Average",
              timeGrain: "PT1M",
              timeWindow: "PT5M",
            },
            scaleAction: {
              type: "ChangeCount",
              cooldown: "PT5M",
              direction: "Increase",
              value: "1",
            },
          },
          {
            metricTrigger: {
              dividePerInstance: false,
              metricName: "Percentage CPU",
              metricResourceUri:
                "/subscriptions/b67f7fec-69fc-4974-9099-a26bd6ffeda3/resourceGroups/TestingMetricsScaleSet/providers/Microsoft.Compute/virtualMachineScaleSets/testingsc",
              operator: "GreaterThan",
              statistic: "Average",
              threshold: 15,
              timeAggregation: "Average",
              timeGrain: "PT2M",
              timeWindow: "PT5M",
            },
            scaleAction: {
              type: "ChangeCount",
              cooldown: "PT6M",
              direction: "Decrease",
              value: "2",
            },
          },
        ],
      },
    ],
    tags: { key1: "value1" },
    targetResourceUri:
      "/subscriptions/b67f7fec-69fc-4974-9099-a26bd6ffeda3/resourceGroups/TestingMetricsScaleSet/providers/Microsoft.Compute/virtualMachineScaleSets/testingsc",
  };
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.autoscaleSettings.update(
    resourceGroupName,
    autoscaleSettingName,
    autoscaleSettingResource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  patchAnAutoscaleSetting();
}

main().catch(console.error);
