// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update current billing features for an Application Insights component.
 *
 * @summary update current billing features for an Application Insights component.
 * x-ms-original-file: 2015-05-01/CurrentBillingFeaturesUpdate.json
 */
async function componentCurrentBillingFeaturesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.componentCurrentBillingFeatures.update(
    "my-resource-group",
    "my-component",
    {
      currentBillingFeatures: ["Basic", "Application Insights Enterprise"],
      dataVolumeCap: { cap: 100, stopSendNotificationWhenHitCap: true },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await componentCurrentBillingFeaturesUpdate();
}

main().catch(console.error);
