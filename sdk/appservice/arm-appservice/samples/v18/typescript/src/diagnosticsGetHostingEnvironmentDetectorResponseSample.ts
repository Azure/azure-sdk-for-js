// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Get Hosting Environment Detector Response
 *
 * @summary description for Get Hosting Environment Detector Response
 * x-ms-original-file: 2025-05-01/Diagnostics_GetHostingEnvironmentDetectorResponse.json
 */
async function getAppServiceEnvironmentDetectorResponses(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.diagnostics.getHostingEnvironmentDetectorResponse(
    "Sample-WestUSResourceGroup",
    "SampleAppServiceEnvironment",
    "runtimeavailability",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAppServiceEnvironmentDetectorResponses();
}

main().catch(console.error);
