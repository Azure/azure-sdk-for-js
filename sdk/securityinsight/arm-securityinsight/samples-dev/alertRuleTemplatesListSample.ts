// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all alert rule templates.
 *
 * @summary gets all alert rule templates.
 * x-ms-original-file: 2025-07-01-preview/alertRuleTemplates/GetAlertRuleTemplates.json
 */
async function getAllAlertRuleTemplates(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.alertRuleTemplates.list("myRg", "myWorkspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllAlertRuleTemplates();
}

main().catch(console.error);
