// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieves the metric rules that are configured in the New Relic monitor resource
 *
 * @summary Retrieves the metric rules that are configured in the New Relic monitor resource
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_GetMetricRules_MaximumSet_Gen.json
 */
async function monitorsGetMetricRulesMaximumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgNewRelic";
  const monitorName = "fhcjxnxumkdlgpwanewtkdnyuz";
  const request = { userEmail: "ruxvg@xqkmdhrnoo.hlmbpm" };
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.getMetricRules(resourceGroupName, monitorName, request);
  console.log(result);
}

/**
 * This sample demonstrates how to Retrieves the metric rules that are configured in the New Relic monitor resource
 *
 * @summary Retrieves the metric rules that are configured in the New Relic monitor resource
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_GetMetricRules_MinimumSet_Gen.json
 */
async function monitorsGetMetricRulesMinimumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgNewRelic";
  const monitorName = "fhcjxnxumkdlgpwanewtkdnyuz";
  const request = { userEmail: "ruxvg@xqkmdhrnoo.hlmbpm" };
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.getMetricRules(resourceGroupName, monitorName, request);
  console.log(result);
}

async function main() {
  await monitorsGetMetricRulesMaximumSetGen();
  await monitorsGetMetricRulesMinimumSetGen();
}

main().catch(console.error);
