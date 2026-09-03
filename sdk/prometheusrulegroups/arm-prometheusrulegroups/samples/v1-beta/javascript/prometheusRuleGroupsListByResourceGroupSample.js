// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrometheusRuleGroupsManagementClient } = require("@azure/arm-prometheusrulegroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve Prometheus rule group definitions in a resource group.
 *
 * @summary retrieve Prometheus rule group definitions in a resource group.
 * x-ms-original-file: 2023-03-01/listPrometheusRuleGroups.json
 */
async function listResourceGroupPrometheusRuleGroups() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PrometheusRuleGroupsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.prometheusRuleGroups.listByResourceGroup("promResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listResourceGroupPrometheusRuleGroups();
}

main().catch(console.error);
