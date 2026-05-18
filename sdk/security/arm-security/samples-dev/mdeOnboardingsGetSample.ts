// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the default configuration or data needed to onboard the machine to MDE
 *
 * @summary the default configuration or data needed to onboard the machine to MDE
 * x-ms-original-file: 2021-10-01-preview/MdeOnboardings/GetMdeOnboardings_example.json
 */
async function theDefaultConfigurationOrDataNeededToOnboardTheMachineToMDE(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.mdeOnboardings.get();
  console.log(result);
}

async function main(): Promise<void> {
  await theDefaultConfigurationOrDataNeededToOnboardTheMachineToMDE();
}

main().catch(console.error);
