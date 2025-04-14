// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PortalServicesClient } = require("@azure/arm-portalservicescopilot");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a CopilotSettingsResource
 *
 * @summary update a CopilotSettingsResource
 * x-ms-original-file: 2024-04-01-preview/CopilotSettings_Update.json
 */
async function updateCopilotSettings() {
  const credential = new DefaultAzureCredential();
  const client = new PortalServicesClient(credential);
  const result = await client.copilotSettings.update({
    properties: { accessControlEnabled: true },
  });
  console.log(result);
}

async function main() {
  await updateCopilotSettings();
}

main().catch(console.error);
