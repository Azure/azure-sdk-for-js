// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Service health event in the subscription by event tracking id
 *
 * @summary Service health event in the subscription by event tracking id
 * x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/Event_GetBySubscriptionIdAndTrackingId.json
 */

import type { EventGetBySubscriptionIdAndTrackingIdOptionalParams } from "@azure/arm-resourcehealth";
import { MicrosoftResourceHealth } from "@azure/arm-resourcehealth";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function securityAdvisoriesEventBySubscriptionIdAndTrackingId(): Promise<void> {
  const subscriptionId = process.env["RESOURCEHEALTH_SUBSCRIPTION_ID"] || "subscriptionId";
  const filter = "properties/status eq 'Active'";
  const queryStartTime = "7/10/2022";
  const eventTrackingId = "eventTrackingId";
  const options: EventGetBySubscriptionIdAndTrackingIdOptionalParams = {
    filter,
    queryStartTime,
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential, subscriptionId);
  const result = await client.eventOperations.getBySubscriptionIdAndTrackingId(
    eventTrackingId,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await securityAdvisoriesEventBySubscriptionIdAndTrackingId();
}

main().catch(console.error);
