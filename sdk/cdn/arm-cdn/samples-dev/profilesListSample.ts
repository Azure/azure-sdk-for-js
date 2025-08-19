// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all of the Azure Front Door Standard, Azure Front Door Premium, and CDN profiles within an Azure subscription.
 *
 * @summary Lists all of the Azure Front Door Standard, Azure Front Door Premium, and CDN profiles within an Azure subscription.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/Profiles_List.json
 */

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function profilesList(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.profiles.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await profilesList();
}

main().catch(console.error);
