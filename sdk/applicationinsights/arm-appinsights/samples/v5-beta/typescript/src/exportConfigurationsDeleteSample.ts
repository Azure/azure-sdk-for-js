// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Continuous Export configuration of an Application Insights component.
 *
 * @summary delete a Continuous Export configuration of an Application Insights component.
 * x-ms-original-file: 2015-05-01/ExportConfigurationDelete.json
 */
async function exportConfigurationDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.exportConfigurations.delete(
    "my-resource-group",
    "my-component",
    "uGOoki0jQsyEs3IdQ83Q4QsNr4=",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await exportConfigurationDelete();
}

main().catch(console.error);
