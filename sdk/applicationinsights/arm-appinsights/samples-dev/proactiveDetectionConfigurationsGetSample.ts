// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the ProactiveDetection configuration for this configuration id.
 *
 * @summary get the ProactiveDetection configuration for this configuration id.
 * x-ms-original-file: 2015-05-01/ProactiveDetectionConfigurationGet.json
 */
async function proactiveDetectionConfigurationGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.proactiveDetectionConfigurations.get(
    "my-resource-group",
    "my-component",
    "slowpageloadtime",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await proactiveDetectionConfigurationGet();
}

main().catch(console.error);
