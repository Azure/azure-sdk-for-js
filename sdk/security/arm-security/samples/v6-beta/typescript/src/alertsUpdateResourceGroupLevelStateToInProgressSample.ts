// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the alert's state
 *
 * @summary update the alert's state
 * x-ms-original-file: 2022-01-01/Alerts/UpdateAlertResourceGroupLocation_inProgress_example.json
 */
async function updateSecurityAlertStateOnAResourceGroupFromASecurityDataLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.alerts.updateResourceGroupLevelStateToInProgress(
    "myRg2",
    "westeurope",
    "2518765996949954086_2325cf9e-42a2-4f72-ae7f-9b863cba2d22",
  );
}

async function main(): Promise<void> {
  await updateSecurityAlertStateOnAResourceGroupFromASecurityDataLocation();
}

main().catch(console.error);
