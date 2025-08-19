// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all of the available GuestConfiguration REST API operations.
 *
 * @summary Lists all of the available GuestConfiguration REST API operations.
 * x-ms-original-file: specification/guestconfiguration/resource-manager/Microsoft.GuestConfiguration/stable/2022-01-25/examples/listOperations.json
 */

import { GuestConfigurationClient } from "@azure/arm-guestconfiguration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listsAllOfTheAvailableGuestConfigurationRestApiOperations(): Promise<void> {
  const subscriptionId =
    process.env["GUESTCONFIGURATION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAllOfTheAvailableGuestConfigurationRestApiOperations();
}

main().catch(console.error);
