// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update access review instance.
 *
 * @summary Update access review instance.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-12-01-preview/examples/PutAccessReviewInstance.json
 */

import type { AccessReviewInstanceProperties } from "@azure/arm-authorization";
import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAccessReviews(): Promise<void> {
  const scope = "subscriptions/fa73e90b-5bf1-45fd-a182-35ce5fc0674d";
  const scheduleDefinitionId = "fa73e90b-5bf1-45fd-a182-35ce5fc0674d";
  const id = "4135f961-be78-4005-8101-c72a5af307a2";
  const properties: AccessReviewInstanceProperties = {};
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.scopeAccessReviewInstances.create(
    scope,
    scheduleDefinitionId,
    id,
    properties,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAccessReviews();
}

main().catch(console.error);
