// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the alert rule template.
 *
 * @summary gets the alert rule template.
 * x-ms-original-file: 2025-07-01-preview/alertRuleTemplates/GetAlertRuleTemplateById.json
 */
async function getAlertRuleTemplateById() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.alertRuleTemplates.get(
    "myRg",
    "myWorkspace",
    "65360bb0-8986-4ade-a89d-af3cf44d28aa",
  );
  console.log(result);
}

async function main() {
  await getAlertRuleTemplateById();
}

main().catch(console.error);
