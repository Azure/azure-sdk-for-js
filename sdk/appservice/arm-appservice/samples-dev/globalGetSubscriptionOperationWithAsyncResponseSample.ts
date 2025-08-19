// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Gets an operation in a subscription and given region
 *
 * @summary Description for Gets an operation in a subscription and given region
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/GetSubscriptionOperationWithAsyncResponse.json
 */

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsAnOperationInASubscriptionAndGivenRegion(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const location = "West US";
  const operationId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab5d5";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.global.getSubscriptionOperationWithAsyncResponse(
    location,
    operationId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsAnOperationInASubscriptionAndGivenRegion();
}

main().catch(console.error);
