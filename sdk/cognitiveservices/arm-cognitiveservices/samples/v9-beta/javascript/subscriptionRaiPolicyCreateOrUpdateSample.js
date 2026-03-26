// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the state of specified Content Filters associated with the subscription.
 *
 * @summary update the state of specified Content Filters associated with the subscription.
 * x-ms-original-file: 2026-01-15-preview/PutSubscriptionRaiPolicy.json
 */
async function putRaiPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.subscriptionRaiPolicy.createOrUpdate("raiPolicyName", {
    properties: {
      basePolicyName: "Microsoft.Default",
      contentFilters: [
        {
          name: "Hate",
          blocking: false,
          enabled: false,
          severityThreshold: "High",
          source: "Prompt",
        },
        {
          name: "Hate",
          blocking: true,
          enabled: true,
          severityThreshold: "Medium",
          source: "Completion",
        },
        {
          name: "Sexual",
          blocking: true,
          enabled: true,
          severityThreshold: "High",
          source: "Prompt",
        },
        {
          name: "Sexual",
          blocking: true,
          enabled: true,
          severityThreshold: "Medium",
          source: "Completion",
        },
        {
          name: "Selfharm",
          blocking: true,
          enabled: true,
          severityThreshold: "High",
          source: "Prompt",
        },
        {
          name: "Selfharm",
          blocking: true,
          enabled: true,
          severityThreshold: "Medium",
          source: "Completion",
        },
        {
          name: "Violence",
          blocking: true,
          enabled: true,
          severityThreshold: "Medium",
          source: "Prompt",
        },
        {
          name: "Violence",
          blocking: true,
          enabled: true,
          severityThreshold: "Medium",
          source: "Completion",
        },
        { name: "Jailbreak", blocking: true, enabled: true, source: "Prompt" },
        { name: "Protected Material Text", blocking: true, enabled: true, source: "Completion" },
        { name: "Protected Material Code", blocking: true, enabled: true, source: "Completion" },
        { name: "Profanity", blocking: true, enabled: true, source: "Prompt" },
      ],
      mode: "Asynchronous_filter",
    },
  });
  console.log(result);
}

async function main() {
  await putRaiPolicy();
}

main().catch(console.error);
