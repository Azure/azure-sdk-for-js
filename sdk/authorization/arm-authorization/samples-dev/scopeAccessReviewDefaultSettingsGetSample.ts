// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get access review default settings for the subscription
 *
 * @summary Get access review default settings for the subscription
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-12-01-preview/examples/GetAccessReviewDefaultSettings.json
 */

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAccessReviewDefaultSettings(): Promise<void> {
  const scope = "subscriptions/fa73e90b-5bf1-45fd-a182-35ce5fc0674d";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.scopeAccessReviewDefaultSettings.get(scope);
  console.log(result);
}

async function main(): Promise<void> {
  await getAccessReviewDefaultSettings();
}

main().catch(console.error);
