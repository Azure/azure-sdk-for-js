// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list supported trusted access roles.
 *
 * @summary list supported trusted access roles.
 * x-ms-original-file: 2025-10-02-preview/TrustedAccessRoles_List.json
 */
async function listTrustedAccessRoles(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.trustedAccessRoles.list("westus2")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listTrustedAccessRoles();
}

main().catch(console.error);
