// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PortalServicesClient } from "@azure/arm-portalservicescopilot";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a CopilotSettingsResource
 *
 * @summary update a CopilotSettingsResource
 * x-ms-original-file: 2024-04-01-preview/CopilotSettings_Update.json
 */
async function updateCopilotSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PortalServicesClient(credential, subscriptionId);
  const result = await client.copilotSettings.update({
    properties: { accessControlEnabled: true },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateCopilotSettings();
}

main().catch(console.error);
