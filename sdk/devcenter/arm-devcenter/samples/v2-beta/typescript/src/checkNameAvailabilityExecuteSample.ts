// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check the availability of name for resource.
 *
 * @summary check the availability of name for resource.
 * x-ms-original-file: 2026-01-01-preview/CheckNameAvailability.json
 */
async function nameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.checkNameAvailability.execute({
    name: "name1",
    type: "Microsoft.DevCenter/devcenters",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await nameAvailability();
}

main().catch(console.error);
