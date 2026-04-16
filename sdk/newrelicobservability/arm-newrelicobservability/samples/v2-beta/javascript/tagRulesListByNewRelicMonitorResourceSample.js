// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all tag rules associated with a specific New Relic monitor resource, helping you manage and audit the rules that control resource monitoring
 *
 * @summary Lists all tag rules associated with a specific New Relic monitor resource, helping you manage and audit the rules that control resource monitoring
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/TagRules_ListByNewRelicMonitorResource_MaximumSet_Gen.json
 */
async function tagRulesListByNewRelicMonitorResourceMaximumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgopenapi";
  const monitorName = "ipxmlcbonyxtolzejcjshkmlron";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tagRules.listByNewRelicMonitorResource(
    resourceGroupName,
    monitorName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists all tag rules associated with a specific New Relic monitor resource, helping you manage and audit the rules that control resource monitoring
 *
 * @summary Lists all tag rules associated with a specific New Relic monitor resource, helping you manage and audit the rules that control resource monitoring
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/TagRules_ListByNewRelicMonitorResource_MinimumSet_Gen.json
 */
async function tagRulesListByNewRelicMonitorResourceMinimumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgopenapi";
  const monitorName = "ipxmlcbonyxtolzejcjshkmlron";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tagRules.listByNewRelicMonitorResource(
    resourceGroupName,
    monitorName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await tagRulesListByNewRelicMonitorResourceMaximumSetGen();
  await tagRulesListByNewRelicMonitorResourceMinimumSetGen();
}

main().catch(console.error);
