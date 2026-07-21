// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the details of the tag rules for a specific New Relic monitor resource, providing insight into its setup and status
 *
 * @summary retrieves the details of the tag rules for a specific New Relic monitor resource, providing insight into its setup and status
 * x-ms-original-file: 2025-05-01-preview/TagRules_Get_MaximumSet_Gen.json
 */
async function tagRulesGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.tagRules.get(
    "rgopenapi",
    "ipxmlcbonyxtolzejcjshkmlron",
    "bxcantgzggsepbhqmedjqyrqeezmfb",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves the details of the tag rules for a specific New Relic monitor resource, providing insight into its setup and status
 *
 * @summary retrieves the details of the tag rules for a specific New Relic monitor resource, providing insight into its setup and status
 * x-ms-original-file: 2025-05-01-preview/TagRules_Get_MinimumSet_Gen.json
 */
async function tagRulesGetMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.tagRules.get(
    "rgopenapi",
    "ipxmlcbonyxtolzejcjshkmlron",
    "bxcantgzggsepbhqmedjqyrqeezmfb",
  );
  console.log(result);
}

async function main() {
  await tagRulesGetMaximumSetGen();
  await tagRulesGetMinimumSetGen();
}

main().catch(console.error);
