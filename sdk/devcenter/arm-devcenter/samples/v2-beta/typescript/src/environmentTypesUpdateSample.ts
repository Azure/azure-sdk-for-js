// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to partially updates an environment type.
 *
 * @summary partially updates an environment type.
 * x-ms-original-file: 2026-01-01-preview/EnvironmentTypes_Patch.json
 */
async function environmentTypesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.environmentTypes.update("rg1", "Contoso", "DevTest", {
    displayName: "Dev",
    tags: { Owner: "superuser" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await environmentTypesUpdate();
}

main().catch(console.error);
