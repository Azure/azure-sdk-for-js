// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the alert rule.
 *
 * @summary gets the alert rule.
 * x-ms-original-file: 2025-07-01-preview/alertRules/GetFusionAlertRule.json
 */
async function getAFusionAlertRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.alertRules.get("myRg", "myWorkspace", "myFirstFusionRule");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the alert rule.
 *
 * @summary gets the alert rule.
 * x-ms-original-file: 2025-07-01-preview/alertRules/GetMicrosoftSecurityIncidentCreationAlertRule.json
 */
async function getAMicrosoftSecurityIncidentCreationRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.alertRules.get(
    "myRg",
    "myWorkspace",
    "microsoftSecurityIncidentCreationRuleExample",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the alert rule.
 *
 * @summary gets the alert rule.
 * x-ms-original-file: 2025-07-01-preview/alertRules/GetNrtAlertRule.json
 */
async function getAnNrtAlertRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.alertRules.get(
    "myRg",
    "myWorkspace",
    "73e01a99-5cd7-4139-a149-9f2736ff2ab5",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the alert rule.
 *
 * @summary gets the alert rule.
 * x-ms-original-file: 2025-07-01-preview/alertRules/GetScheduledAlertRule.json
 */
async function getAScheduledAlertRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.alertRules.get(
    "myRg",
    "myWorkspace",
    "73e01a99-5cd7-4139-a149-9f2736ff2ab5",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAFusionAlertRule();
  await getAMicrosoftSecurityIncidentCreationRule();
  await getAnNrtAlertRule();
  await getAScheduledAlertRule();
}

main().catch(console.error);
