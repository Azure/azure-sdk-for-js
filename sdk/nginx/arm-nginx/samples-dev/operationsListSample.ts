// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List all operations provided by Nginx.NginxPlus for the 2024-11-01-preview api version.
 *
 * @summary List all operations provided by Nginx.NginxPlus for the 2024-11-01-preview api version.
 * x-ms-original-file: specification/nginx/resource-manager/NGINX.NGINXPLUS/preview/2024-11-01-preview/examples/Operations_List.json
 */

import { NginxManagementClient } from "@azure/arm-nginx";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function operationsList(): Promise<void> {
  const subscriptionId =
    process.env["NGINX_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new NginxManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await operationsList();
}

main().catch(console.error);
