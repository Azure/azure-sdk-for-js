// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to update a CopilotSettingsResource
 *
 * @summary update a CopilotSettingsResource
 * x-ms-original-file: 2024-04-01-preview/CopilotSettings_Update.json
 */

import { PortalServicesClient } from "@azure/arm-portalservicescopilot";
import { DefaultAzureCredential } from "@azure/identity";

async function updateCopilotSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PortalServicesClient(credential);
  const result = await client.copilotSettings.update({
    properties: { accessControlEnabled: true },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateCopilotSettings();
}

main().catch(console.error);
