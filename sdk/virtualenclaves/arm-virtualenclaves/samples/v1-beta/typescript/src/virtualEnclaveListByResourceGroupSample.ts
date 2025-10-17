// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-virtualenclaves";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list EnclaveResource resources by resource group
 *
 * @summary list EnclaveResource resources by resource group
 * x-ms-original-file: 2025-05-01-preview/VirtualEnclave_ListByResourceGroup.json
 */
async function virtualEnclaveListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CA1CB369-DD26-4DB2-9D43-9AFEF0F22093";
  const client = new MissionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualEnclave.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await virtualEnclaveListByResourceGroup();
}

main().catch(console.error);
