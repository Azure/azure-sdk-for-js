// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get Hosting Environment Detector Response
 *
 * @summary description for Get Hosting Environment Detector Response
 * x-ms-original-file: 2025-05-01/Diagnostics_GetHostingEnvironmentDetectorResponse.json
 */
async function getAppServiceEnvironmentDetectorResponses() {
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

async function main() {
  await getAppServiceEnvironmentDetectorResponses();
}

main().catch(console.error);
