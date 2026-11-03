// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all custom certificates.
 *
 * @summary list all custom certificates.
 * x-ms-original-file: 2025-01-01-preview/SignalRCustomCertificates_List.json
 */
async function signalRCustomCertificatesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.signalRCustomCertificates.list(
    "myResourceGroup",
    "mySignalRService",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await signalRCustomCertificatesList();
}

main().catch(console.error);
