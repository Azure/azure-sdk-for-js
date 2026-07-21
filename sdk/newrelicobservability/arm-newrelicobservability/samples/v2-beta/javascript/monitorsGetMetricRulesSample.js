// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the metric rules that are configured in the New Relic monitor resource
 *
 * @summary retrieves the metric rules that are configured in the New Relic monitor resource
 * x-ms-original-file: 2025-05-01-preview/Monitors_GetMetricRules_MaximumSet_Gen.json
 */
async function monitorsGetMetricRulesMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.getMetricRules("rgNewRelic", "fhcjxnxumkdlgpwanewtkdnyuz", {
    userEmail: "ruxvg@xqkmdhrnoo.hlmbpm",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves the metric rules that are configured in the New Relic monitor resource
 *
 * @summary retrieves the metric rules that are configured in the New Relic monitor resource
 * x-ms-original-file: 2025-05-01-preview/Monitors_GetMetricRules_MinimumSet_Gen.json
 */
async function monitorsGetMetricRulesMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.getMetricRules("rgNewRelic", "fhcjxnxumkdlgpwanewtkdnyuz", {
    userEmail: "ruxvg@xqkmdhrnoo.hlmbpm",
  });
  console.log(result);
}

async function main() {
  await monitorsGetMetricRulesMaximumSetGen();
  await monitorsGetMetricRulesMinimumSetGen();
}

main().catch(console.error);
