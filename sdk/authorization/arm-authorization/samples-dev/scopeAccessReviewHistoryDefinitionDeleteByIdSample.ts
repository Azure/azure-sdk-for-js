// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete an access review history definition
 *
 * @summary Delete an access review history definition
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-12-01-preview/examples/DeleteAccessReviewHistoryDefinition.json
 */

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAccessReview(): Promise<void> {
  const scope = "subscriptions/fa73e90b-5bf1-45fd-a182-35ce5fc0674d";
  const historyDefinitionId = "fa73e90b-5bf1-45fd-a182-35ce5fc0674d";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.scopeAccessReviewHistoryDefinition.deleteById(
    scope,
    historyDefinitionId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAccessReview();
}

main().catch(console.error);
