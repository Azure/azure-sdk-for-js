// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AlertsManagementClient } = require("@azure/arm-prometheusrulegroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve a Prometheus rule group definition.
 *
 * @summary retrieve a Prometheus rule group definition.
 * x-ms-original-file: 2023-03-01/getPrometheusRuleGroup.json
 */
async function getAPrometheusRuleGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new AlertsManagementClient(credential, subscriptionId);
  const result = await client.prometheusRuleGroups.get(
    "promResourceGroup",
    "myPrometheusRuleGroup",
  );
  console.log(result);
}

async function main() {
  await getAPrometheusRuleGroup();
}

main().catch(console.error);
