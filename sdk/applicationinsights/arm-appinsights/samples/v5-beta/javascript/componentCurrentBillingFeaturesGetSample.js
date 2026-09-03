// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns current billing features for an Application Insights component.
 *
 * @summary returns current billing features for an Application Insights component.
 * x-ms-original-file: 2015-05-01/CurrentBillingFeaturesGet.json
 */
async function componentCurrentBillingFeaturesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.componentCurrentBillingFeatures.get(
    "my-resource-group",
    "my-component",
  );
  console.log(result);
}

async function main() {
  await componentCurrentBillingFeaturesGet();
}

main().catch(console.error);
