// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List springbootapps resource by subscription
 *
 * @summary List springbootapps resource by subscription
 * x-ms-original-file: specification/offazurespringboot/resource-manager/Microsoft.OffAzureSpringBoot/preview/2023-01-01-preview/examples/springbootapps_ListBySubscription_MaximumSet_Gen.json
 */

import { SpringAppDiscoveryManagementClient } from "@azure/arm-springappdiscovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function springbootappsListBySubscriptionMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["SPRINGAPPDISCOVERY_SUBSCRIPTION_ID"] || "jnetwlorzmxpxmcucorv";
  const siteName = "pdfosfhtemfsaglvwjdyqlyeipucrd";
  const credential = new DefaultAzureCredential();
  const client = new SpringAppDiscoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.springbootapps.listBySubscription(siteName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List springbootapps resource by subscription
 *
 * @summary List springbootapps resource by subscription
 * x-ms-original-file: specification/offazurespringboot/resource-manager/Microsoft.OffAzureSpringBoot/preview/2023-01-01-preview/examples/springbootapps_ListBySubscription_MinimumSet_Gen.json
 */
async function springbootappsListBySubscriptionMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["SPRINGAPPDISCOVERY_SUBSCRIPTION_ID"] || "jnetwlorzmxpxmcucorv";
  const siteName = "pdfosfhtemfsaglvwjdyqlyeipucrd";
  const credential = new DefaultAzureCredential();
  const client = new SpringAppDiscoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.springbootapps.listBySubscription(siteName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await springbootappsListBySubscriptionMaximumSetGen();
  await springbootappsListBySubscriptionMinimumSetGen();
}

main().catch(console.error);
