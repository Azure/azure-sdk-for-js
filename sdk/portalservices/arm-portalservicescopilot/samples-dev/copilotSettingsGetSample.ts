// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get a CopilotSettingsResource
 *
 * @summary get a CopilotSettingsResource
 * x-ms-original-file: 2024-04-01-preview/CopilotSettings_Get.json
 */

import { PortalServicesClient } from "@azure/arm-portalservicescopilot";
import { DefaultAzureCredential } from "@azure/identity";

async function getCopilotSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PortalServicesClient(credential);
  const result = await client.copilotSettings.get();
  console.log(result);
}

async function main(): Promise<void> {
  await getCopilotSettings();
}

main().catch(console.error);
