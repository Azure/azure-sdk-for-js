// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create a TagRule
 *
 * @summary Create a TagRule
 * x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/stable/2023-04-27/examples/TagRules_CreateOrUpdate_MaximumSet_Gen.json
 */

import type { TagRule } from "@azure/arm-dynatrace";
import { DynatraceObservability } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function tagRulesCreateOrUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["DYNATRACE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DYNATRACE_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const ruleSetName = "default";
  const resource: TagRule = {
    logRules: {
      filteringTags: [
        { name: "Environment", action: "Include", value: "Prod" },
        { name: "Environment", action: "Exclude", value: "Dev" },
      ],
      sendAadLogs: "Enabled",
      sendActivityLogs: "Enabled",
      sendSubscriptionLogs: "Enabled",
    },
    metricRules: {
      filteringTags: [{ name: "Environment", action: "Include", value: "Prod" }],
      sendingMetrics: "Enabled",
    },
    provisioningState: "Accepted",
  };
  const credential = new DefaultAzureCredential();
  const client = new DynatraceObservability(credential, subscriptionId);
  const result = await client.tagRules.beginCreateOrUpdateAndWait(
    resourceGroupName,
    monitorName,
    ruleSetName,
    resource,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create a TagRule
 *
 * @summary Create a TagRule
 * x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/stable/2023-04-27/examples/TagRules_CreateOrUpdate_MinimumSet_Gen.json
 */
async function tagRulesCreateOrUpdateMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["DYNATRACE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DYNATRACE_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const ruleSetName = "default";
  const resource: TagRule = {};
  const credential = new DefaultAzureCredential();
  const client = new DynatraceObservability(credential, subscriptionId);
  const result = await client.tagRules.beginCreateOrUpdateAndWait(
    resourceGroupName,
    monitorName,
    ruleSetName,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tagRulesCreateOrUpdateMaximumSetGen();
  await tagRulesCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
