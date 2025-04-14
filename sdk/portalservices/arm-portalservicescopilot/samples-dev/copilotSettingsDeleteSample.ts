// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PortalServicesClient } from "@azure/arm-portalservicescopilot";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a CopilotSettingsResource
 *
 * @summary delete a CopilotSettingsResource
 * x-ms-original-file: 2024-04-01-preview/CopilotSettings_Delete.json
 */
async function deleteCopilotSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PortalServicesClient(credential, subscriptionId);
  await client.copilotSettings.delete();
}

async function main(): Promise<void> {
  await deleteCopilotSettings();
}

main().catch(console.error);
