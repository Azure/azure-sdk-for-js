// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AlertRuleRecommendationsManagementClient } from "@azure/arm-alertrulerecommendations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve alert rule recommendations for a target type.
 *
 * @summary retrieve alert rule recommendations for a target type.
 * x-ms-original-file: 2023-08-01-preview/AlertRuleRecommendations_GetBySubscription_MAC.json
 */
async function listAlertRuleRecommendationsForMonitoringAccountsAtSubscriptionLevel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2f00cc51-6809-498f-9ffc-48c42aff570d";
  const client = new AlertRuleRecommendationsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.alertRuleRecommendations.listByTargetType(
    "microsoft.monitor/accounts",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to retrieve alert rule recommendations for a target type.
 *
 * @summary retrieve alert rule recommendations for a target type.
 * x-ms-original-file: 2023-08-01-preview/AlertRuleRecommendations_GetBySubscription_VM.json
 */
async function listAlertRuleRecommendationsForVirtualMachinesAtSubscriptionLevel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2f00cc51-6809-498f-9ffc-48c42aff570d";
  const client = new AlertRuleRecommendationsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.alertRuleRecommendations.listByTargetType(
    "microsoft.compute/virtualmachines",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAlertRuleRecommendationsForMonitoringAccountsAtSubscriptionLevel();
  await listAlertRuleRecommendationsForVirtualMachinesAtSubscriptionLevel();
}

main().catch(console.error);
