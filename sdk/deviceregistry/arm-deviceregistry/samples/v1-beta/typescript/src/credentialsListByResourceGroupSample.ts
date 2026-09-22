// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Credential resources by Namespace
 *
 * @summary list Credential resources by Namespace
 * x-ms-original-file: 2026-03-01-preview/List_Credentials_ByResourceGroup.json
 */
async function listCredentialsByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.credentials.listByResourceGroup(
    "rgdeviceregistry",
    "mynamespace",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listCredentialsByResourceGroup();
}

main().catch(console.error);
