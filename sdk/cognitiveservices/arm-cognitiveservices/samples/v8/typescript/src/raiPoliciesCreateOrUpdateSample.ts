// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  RaiPolicy,
  CognitiveServicesManagementClient,
} from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update the state of specified Content Filters associated with the Azure OpenAI account.
 *
 * @summary Update the state of specified Content Filters associated with the Azure OpenAI account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/PutRaiPolicy.json
 */
async function putRaiPolicy(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const raiPolicyName = "raiPolicyName";
  const raiPolicy: RaiPolicy = {
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
        {
          name: "Protected Material Text",
          blocking: true,
          enabled: true,
          source: "Completion",
        },
        {
          name: "Protected Material Code",
          blocking: true,
          enabled: true,
          source: "Completion",
        },
        { name: "Profanity", blocking: true, enabled: true, source: "Prompt" },
      ],
      mode: "Asynchronous_filter",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.raiPolicies.createOrUpdate(
    resourceGroupName,
    accountName,
    raiPolicyName,
    raiPolicy,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putRaiPolicy();
}

main().catch(console.error);
