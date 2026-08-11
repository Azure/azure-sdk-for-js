// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a tag rule set for a given New Relic monitor resource, removing fine-grained control over observability based on resource tags
 *
 * @summary deletes a tag rule set for a given New Relic monitor resource, removing fine-grained control over observability based on resource tags
 * x-ms-original-file: 2025-05-01-preview/TagRules_Delete_MaximumSet_Gen.json
 */
async function tagRulesDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  await client.tagRules.delete(
    "rgopenapi",
    "ipxmlcbonyxtolzejcjshkmlron",
    "bxcantgzggsepbhqmedjqyrqeezmfb",
  );
}

/**
 * This sample demonstrates how to deletes a tag rule set for a given New Relic monitor resource, removing fine-grained control over observability based on resource tags
 *
 * @summary deletes a tag rule set for a given New Relic monitor resource, removing fine-grained control over observability based on resource tags
 * x-ms-original-file: 2025-05-01-preview/TagRules_Delete_MinimumSet_Gen.json
 */
async function tagRulesDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  await client.tagRules.delete(
    "rgopenapi",
    "ipxmlcbonyxtolzejcjshkmlron",
    "bxcantgzggsepbhqmedjqyrqeezmfb",
  );
}

async function main() {
  await tagRulesDeleteMaximumSetGen();
  await tagRulesDeleteMinimumSetGen();
}

main().catch(console.error);
