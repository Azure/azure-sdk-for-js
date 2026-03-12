// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a list of application control machine groups for the subscription.
 *
 * @summary Gets a list of application control machine groups for the subscription.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2020-01-01/examples/ApplicationWhitelistings/GetAdaptiveApplicationControlsSubscription_example.json
 */

import type { AdaptiveApplicationControlsListOptionalParams } from "@azure/arm-security";
import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsAListOfApplicationControlGroupsOfMachinesForTheSubscription(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const includePathRecommendations = true;
  const summary = false;
  const options: AdaptiveApplicationControlsListOptionalParams = {
    includePathRecommendations,
    summary,
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.adaptiveApplicationControls.list(options);
  console.log(result);
}

async function main(): Promise<void> {
  await getsAListOfApplicationControlGroupsOfMachinesForTheSubscription();
}

main().catch(console.error);
