// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a custom certificate.
 *
 * @summary get a custom certificate.
 * x-ms-original-file: 2025-01-01-preview/SignalRCustomCertificates_Get.json
 */
async function signalRCustomCertificatesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const result = await client.signalRCustomCertificates.get(
    "myResourceGroup",
    "mySignalRService",
    "myCert",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await signalRCustomCertificatesGet();
}

main().catch(console.error);
