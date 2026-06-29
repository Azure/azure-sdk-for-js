// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the existing origins within an origin group.
 *
 * @summary lists all of the existing origins within an origin group.
 * x-ms-original-file: 2025-12-01/AFDOrigins_ListByOriginGroup.json
 */
async function afdOriginsListByOriginGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.afdOrigins.listByOriginGroup("RG", "profile1", "origingroup1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await afdOriginsListByOriginGroup();
}

main().catch(console.error);
