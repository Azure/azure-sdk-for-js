// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns feature capabilities of the application insights component.
 *
 * @summary returns feature capabilities of the application insights component.
 * x-ms-original-file: 2015-05-01/FeatureCapabilitiesGet.json
 */
async function componentCurrentBillingFeaturesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.componentFeatureCapabilities.get("my-resource-group", "my-component");
  console.log(result);
}

async function main(): Promise<void> {
  await componentCurrentBillingFeaturesGet();
}

main().catch(console.error);
