// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an alert configuration.
 *
 * @summary update an alert configuration.
 * x-ms-original-file: 2022-08-01-preview/UpdateAlertConfiguration.json
 */
async function updateAlertConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  await client.alertConfigurations.update(
    "subscriptions/afa2a084-766f-4003-8ae1-c4aeb893a99f",
    "TooManyOwnersAssignedToResource",
    {
      properties: {
        alertConfigurationType: "TooManyOwnersAssignedToResourceAlertConfiguration",
        isEnabled: true,
        thresholdNumberOfOwners: 2,
      },
    },
  );
}

async function main(): Promise<void> {
  await updateAlertConfiguration();
}

main().catch(console.error);
