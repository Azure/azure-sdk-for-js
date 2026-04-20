// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update an metric alert definition.
 *
 * @summary create or update an metric alert definition.
 * x-ms-original-file: 2024-03-01-preview/createOrUpdateDynamicMetricAlertMultipleResource.json
 */
async function createOrUpdateADynamicAlertRuleForMultipleResources(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlerts.createOrUpdate(
    "gigtest",
    "MetricAlertOnMultipleResources",
    {
      location: "global",
      description: "This is the description of the rule1",
      actions: [
        {
          actionGroupId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/gigtest/providers/microsoft.insights/actiongroups/group2",
          webHookProperties: { key11: "value11", key12: "value12" },
        },
      ],
      autoMitigate: true,
      criteria: {
        allOf: [
          {
            name: "High_CPU_80",
            alertSensitivity: "Medium",
            criterionType: "DynamicThresholdCriterion",
            dimensions: [],
            failingPeriods: { minFailingPeriodsToAlert: 4, numberOfEvaluationPeriods: 4 },
            metricName: "Percentage CPU",
            metricNamespace: "microsoft.compute/virtualmachines",
            operator: "GreaterOrLessThan",
            timeAggregation: "Average",
          },
        ],
        odataType: "Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria",
      },
      enabled: true,
      evaluationFrequency: "PT1M",
      scopes: [
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/gigtest/providers/Microsoft.Compute/virtualMachines/gigwadme1",
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/gigtest/providers/Microsoft.Compute/virtualMachines/gigwadme2",
      ],
      severity: 3,
      targetResourceRegion: "southcentralus",
      targetResourceType: "Microsoft.Compute/virtualMachines",
      windowSize: "PT15M",
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update an metric alert definition.
 *
 * @summary create or update an metric alert definition.
 * x-ms-original-file: 2024-03-01-preview/createOrUpdateDynamicMetricAlertSingleResource.json
 */
async function createOrUpdateADynamicAlertRuleForSingleResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlerts.createOrUpdate("gigtest", "chiricutin", {
    location: "global",
    description: "This is the description of the rule1",
    actions: [
      {
        actionGroupId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/gigtest/providers/microsoft.insights/actiongroups/group2",
        webHookProperties: { key11: "value11", key12: "value12" },
      },
    ],
    autoMitigate: true,
    criteria: {
      allOf: [
        {
          name: "High_CPU_80",
          alertSensitivity: "Medium",
          criterionType: "DynamicThresholdCriterion",
          dimensions: [],
          failingPeriods: { minFailingPeriodsToAlert: 4, numberOfEvaluationPeriods: 4 },
          ignoreDataBefore: new Date("2019-04-04T21:00:00.000Z"),
          metricName: "Percentage CPU",
          metricNamespace: "microsoft.compute/virtualmachines",
          operator: "GreaterOrLessThan",
          timeAggregation: "Average",
        },
      ],
      odataType: "Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria",
    },
    enabled: true,
    evaluationFrequency: "PT1M",
    scopes: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/gigtest/providers/Microsoft.Compute/virtualMachines/gigwadme",
    ],
    severity: 3,
    windowSize: "PT15M",
    tags: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update an metric alert definition.
 *
 * @summary create or update an metric alert definition.
 * x-ms-original-file: 2024-03-01-preview/createOrUpdateMetricAlertMultipleResource.json
 */
async function createOrUpdateAnAlertRuleForMultipleResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlerts.createOrUpdate(
    "gigtest",
    "MetricAlertOnMultipleResources",
    {
      location: "global",
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
            metricName: "Percentage CPU",
            metricNamespace: "microsoft.compute/virtualmachines",
            operator: "GreaterThan",
            threshold: 80.5,
            timeAggregation: "Average",
          },
        ],
        odataType: "Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria",
      },
      enabled: true,
      evaluationFrequency: "PT1M",
      scopes: [
        "/subscriptions/14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7/resourceGroups/gigtest/providers/Microsoft.Compute/virtualMachines/gigwadme1",
        "/subscriptions/14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7/resourceGroups/gigtest/providers/Microsoft.Compute/virtualMachines/gigwadme2",
      ],
      severity: 3,
      targetResourceRegion: "southcentralus",
      targetResourceType: "Microsoft.Compute/virtualMachines",
      windowSize: "PT15M",
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update an metric alert definition.
 *
 * @summary create or update an metric alert definition.
 * x-ms-original-file: 2024-03-01-preview/createOrUpdateMetricAlertQuery.json
 */
async function createOrUpdateAQueryBasedAlertRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlerts.createOrUpdate("gigtest", "chiricutin", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/2f1a501a-6e1d-4f37-a445-462d7f8a563d/resourceGroups/AdisTest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/msi-test-euap":
          {},
      },
    },
    location: "eastus",
    description: "This is the description of the rule1",
    actionProperties: { "Email.Sujbect": "my custom email subject" },
    actions: [
      {
        actionGroupId:
          "/subscriptions/14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7/resourcegroups/gigtest/providers/microsoft.insights/actiongroups/group2",
      },
    ],
    criteria: {
      allOf: [
        {
          name: "Metric1",
          criterionType: "StaticThresholdCriterion",
          query: 'avg({"system.cpu.utilization"}) > 90',
        },
      ],
      failingPeriods: { for: "PT5M" },
      odataType: "Microsoft.Azure.Monitor.PromQLCriteria",
    },
    customProperties: { key11: "value11", key12: "value12" },
    enabled: true,
    evaluationFrequency: "PT1M",
    resolveConfiguration: { autoResolved: true, timeToResolve: "PT10M" },
    scopes: [
      "/subscriptions/14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7/resourceGroups/gigtest/providers/microsoft.monitor/accounts/gigwadme",
    ],
    severity: 3,
    tags: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update an metric alert definition.
 *
 * @summary create or update an metric alert definition.
 * x-ms-original-file: 2024-03-01-preview/createOrUpdateMetricAlertQueryDT.json
 */
async function createOrUpdateAQueryBasedAlertRuleWithDynamicThreshold(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlerts.createOrUpdate("gigtest", "chiricutin", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/2f1a501a-6e1d-4f37-a445-462d7f8a563d/resourceGroups/AdisTest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/msi-test-euap":
          {},
      },
    },
    location: "eastus",
    description: "This is the description of the rule1",
    actionProperties: { "Email.Sujbect": "my custom email subject" },
    actions: [
      {
        actionGroupId:
          "/subscriptions/14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7/resourcegroups/gigtest/providers/microsoft.insights/actiongroups/group2",
      },
    ],
    criteria: {
      allOf: [
        {
          name: "Metric1",
          alertSensitivity: "Medium",
          criterionType: "DynamicThresholdCriterion",
          ignoreDataBefore: new Date("2019-04-04T21:00:00.000Z"),
          operator: "LessThan",
          query: 'avg({"system.cpu.utilization"})',
        },
      ],
      failingPeriods: { for: "PT5M" },
      odataType: "Microsoft.Azure.Monitor.PromQLCriteria",
    },
    customProperties: { key11: "value11", key12: "value12" },
    enabled: true,
    evaluationFrequency: "PT1M",
    resolveConfiguration: { autoResolved: true, timeToResolve: "PT10M" },
    scopes: [
      "/subscriptions/14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7/resourceGroups/gigtest/providers/microsoft.monitor/accounts/gigwadme",
    ],
    severity: 3,
    tags: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update an metric alert definition.
 *
 * @summary create or update an metric alert definition.
 * x-ms-original-file: 2024-03-01-preview/createOrUpdateMetricAlertQueryMultiResource.json
 */
async function createOrUpdateAResourceCentricQueryBasedAlertRuleForMultipleResources(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlerts.createOrUpdate("gigtest", "chiricutin", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/2f1a501a-6e1d-4f37-a445-462d7f8a563d/resourceGroups/AdisTest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/msi-test-euap":
          {},
      },
    },
    location: "eastus",
    description: "This is the description of the rule1",
    actionProperties: { "Email.Sujbect": "my custom email subject" },
    actions: [
      {
        actionGroupId:
          "/subscriptions/14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7/resourcegroups/gigtest/providers/microsoft.insights/actiongroups/group2",
      },
    ],
    criteria: {
      allOf: [
        {
          name: "Metric1",
          criterionType: "StaticThresholdCriterion",
          query: 'avg({"system.cpu.utilization"}) by ("microsoft.resourceid") > 90',
        },
      ],
      failingPeriods: { for: "PT5M" },
      odataType: "Microsoft.Azure.Monitor.PromQLCriteria",
    },
    customProperties: { key11: "value11", key12: "value12" },
    enabled: true,
    evaluationFrequency: "PT1M",
    resolveConfiguration: { autoResolved: true, timeToResolve: "PT10M" },
    scopes: ["/subscriptions/14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7"],
    severity: 3,
    tags: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update an metric alert definition.
 *
 * @summary create or update an metric alert definition.
 * x-ms-original-file: 2024-03-01-preview/createOrUpdateMetricAlertQueryResourceCentric.json
 */
async function createOrUpdateAResourceCentricQueryBasedAlertRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlerts.createOrUpdate("gigtest", "chiricutin", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/2f1a501a-6e1d-4f37-a445-462d7f8a563d/resourceGroups/AdisTest/providers/Microsoft.ManagedIdentity/userAssignedIdentities/msi-test-euap":
          {},
      },
    },
    location: "eastus",
    description: "This is the description of the rule1",
    actionProperties: { "Email.Sujbect": "my custom email subject" },
    actions: [
      {
        actionGroupId:
          "/subscriptions/14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7/resourcegroups/gigtest/providers/microsoft.insights/actiongroups/group2",
      },
    ],
    criteria: {
      allOf: [
        {
          name: "Metric1",
          criterionType: "StaticThresholdCriterion",
          query: 'avg({"system.cpu.utilization"}) > 90',
        },
      ],
      failingPeriods: { for: "PT5M" },
      odataType: "Microsoft.Azure.Monitor.PromQLCriteria",
    },
    customProperties: { key11: "value11", key12: "value12" },
    enabled: true,
    evaluationFrequency: "PT1M",
    resolveConfiguration: { autoResolved: true, timeToResolve: "PT10M" },
    scopes: [
      "/subscriptions/14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7/resourceGroups/gigtest/providers/microsoft.compute/virtualMachines/myVmName",
    ],
    severity: 3,
    tags: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update an metric alert definition.
 *
 * @summary create or update an metric alert definition.
 * x-ms-original-file: 2024-03-01-preview/createOrUpdateMetricAlertResourceGroup.json
 */
async function createOrUpdateAnAlertRuleOnResourceGroupS(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlerts.createOrUpdate(
    "gigtest1",
    "MetricAlertAtResourceGroupLevel",
    {
      location: "global",
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
            metricName: "Percentage CPU",
            metricNamespace: "microsoft.compute/virtualmachines",
            operator: "GreaterThan",
            threshold: 80.5,
            timeAggregation: "Average",
          },
        ],
        odataType: "Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria",
      },
      enabled: true,
      evaluationFrequency: "PT1M",
      scopes: [
        "/subscriptions/14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7/resourceGroups/gigtest1",
        "/subscriptions/14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7/resourceGroups/gigtest2",
      ],
      severity: 3,
      targetResourceRegion: "southcentralus",
      targetResourceType: "Microsoft.Compute/virtualMachines",
      windowSize: "PT15M",
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update an metric alert definition.
 *
 * @summary create or update an metric alert definition.
 * x-ms-original-file: 2024-03-01-preview/createOrUpdateMetricAlertSingleResource.json
 */
async function createOrUpdateAnAlertRuleForSingleResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlerts.createOrUpdate("gigtest", "chiricutin", {
    location: "global",
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

/**
 * This sample demonstrates how to create or update an metric alert definition.
 *
 * @summary create or update an metric alert definition.
 * x-ms-original-file: 2024-03-01-preview/createOrUpdateMetricAlertSubscription.json
 */
async function createOrUpdateAnAlertRuleOnSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlerts.createOrUpdate(
    "gigtest",
    "MetricAlertAtSubscriptionLevel",
    {
      location: "global",
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
            metricName: "Percentage CPU",
            metricNamespace: "microsoft.compute/virtualmachines",
            operator: "GreaterThan",
            threshold: 80.5,
            timeAggregation: "Average",
          },
        ],
        odataType: "Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria",
      },
      enabled: true,
      evaluationFrequency: "PT1M",
      scopes: ["/subscriptions/14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7"],
      severity: 3,
      targetResourceRegion: "southcentralus",
      targetResourceType: "Microsoft.Compute/virtualMachines",
      windowSize: "PT15M",
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update an metric alert definition.
 *
 * @summary create or update an metric alert definition.
 * x-ms-original-file: 2024-03-01-preview/createOrUpdateMetricAlertWithDimensions.json
 */
async function createOrUpdateAnAlertRulesWithDimensions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlerts.createOrUpdate(
    "gigtest",
    "MetricAlertOnMultipleDimensions",
    {
      location: "global",
      description: "This is the description of the rule1",
      actions: [
        {
          actionGroupId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/gigtest/providers/microsoft.insights/actiongroups/group2",
          webHookProperties: { key11: "value11", key12: "value12" },
        },
      ],
      autoMitigate: true,
      criteria: {
        allOf: [
          {
            name: "Metric1",
            criterionType: "StaticThresholdCriterion",
            dimensions: [
              { name: "ActivityName", operator: "Include", values: ["*"] },
              { name: "StatusCode", operator: "Include", values: ["200"] },
            ],
            metricName: "Availability",
            metricNamespace: "Microsoft.KeyVault/vaults",
            operator: "GreaterThan",
            threshold: 55,
            timeAggregation: "Average",
          },
        ],
        odataType: "Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria",
      },
      enabled: true,
      evaluationFrequency: "PT1H",
      scopes: [
        "/subscriptions/14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7/resourceGroups/gigtest/providers/Microsoft.KeyVault/vaults/keyVaultResource",
      ],
      severity: 3,
      windowSize: "P1D",
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update an metric alert definition.
 *
 * @summary create or update an metric alert definition.
 * x-ms-original-file: 2024-03-01-preview/createOrUpdateWebTestMetricAlert.json
 */
async function createOrUpdateAWebTestAlertRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789101";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlerts.createOrUpdate("rg-example", "webtest-name-example", {
    location: "global",
    description: 'Automatically created alert rule for availability test "component-example" a',
    actions: [],
    criteria: {
      componentId:
        "/subscriptions/12345678-1234-1234-1234-123456789101/resourcegroups/rg-example/providers/microsoft.insights/components/webtest-name-example",
      failedLocationCount: 2,
      odataType: "Microsoft.Azure.Monitor.WebtestLocationAvailabilityCriteria",
      webTestId:
        "/subscriptions/12345678-1234-1234-1234-123456789101/resourcegroups/rg-example/providers/microsoft.insights/webtests/component-example",
    },
    enabled: true,
    evaluationFrequency: "PT1M",
    scopes: [
      "/subscriptions/12345678-1234-1234-1234-123456789101/resourcegroups/rg-example/providers/microsoft.insights/webtests/component-example",
      "/subscriptions/12345678-1234-1234-1234-123456789101/resourcegroups/rg-example/providers/microsoft.insights/components/webtest-name-example",
    ],
    severity: 4,
    windowSize: "PT15M",
    tags: {
      "hidden-link:/subscriptions/12345678-1234-1234-1234-123456789101/resourcegroups/rg-example/providers/microsoft.insights/components/webtest-name-example":
        "Resource",
      "hidden-link:/subscriptions/12345678-1234-1234-1234-123456789101/resourcegroups/rg-example/providers/microsoft.insights/webtests/component-example":
        "Resource",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateADynamicAlertRuleForMultipleResources();
  await createOrUpdateADynamicAlertRuleForSingleResource();
  await createOrUpdateAnAlertRuleForMultipleResource();
  await createOrUpdateAQueryBasedAlertRule();
  await createOrUpdateAQueryBasedAlertRuleWithDynamicThreshold();
  await createOrUpdateAResourceCentricQueryBasedAlertRuleForMultipleResources();
  await createOrUpdateAResourceCentricQueryBasedAlertRule();
  await createOrUpdateAnAlertRuleOnResourceGroupS();
  await createOrUpdateAnAlertRuleForSingleResource();
  await createOrUpdateAnAlertRuleOnSubscription();
  await createOrUpdateAnAlertRulesWithDimensions();
  await createOrUpdateAWebTestAlertRule();
}

main().catch(console.error);
