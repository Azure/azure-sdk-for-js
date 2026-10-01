// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the specified alert incident.
 *
 * @summary get the specified alert incident.
 * x-ms-original-file: 2022-08-01-preview/GetAlertIncidentById.json
 */
async function getAlertIncidentById(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.alertIncidents.get(
    "subscriptions/afa2a084-766f-4003-8ae1-c4aeb893a99f",
    "TooManyOwnersAssignedToResource",
    "5cf9ee65-d22e-4784-8b17-3de1c3b7bdcc",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAlertIncidentById();
}

main().catch(console.error);
