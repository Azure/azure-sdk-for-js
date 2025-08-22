// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update an alert configuration.
 *
 * @summary Update an alert configuration.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2022-08-01-preview/examples/UpdateAlertConfiguration.json
 */

import type { AlertConfiguration } from "@azure/arm-authorization";
import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateAlertConfiguration(): Promise<void> {
  const scope = "subscriptions/afa2a084-766f-4003-8ae1-c4aeb893a99f";
  const alertId = "TooManyOwnersAssignedToResource";
  const parameters: AlertConfiguration = {
    alertConfigurationType: "TooManyOwnersAssignedToResourceAlertConfiguration",
    isEnabled: true,
  };
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.alertConfigurations.update(scope, alertId, parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await updateAlertConfiguration();
}

main().catch(console.error);
