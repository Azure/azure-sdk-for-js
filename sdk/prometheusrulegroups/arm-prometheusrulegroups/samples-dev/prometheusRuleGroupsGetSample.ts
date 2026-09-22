// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrometheusRuleGroupsManagementClient } from "@azure/arm-prometheusrulegroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve a Prometheus rule group definition.
 *
 * @summary retrieve a Prometheus rule group definition.
 * x-ms-original-file: 2023-03-01/getPrometheusRuleGroup.json
 */
async function getAPrometheusRuleGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PrometheusRuleGroupsManagementClient(credential, subscriptionId);
  const result = await client.prometheusRuleGroups.get(
    "promResourceGroup",
    "myPrometheusRuleGroup",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAPrometheusRuleGroup();
}

main().catch(console.error);
