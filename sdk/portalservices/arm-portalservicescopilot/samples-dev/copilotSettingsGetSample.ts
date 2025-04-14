// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PortalServicesClient } from "@azure/arm-portalservicescopilot";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a CopilotSettingsResource
 *
 * @summary get a CopilotSettingsResource
 * x-ms-original-file: 2024-04-01-preview/CopilotSettings_Get.json
 */
async function getCopilotSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PortalServicesClient(credential, subscriptionId);
  const result = await client.copilotSettings.get();
  console.log(result);
}

async function main(): Promise<void> {
  await getCopilotSettings();
}

main().catch(console.error);
