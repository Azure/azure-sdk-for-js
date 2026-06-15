// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of ProactiveDetection configurations of an Application Insights component.
 *
 * @summary gets a list of ProactiveDetection configurations of an Application Insights component.
 * x-ms-original-file: 2015-05-01/ProactiveDetectionConfigurationsList.json
 */
async function proactiveDetectionConfigurationsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.proactiveDetectionConfigurations.list(
    "my-resource-group",
    "my-component",
  );
  console.log(result);
}

async function main() {
  await proactiveDetectionConfigurationsList();
}

main().catch(console.error);
