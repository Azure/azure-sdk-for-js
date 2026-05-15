// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of service tags supported by NSP. These service tags can be used to create access rules in NSP.
 *
 * @summary gets the list of service tags supported by NSP. These service tags can be used to create access rules in NSP.
 * x-ms-original-file: 2025-05-01/NspServiceTagsList.json
 */
async function nspServiceTagsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterServiceTags.list("westus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await nspServiceTagsList();
}

main().catch(console.error);
