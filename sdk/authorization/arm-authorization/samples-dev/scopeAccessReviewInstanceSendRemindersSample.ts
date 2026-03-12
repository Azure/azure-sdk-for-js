// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to An action to send reminders for an access review instance.
 *
 * @summary An action to send reminders for an access review instance.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-12-01-preview/examples/AccessReviewInstanceSendReminders.json
 */

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAccessReview(): Promise<void> {
  const scope = "subscriptions/fa73e90b-5bf1-45fd-a182-35ce5fc0674d";
  const scheduleDefinitionId = "fa73e90b-5bf1-45fd-a182-35ce5fc0674d";
  const id = "d9b9e056-7004-470b-bf21-1635e98487da";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.scopeAccessReviewInstance.sendReminders(
    scope,
    scheduleDefinitionId,
    id,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAccessReview();
}

main().catch(console.error);
