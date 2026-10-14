// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a collection of environments.
 *
 * @summary returns a collection of environments.
 * x-ms-original-file: 2024-06-01-preview/Environments_List.json
 */
async function environmentsListByWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.environments.list("contoso-resources", "contoso", "default")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await environmentsListByWorkspace();
}

main().catch(console.error);
