// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all External SVMs under an External Cluster
 *
 * @summary list all External SVMs under an External Cluster
 * x-ms-original-file: 2026-08-15-preview/ExternalSvms_ListByParent.json
 */
async function externalSvmsListByParent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.externalSvms.listByParent(
    "contosoNetAppRg",
    "contoso-external-cluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await externalSvmsListByParent();
}

main().catch(console.error);
