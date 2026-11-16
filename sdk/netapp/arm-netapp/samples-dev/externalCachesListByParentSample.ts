// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all External Caches under an External SVM
 *
 * @summary list all External Caches under an External SVM
 * x-ms-original-file: 2026-08-15-preview/ExternalCaches_ListByParent.json
 */
async function externalCachesListByParent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.externalCaches.listByParent(
    "contosoNetAppRg",
    "contosoExternalCluster",
    "contosoExternalSvm",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await externalCachesListByParent();
}

main().catch(console.error);
