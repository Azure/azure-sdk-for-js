// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PortalServicesClient } = require("@azure/arm-portalservicescopilot");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a CopilotSettingsResource
 *
 * @summary delete a CopilotSettingsResource
 * x-ms-original-file: 2024-04-01-preview/CopilotSettings_Delete.json
 */
async function deleteCopilotSettings() {
  const credential = new DefaultAzureCredential();
  const client = new PortalServicesClient(credential);
  await client.copilotSettings.delete();
}

async function main() {
  await deleteCopilotSettings();
}

main().catch(console.error);
