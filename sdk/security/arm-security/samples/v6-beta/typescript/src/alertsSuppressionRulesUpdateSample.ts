// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update existing rule or create new rule if it doesn't exist
 *
 * @summary update existing rule or create new rule if it doesn't exist
 * x-ms-original-file: 2019-01-01-preview/AlertsSuppressionRules/PutAlertsSuppressionRule_example.json
 */
async function updateOrCreateSuppressionRuleForSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.alertsSuppressionRules.update("dismissIpAnomalyAlerts", {
    alertType: "IpAnomaly",
    comment: "Test VM",
    expirationDateUtc: new Date("2019-12-01T19:50:47.083633Z"),
    reason: "FalsePositive",
    state: "Enabled",
    suppressionAlertsScope: {
      allOf: [
        {
          field: "entities.ip.address",
          additionalProperties: {
            in: ["104.215.95.187", "52.164.206.56"],
          },
        },
        {
          field: "entities.process.commandline",
          additionalProperties: {
            contains: "POWERSHELL.EXE",
          },
        },
      ],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateOrCreateSuppressionRuleForSubscription();
}

main().catch(console.error);
