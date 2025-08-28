// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Check if a DigitalTwinsInstance name is available.
 *
 * @summary Check if a DigitalTwinsInstance name is available.
 * x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2023-01-31/examples/DigitalTwinsCheckNameAvailability_example.json
 */

import type { CheckNameRequest } from "@azure/arm-digitaltwins";
import { AzureDigitalTwinsManagementClient } from "@azure/arm-digitaltwins";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function checkNameAvailability(): Promise<void> {
  const subscriptionId =
    process.env["DIGITALTWINS_SUBSCRIPTION_ID"] || "50016170-c839-41ba-a724-51e9df440b9e";
  const location = "WestUS2";
  const digitalTwinsInstanceCheckName: CheckNameRequest = {
    name: "myadtinstance",
    type: "Microsoft.DigitalTwins/digitalTwinsInstances",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureDigitalTwinsManagementClient(credential, subscriptionId);
  const result = await client.digitalTwins.checkNameAvailability(
    location,
    digitalTwinsInstanceCheckName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await checkNameAvailability();
}

main().catch(console.error);
