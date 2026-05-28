// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the configuration or data needed to onboard the machine to MDE
 *
 * @summary the configuration or data needed to onboard the machine to MDE
 * x-ms-original-file: 2021-10-01-preview/MdeOnboardings/ListMdeOnboardings_example.json
 */
async function theConfigurationOrDataNeededToOnboardTheMachineToMDE(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.mdeOnboardings.list();
  console.log(result);
}

async function main(): Promise<void> {
  await theConfigurationOrDataNeededToOnboardTheMachineToMDE();
}

main().catch(console.error);
