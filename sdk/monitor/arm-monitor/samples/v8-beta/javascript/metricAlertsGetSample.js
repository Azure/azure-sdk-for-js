// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve an alert rule definition.
 *
 * @summary retrieve an alert rule definition.
 * x-ms-original-file: 2024-03-01-preview/getDynamicMetricAlertMultipleResource.json
 */
async function getADynamicAlertRuleForMultipleResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlerts.get("gigtest", "MetricAlertOnMultipleResources");
  console.log(result);
}

/**
 * This sample demonstrates how to retrieve an alert rule definition.
 *
 * @summary retrieve an alert rule definition.
 * x-ms-original-file: 2024-03-01-preview/getDynamicMetricAlertSingleResource.json
 */
async function getADynamicAlertRuleForSingleResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlerts.get("gigtest", "chiricutin");
  console.log(result);
}

/**
 * This sample demonstrates how to retrieve an alert rule definition.
 *
 * @summary retrieve an alert rule definition.
 * x-ms-original-file: 2024-03-01-preview/getMetricAlertMultipleResource.json
 */
async function getAnAlertRuleForMultipleResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlerts.get("gigtest", "MetricAlertOnMultipleResources");
  console.log(result);
}

/**
 * This sample demonstrates how to retrieve an alert rule definition.
 *
 * @summary retrieve an alert rule definition.
 * x-ms-original-file: 2024-03-01-preview/getMetricAlertQuery.json
 */
async function getAQueryBasedAlertRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlerts.get("gigtest", "chiricutin");
  console.log(result);
}

/**
 * This sample demonstrates how to retrieve an alert rule definition.
 *
 * @summary retrieve an alert rule definition.
 * x-ms-original-file: 2024-03-01-preview/getMetricAlertResourceGroup.json
 */
async function getAnAlertRuleOnResourceGroupS() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlerts.get("gigtest1", "MetricAlertAtResourceGroupLevel");
  console.log(result);
}

/**
 * This sample demonstrates how to retrieve an alert rule definition.
 *
 * @summary retrieve an alert rule definition.
 * x-ms-original-file: 2024-03-01-preview/getMetricAlertSingleResource.json
 */
async function getAnAlertRuleForSingleResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlerts.get("gigtest", "chiricutin");
  console.log(result);
}

/**
 * This sample demonstrates how to retrieve an alert rule definition.
 *
 * @summary retrieve an alert rule definition.
 * x-ms-original-file: 2024-03-01-preview/getMetricAlertSubscription.json
 */
async function getAnAlertRuleOnSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlerts.get("gigtest", "MetricAlertAtSubscriptionLevel");
  console.log(result);
}

/**
 * This sample demonstrates how to retrieve an alert rule definition.
 *
 * @summary retrieve an alert rule definition.
 * x-ms-original-file: 2024-03-01-preview/getWebTestMetricAlert.json
 */
async function getAWebTestAlertRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789101";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricAlerts.get("rg-example", "webtest-name-example");
  console.log(result);
}

async function main() {
  await getADynamicAlertRuleForMultipleResources();
  await getADynamicAlertRuleForSingleResource();
  await getAnAlertRuleForMultipleResources();
  await getAQueryBasedAlertRule();
  await getAnAlertRuleOnResourceGroupS();
  await getAnAlertRuleForSingleResource();
  await getAnAlertRuleOnSubscription();
  await getAWebTestAlertRule();
}

main().catch(console.error);
