// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get access review instances
 *
 * @summary Get access review instances
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-12-01-preview/examples/GetAccessReviewInstances.json
 */
async function getAccessReviews(): Promise<void> {
  const scope = "subscriptions/fa73e90b-5bf1-45fd-a182-35ce5fc0674d";
  const scheduleDefinitionId = "265785a7-a81f-4201-8a18-bb0db95982b7";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.scopeAccessReviewInstances.list(scope, scheduleDefinitionId)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getAccessReviews();
}

main().catch(console.error);
