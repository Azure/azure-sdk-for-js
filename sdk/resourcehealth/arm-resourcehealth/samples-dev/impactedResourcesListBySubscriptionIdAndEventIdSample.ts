// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists impacted resources in the subscription by an event.
 *
 * @summary Lists impacted resources in the subscription by an event.
 * x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/ImpactedResources_ListBySubscriptionId_ListByEventId.json
 */

import type { ImpactedResourcesListBySubscriptionIdAndEventIdOptionalParams } from "@azure/arm-resourcehealth";
import { MicrosoftResourceHealth } from "@azure/arm-resourcehealth";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listImpactedResourcesBySubscriptionId(): Promise<void> {
  const subscriptionId = process.env["RESOURCEHEALTH_SUBSCRIPTION_ID"] || "subscriptionId";
  const eventTrackingId = "BC_1-FXZ";
  const filter = "targetRegion eq 'westus'";
  const options: ImpactedResourcesListBySubscriptionIdAndEventIdOptionalParams = {
    filter,
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.impactedResources.listBySubscriptionIdAndEventId(
    eventTrackingId,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listImpactedResourcesBySubscriptionId();
}

main().catch(console.error);
