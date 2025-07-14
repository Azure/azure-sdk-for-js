// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PortalServicesClient } = require("@azure/arm-portalservicescopilot");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a CopilotSettingsResource
 *
 * @summary create a CopilotSettingsResource
 * x-ms-original-file: 2024-04-01-preview/CopilotSettings_CreateOrUpdate.json
 */
async function createANewCopilotSettingsOrUpdateAnExistingOne() {
  const credential = new DefaultAzureCredential();
  const client = new PortalServicesClient(credential);
  const result = await client.copilotSettings.createOrUpdate({
    properties: { accessControlEnabled: true },
  });
  console.log(result);
}

async function main() {
  await createANewCopilotSettingsOrUpdateAnExistingOne();
}

main().catch(console.error);
