// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Checks ADU resource name availability.
 *
 * @summary Checks ADU resource name availability.
 * x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/stable/2023-07-01/examples/CheckNameAvailability_AlreadyExists.json
 */

import type { CheckNameAvailabilityRequest } from "@azure/arm-deviceupdate";
import { DeviceUpdate } from "@azure/arm-deviceupdate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function checkNameAvailabilityAlreadyExists(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEUPDATE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const request: CheckNameAvailabilityRequest = {
    name: "contoso",
    type: "Microsoft.DeviceUpdate/accounts",
  };
  const credential = new DefaultAzureCredential();
  const client = new DeviceUpdate(credential, subscriptionId);
  const result = await client.checkNameAvailability(request);
  console.log(result);
}

/**
 * This sample demonstrates how to Checks ADU resource name availability.
 *
 * @summary Checks ADU resource name availability.
 * x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/stable/2023-07-01/examples/CheckNameAvailability_Available.json
 */
async function checkNameAvailabilityAvailable(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEUPDATE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const request: CheckNameAvailabilityRequest = {
    name: "contoso",
    type: "Microsoft.DeviceUpdate/accounts",
  };
  const credential = new DefaultAzureCredential();
  const client = new DeviceUpdate(credential, subscriptionId);
  const result = await client.checkNameAvailability(request);
  console.log(result);
}

async function main(): Promise<void> {
  await checkNameAvailabilityAlreadyExists();
  await checkNameAvailabilityAvailable();
}

main().catch(console.error);
