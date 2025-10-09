// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NginxManagementClient } from "@azure/arm-nginx";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all certificates of given NGINX deployment
 *
 * @summary list all certificates of given NGINX deployment
 * x-ms-original-file: 2025-03-01-preview/Certificates_List.json
 */
async function certificatesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.certificates.list("myResourceGroup", "myDeployment")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await certificatesList();
}

main().catch(console.error);
