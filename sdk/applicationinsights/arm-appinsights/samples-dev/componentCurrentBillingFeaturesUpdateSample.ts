// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update current billing features for an Application Insights component.
 *
 * @summary Update current billing features for an Application Insights component.
 * x-ms-original-file: specification/applicationinsights/resource-manager/Microsoft.Insights/stable/2015-05-01/examples/CurrentBillingFeaturesUpdate.json
 */

import {
  ApplicationInsightsComponentBillingFeatures,
  ApplicationInsightsManagementClient,
} from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function componentCurrentBillingFeaturesUpdate(): Promise<void> {
  const subscriptionId =
    process.env["APPLICATIONINSIGHTS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["APPLICATIONINSIGHTS_RESOURCE_GROUP"] || "my-resource-group";
  const resourceName = "my-component";
  const billingFeaturesProperties: ApplicationInsightsComponentBillingFeatures =
  {
    currentBillingFeatures: ["Basic", "Application Insights Enterprise"],
    dataVolumeCap: { cap: 100, stopSendNotificationWhenHitCap: true },
  };
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.componentCurrentBillingFeatures.update(
    resourceGroupName,
    resourceName,
    billingFeaturesProperties,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await componentCurrentBillingFeaturesUpdate();
}

main().catch(console.error);
