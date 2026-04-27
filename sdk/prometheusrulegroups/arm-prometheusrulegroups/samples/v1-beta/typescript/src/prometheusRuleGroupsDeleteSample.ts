// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrometheusRuleGroupsManagementClient } from "@azure/arm-prometheusrulegroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Prometheus rule group definition.
 *
 * @summary delete a Prometheus rule group definition.
 * x-ms-original-file: 2023-03-01/deletePrometheusRuleGroup.json
 */
async function deleteAPrometheusRuleGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PrometheusRuleGroupsManagementClient(credential, subscriptionId);
  await client.prometheusRuleGroups.delete("promResourceGroup", "myPrometheusRuleGroup");
}

async function main(): Promise<void> {
  await deleteAPrometheusRuleGroup();
}

main().catch(console.error);
