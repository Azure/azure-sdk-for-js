// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservability } from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new set of tag rules for a specific New Relic monitor resource, determining which Azure resources are monitored based on their tags
 *
 * @summary creates a new set of tag rules for a specific New Relic monitor resource, determining which Azure resources are monitored based on their tags
 * x-ms-original-file: 2025-05-01-preview/TagRules_CreateOrUpdate_MaximumSet_Gen.json
 */
async function tagRulesCreateOrUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.tagRules.createOrUpdate(
    "rgopenapi",
    "ipxmlcbonyxtolzejcjshkmlron",
    "bxcantgzggsepbhqmedjqyrqeezmfb",
    {
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
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new set of tag rules for a specific New Relic monitor resource, determining which Azure resources are monitored based on their tags
 *
 * @summary creates a new set of tag rules for a specific New Relic monitor resource, determining which Azure resources are monitored based on their tags
 * x-ms-original-file: 2025-05-01-preview/TagRules_CreateOrUpdate_MinimumSet_Gen.json
 */
async function tagRulesCreateOrUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.tagRules.createOrUpdate(
    "rgopenapi",
    "ipxmlcbonyxtolzejcjshkmlron",
    "bxcantgzggsepbhqmedjqyrqeezmfb",
    {},
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tagRulesCreateOrUpdateMaximumSetGen();
  await tagRulesCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
