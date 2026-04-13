// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets alert definitions for a resource scope.
 *
 * @summary gets alert definitions for a resource scope.
 * x-ms-original-file: 2022-08-01-preview/GetAlertDefinitions.json
 */
async function getAlertDefinitions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.alertDefinitions.listForScope(
    "subscriptions/afa2a084-766f-4003-8ae1-c4aeb893a99f",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAlertDefinitions();
}

main().catch(console.error);
