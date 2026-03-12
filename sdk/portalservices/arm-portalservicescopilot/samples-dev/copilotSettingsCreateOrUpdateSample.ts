// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a CopilotSettingsResource
 *
 * @summary create a CopilotSettingsResource
 * x-ms-original-file: 2024-04-01-preview/CopilotSettings_CreateOrUpdate.json
 */

import { PortalServicesClient } from "@azure/arm-portalservicescopilot";
import { DefaultAzureCredential } from "@azure/identity";

async function createANewCopilotSettingsOrUpdateAnExistingOne(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PortalServicesClient(credential);
  const result = await client.copilotSettings.createOrUpdate({
    properties: { accessControlEnabled: true },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createANewCopilotSettingsOrUpdateAnExistingOne();
}

main().catch(console.error);
