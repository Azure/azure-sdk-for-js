// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrometheusRuleGroupsManagementClient } from "@azure/arm-prometheusrulegroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve Prometheus all rule group definitions in a subscription.
 *
 * @summary retrieve Prometheus all rule group definitions in a subscription.
 * x-ms-original-file: 2023-03-01/listSubscriptionPrometheusRuleGroups.json
 */
async function listSubscriptionResourcePrometheusRuleGroups(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PrometheusRuleGroupsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.prometheusRuleGroups.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSubscriptionResourcePrometheusRuleGroups();
}

main().catch(console.error);
