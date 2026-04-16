// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieves the details of the tag rules for a specific New Relic monitor resource, providing insight into its setup and status
 *
 * @summary Retrieves the details of the tag rules for a specific New Relic monitor resource, providing insight into its setup and status
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/TagRules_Get_MaximumSet_Gen.json
 */
async function tagRulesGetMaximumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgopenapi";
  const monitorName = "ipxmlcbonyxtolzejcjshkmlron";
  const ruleSetName = "bxcantgzggsepbhqmedjqyrqeezmfb";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.tagRules.get(resourceGroupName, monitorName, ruleSetName);
  console.log(result);
}

/**
 * This sample demonstrates how to Retrieves the details of the tag rules for a specific New Relic monitor resource, providing insight into its setup and status
 *
 * @summary Retrieves the details of the tag rules for a specific New Relic monitor resource, providing insight into its setup and status
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/TagRules_Get_MinimumSet_Gen.json
 */
async function tagRulesGetMinimumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgopenapi";
  const monitorName = "ipxmlcbonyxtolzejcjshkmlron";
  const ruleSetName = "bxcantgzggsepbhqmedjqyrqeezmfb";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.tagRules.get(resourceGroupName, monitorName, ruleSetName);
  console.log(result);
}

async function main() {
  await tagRulesGetMaximumSetGen();
  await tagRulesGetMinimumSetGen();
}

main().catch(console.error);
