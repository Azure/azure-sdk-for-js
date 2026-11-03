// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the specified External SVM
 *
 * @summary delete the specified External SVM
 * x-ms-original-file: 2026-08-15-preview/ExternalSvms_Delete.json
 */
async function externalSvmsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.externalSvms.delete("contosoNetAppRg", "contoso-external-cluster", "contoso-svm");
}

async function main(): Promise<void> {
  await externalSvmsDelete();
}

main().catch(console.error);
