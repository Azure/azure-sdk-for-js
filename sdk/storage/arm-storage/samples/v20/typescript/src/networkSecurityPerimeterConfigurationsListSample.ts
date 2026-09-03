// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets list of effective NetworkSecurityPerimeterConfiguration for storage account
 *
 * @summary gets list of effective NetworkSecurityPerimeterConfiguration for storage account
 * x-ms-original-file: 2026-04-01/NetworkSecurityPerimeterConfigurationList.json
 */
async function networkSecurityPerimeterConfigurationList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterConfigurations.list(
    "res4410",
    "sto8607",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await networkSecurityPerimeterConfigurationList();
}

main().catch(console.error);
