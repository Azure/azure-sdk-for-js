// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a custom certificate.
 *
 * @summary delete a custom certificate.
 * x-ms-original-file: 2025-01-01-preview/SignalRCustomCertificates_Delete.json
 */
async function signalRCustomCertificatesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  await client.signalRCustomCertificates.delete("myResourceGroup", "mySignalRService", "myCert");
}

async function main(): Promise<void> {
  await signalRCustomCertificatesDelete();
}

main().catch(console.error);
