// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a specific Azure service for support ticket creation.
 *
 * @summary gets a specific Azure service for support ticket creation.
 * x-ms-original-file: 2026-07-01/GetService.json
 */
async function getsDetailsOfTheAzureService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.services.get("service_guid");
  console.log(result);
}

async function main(): Promise<void> {
  await getsDetailsOfTheAzureService();
}

main().catch(console.error);
