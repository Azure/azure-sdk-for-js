// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a new Activity Log Alert rule or update an existing one.
 *
 * @summary create a new Activity Log Alert rule or update an existing one.
 * x-ms-original-file: 2023-01-01-preview/ActivityLogAlertRule_CreateOrUpdate.json
 */
async function createOrUpdateAnActivityLogAlertRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "187f412d-1758-44d9-b052-169e2564721d";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.activityLogAlerts.createOrUpdate(
    "MyResourceGroup",
    "SampleActivityLogAlertRule",
    {
      location: "Global",
      description: "Description of sample Activity Log Alert rule.",
      actions: {
        actionGroups: [
          {
            actionGroupId:
              "/subscriptions/187f412d-1758-44d9-b052-169e2564721d/resourceGroups/MyResourceGroup/providers/Microsoft.Insights/actionGroups/SampleActionGroup",
            actionProperties: { "Email.Title": "my email title" },
            webhookProperties: { sampleWebhookProperty: "SamplePropertyValue" },
          },
        ],
      },
      condition: {
        allOf: [
          { equals: "Administrative", field: "category" },
          { equals: "Error", field: "level" },
        ],
      },
      enabled: true,
      scopes: ["/subscriptions/187f412d-1758-44d9-b052-169e2564721d"],
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a new Activity Log Alert rule or update an existing one.
 *
 * @summary create a new Activity Log Alert rule or update an existing one.
 * x-ms-original-file: 2023-01-01-preview/ActivityLogAlertRule_CreateOrUpdateRuleWithAnyOfCondition.json
 */
async function createOrUpdateAnActivityLogAlertRuleWithAnyOfCondition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "187f412d-1758-44d9-b052-169e2564721d";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.activityLogAlerts.createOrUpdate(
    "MyResourceGroup",
    "SampleActivityLogAlertRuleWithAnyOfCondition",
    {
      location: "Global",
      description: "Description of sample Activity Log Alert rule with 'anyOf' condition.",
      actions: {
        actionGroups: [
          {
            actionGroupId:
              "/subscriptions/187f412d-1758-44d9-b052-169e2564721d/resourceGroups/MyResourceGroup/providers/Microsoft.Insights/actionGroups/SampleActionGroup",
            actionProperties: { "Email.Title": "my email title" },
            webhookProperties: { sampleWebhookProperty: "SamplePropertyValue" },
          },
        ],
      },
      condition: {
        allOf: [
          { equals: "ServiceHealth", field: "category" },
          {
            anyOf: [
              { equals: "Incident", field: "properties.incidentType" },
              { equals: "Maintenance", field: "properties.incidentType" },
            ],
          },
        ],
      },
      enabled: true,
      scopes: ["subscriptions/187f412d-1758-44d9-b052-169e2564721d"],
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a new Activity Log Alert rule or update an existing one.
 *
 * @summary create a new Activity Log Alert rule or update an existing one.
 * x-ms-original-file: 2023-01-01-preview/ActivityLogAlertRule_CreateOrUpdateRuleWithContainsAny.json
 */
async function createOrUpdateAnActivityLogAlertRuleWithContainsAny(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "187f412d-1758-44d9-b052-169e2564721d";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.activityLogAlerts.createOrUpdate(
    "MyResourceGroup",
    "SampleActivityLogAlertRuleWithContainsAny",
    {
      location: "Global",
      description: "Description of sample Activity Log Alert rule with 'containsAny'.",
      actions: {
        actionGroups: [
          {
            actionGroupId:
              "/subscriptions/187f412d-1758-44d9-b052-169e2564721d/resourceGroups/MyResourceGroup/providers/Microsoft.Insights/actionGroups/SampleActionGroup",
            actionProperties: { "Email.Title": "my email title" },
            webhookProperties: { sampleWebhookProperty: "SamplePropertyValue" },
          },
        ],
      },
      condition: {
        allOf: [
          { equals: "ServiceHealth", field: "category" },
          {
            containsAny: ["North Europe", "West Europe"],
            field: "properties.impactedServices[*].ImpactedRegions[*].RegionName",
          },
        ],
      },
      enabled: true,
      scopes: ["subscriptions/187f412d-1758-44d9-b052-169e2564721d"],
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a new Activity Log Alert rule or update an existing one.
 *
 * @summary create a new Activity Log Alert rule or update an existing one.
 * x-ms-original-file: 2023-01-01-preview/ActivityLogAlertRule_CreateOrUpdateTenantLevelServiceHealthRule.json
 */
async function createOrUpdateAnActivityLogAlertRuleForTenantLevelEvents(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "187f412d-1758-44d9-b052-169e2564721d";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.activityLogAlerts.createOrUpdate(
    "MyResourceGroup",
    "SampleActivityLogAlertSHRuleOnTenantLevel",
    {
      location: "Global",
      description:
        "Description of sample Activity Log Alert service health rule on tenant level events.",
      actions: {
        actionGroups: [
          {
            actionGroupId:
              "/subscriptions/187f412d-1758-44d9-b052-169e2564721d/resourceGroups/MyResourceGroup/providers/Microsoft.Insights/actionGroups/SampleActionGroup",
            actionProperties: { "Email.Title": "my email title" },
            webhookProperties: { sampleWebhookProperty: "SamplePropertyValue" },
          },
        ],
      },
      condition: { allOf: [{ equals: "ServiceHealth", field: "category" }] },
      enabled: true,
      tenantScope: "72f988bf-86f1-41af-91ab-2d7cd011db47",
      tags: {},
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAnActivityLogAlertRule();
  await createOrUpdateAnActivityLogAlertRuleWithAnyOfCondition();
  await createOrUpdateAnActivityLogAlertRuleWithContainsAny();
  await createOrUpdateAnActivityLogAlertRuleForTenantLevelEvents();
}

main().catch(console.error);
