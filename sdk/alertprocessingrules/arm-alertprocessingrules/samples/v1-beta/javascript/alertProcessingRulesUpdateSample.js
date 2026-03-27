// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AlertProcessingRulesManagementClient } = require("@azure/arm-alertprocessingrules");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to enable, disable, or update tags for an alert processing rule.
 *
 * @summary enable, disable, or update tags for an alert processing rule.
 * x-ms-original-file: 2021-08-08/AlertProcessingRules_Patch.json
 */
async function patchAlertProcessingRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1e3ff1c0-771a-4119-a03b-be82a51e232d";
  const client = new AlertProcessingRulesManagementClient(credential, subscriptionId);
  const result = await client.alertProcessingRules.update(
    "alertscorrelationrg",
    "WeeklySuppression",
    { enabled: false, tags: { key1: "value1", key2: "value2" } },
  );
  console.log(result);
}

async function main() {
  await patchAlertProcessingRule();
}

main().catch(console.error);
