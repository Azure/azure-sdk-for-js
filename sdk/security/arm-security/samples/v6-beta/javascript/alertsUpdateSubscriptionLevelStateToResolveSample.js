// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the alert's state
 *
 * @summary update the alert's state
 * x-ms-original-file: 2022-01-01/Alerts/UpdateAlertSubscriptionLocation_resolve_example.json
 */
async function updateSecurityAlertStateOnASubscriptionFromASecurityDataLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.alerts.updateSubscriptionLevelStateToResolve(
    "westeurope",
    "2518298467986649999_4d25bfef-2d77-4a08-adc0-3e35715cc92a",
  );
}

async function main() {
  await updateSecurityAlertStateOnASubscriptionFromASecurityDataLocation();
}

main().catch(console.error);
