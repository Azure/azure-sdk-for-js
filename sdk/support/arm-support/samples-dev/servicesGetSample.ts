// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets a specific Azure service for support ticket creation.
 *
 * @summary Gets a specific Azure service for support ticket creation.
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/GetService.json
 */
async function getsDetailsOfTheAzureService(): Promise<void> {
  const serviceName = "service_guid";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.services.get(serviceName);
  console.log(result);
}

async function main(): Promise<void> {
  await getsDetailsOfTheAzureService();
}

main().catch(console.error);
