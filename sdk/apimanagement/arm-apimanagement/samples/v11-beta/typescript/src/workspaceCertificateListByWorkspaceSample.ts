// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists a collection of all certificates in the specified workspace.
 *
 * @summary lists a collection of all certificates in the specified workspace.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListWorkspaceCertificates.json
 */
async function apiManagementListWorkspaceCertificates(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaceCertificate.listByWorkspace(
    "rg1",
    "apimService1",
    "wks1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListWorkspaceCertificates();
}

main().catch(console.error);
