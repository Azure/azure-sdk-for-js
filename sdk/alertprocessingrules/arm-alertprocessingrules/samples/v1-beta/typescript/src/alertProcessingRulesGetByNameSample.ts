// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AlertsManagementClient } from "@azure/arm-alertprocessingrules";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an alert processing rule by name.
 *
 * @summary get an alert processing rule by name.
 * x-ms-original-file: 2021-08-08/AlertProcessingRules_GetById.json
 */
async function getAlertProcessingRuleById(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1e3ff1c0-771a-4119-a03b-be82a51e232d";
  const client = new AlertsManagementClient(credential, subscriptionId);
  const result = await client.alertProcessingRules.getByName(
    "alertscorrelationrg",
    "DailySuppression",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAlertProcessingRuleById();
}

main().catch(console.error);
