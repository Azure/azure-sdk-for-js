// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PortalServicesClient } = require("@azure/arm-portalservicescopilot");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a CopilotSettingsResource
 *
 * @summary get a CopilotSettingsResource
 * x-ms-original-file: 2024-04-01-preview/CopilotSettings_Get.json
 */
async function getCopilotSettings() {
  const credential = new DefaultAzureCredential();
  const client = new PortalServicesClient(credential);
  const result = await client.copilotSettings.get();
  console.log(result);
}

async function main() {
  await getCopilotSettings();
}

main().catch(console.error);
