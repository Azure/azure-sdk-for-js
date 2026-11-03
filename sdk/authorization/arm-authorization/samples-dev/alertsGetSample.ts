// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the specified alert.
 *
 * @summary get the specified alert.
 * x-ms-original-file: 2022-08-01-preview/GetAlertById.json
 */
async function getAlertById(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.alerts.get(
    "subscriptions/afa2a084-766f-4003-8ae1-c4aeb893a99f",
    "TooManyOwnersAssignedToResource",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAlertById();
}

main().catch(console.error);
