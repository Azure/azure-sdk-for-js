// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Get all App Service Environments for a subscription.
 *
 * @summary description for Get all App Service Environments for a subscription.
 * x-ms-original-file: 2025-05-01/AppServiceEnvironments_List.json
 */
async function getAllAppServiceEnvironmentsForASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appServiceEnvironments.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllAppServiceEnvironmentsForASubscription();
}

main().catch(console.error);
