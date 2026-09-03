// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Credential
 *
 * @summary create a Credential
 * x-ms-original-file: 2026-03-01-preview/CreateOrReplace_Credentials.json
 */
async function createOrReplaceCredentials(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.credentials.createOrUpdate("rgdeviceregistry", "mynamespace", {
    properties: {},
    tags: { key7121: "mtdjqipusqaqhdvekrknyjeo" },
    location: "East US 2",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrReplaceCredentials();
}

main().catch(console.error);
