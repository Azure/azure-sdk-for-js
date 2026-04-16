// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates the tag rules for a specific New Relic monitor resource, allowing you to modify the rules that control which Azure resources are monitored
 *
 * @summary Updates the tag rules for a specific New Relic monitor resource, allowing you to modify the rules that control which Azure resources are monitored
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/TagRules_Update_MaximumSet_Gen.json
 */
async function tagRulesUpdateMaximumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgopenapi";
  const monitorName = "ipxmlcbonyxtolzejcjshkmlron";
  const ruleSetName = "bxcantgzggsepbhqmedjqyrqeezmfb";
  const properties = {
    logRules: {
      filteringTags: [
        {
          name: "saokgpjvdlorciqbjmjxazpee",
          action: "Include",
          value: "sarxrqsxouhdjwsrqqicbeirdb",
        },
      ],
      sendAadLogs: "Enabled",
      sendActivityLogs: "Enabled",
      sendSubscriptionLogs: "Enabled",
    },
    metricRules: {
      filteringTags: [
        {
          name: "saokgpjvdlorciqbjmjxazpee",
          action: "Include",
          value: "sarxrqsxouhdjwsrqqicbeirdb",
        },
      ],
      userEmail: "test@testing.com",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.tagRules.update(
    resourceGroupName,
    monitorName,
    ruleSetName,
    properties,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates the tag rules for a specific New Relic monitor resource, allowing you to modify the rules that control which Azure resources are monitored
 *
 * @summary Updates the tag rules for a specific New Relic monitor resource, allowing you to modify the rules that control which Azure resources are monitored
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/TagRules_Update_MinimumSet_Gen.json
 */
async function tagRulesUpdateMinimumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgopenapi";
  const monitorName = "ipxmlcbonyxtolzejcjshkmlron";
  const ruleSetName = "bxcantgzggsepbhqmedjqyrqeezmfb";
  const properties = {};
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.tagRules.update(
    resourceGroupName,
    monitorName,
    ruleSetName,
    properties,
  );
  console.log(result);
}

async function main() {
  await tagRulesUpdateMaximumSetGen();
  await tagRulesUpdateMinimumSetGen();
}

main().catch(console.error);
