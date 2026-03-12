// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the specified alert definition.
 *
 * @summary Get the specified alert definition.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2022-08-01-preview/examples/GetAlertDefinitionById.json
 */

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAlertDefinitionById(): Promise<void> {
  const scope = "subscriptions/afa2a084-766f-4003-8ae1-c4aeb893a99f";
  const alertDefinitionId = "TooManyPermanentOwnersAssignedToResource";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.alertDefinitions.get(scope, alertDefinitionId);
  console.log(result);
}

async function main(): Promise<void> {
  await getAlertDefinitionById();
}

main().catch(console.error);
