// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for List Hosting Environment Detector Responses
 *
 * @summary description for List Hosting Environment Detector Responses
 * x-ms-original-file: 2025-05-01/Diagnostics_ListHostingEnvironmentDetectorResponses.json
 */
async function getAppServiceEnvironmentDetectorResponses(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diagnostics.listHostingEnvironmentDetectorResponses(
    "Sample-WestUSResourceGroup",
    "SampleAppServiceEnvironment",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAppServiceEnvironmentDetectorResponses();
}

main().catch(console.error);
