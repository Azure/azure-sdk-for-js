// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the specified External SVM
 *
 * @summary delete the specified External SVM
 * x-ms-original-file: 2026-08-15-preview/ExternalSvms_Delete.json
 */
async function externalSvmsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.externalSvms.delete("contosoNetAppRg", "contoso-external-cluster", "contoso-svm");
}

async function main() {
  await externalSvmsDelete();
}

main().catch(console.error);
