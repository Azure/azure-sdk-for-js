// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the Continuous Export configuration for this export id.
 *
 * @summary get the Continuous Export configuration for this export id.
 * x-ms-original-file: 2015-05-01/ExportConfigurationGet.json
 */
async function exportConfigurationGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.exportConfigurations.get(
    "my-resource-group",
    "my-component",
    "uGOoki0jQsyEs3IdQ83Q4QsNr4=",
  );
  console.log(result);
}

async function main() {
  await exportConfigurationGet();
}

main().catch(console.error);
