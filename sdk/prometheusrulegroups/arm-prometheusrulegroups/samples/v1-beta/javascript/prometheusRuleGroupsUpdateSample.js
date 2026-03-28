// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrometheusRuleGroupsManagementClient } = require("@azure/arm-prometheusrulegroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an Prometheus rule group definition.
 *
 * @summary update an Prometheus rule group definition.
 * x-ms-original-file: 2023-03-01/patchPrometheusRuleGroup.json
 */
async function patchAPrometheusRuleGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PrometheusRuleGroupsManagementClient(credential, subscriptionId);
  const result = await client.prometheusRuleGroups.update(
    "promResourceGroup",
    "myPrometheusRuleGroup",
    { enabled: false, tags: { tag1: "tagValueFromPatch" } },
  );
  console.log(result);
}

async function main() {
  await patchAPrometheusRuleGroup();
}

main().catch(console.error);
