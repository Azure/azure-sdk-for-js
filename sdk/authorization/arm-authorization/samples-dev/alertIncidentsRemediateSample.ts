// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to remediate an alert incident.
 *
 * @summary remediate an alert incident.
 * x-ms-original-file: 2022-08-01-preview/RemediateAlertIncident.json
 */
async function remediateAlertIncident(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  await client.alertIncidents.remediate(
    "subscriptions/afa2a084-766f-4003-8ae1-c4aeb893a99f",
    "DuplicateRoleCreated",
    "0645231d-16ba-4ebf-851a-0875df4052bd",
  );
}

async function main(): Promise<void> {
  await remediateAlertIncident();
}

main().catch(console.error);
