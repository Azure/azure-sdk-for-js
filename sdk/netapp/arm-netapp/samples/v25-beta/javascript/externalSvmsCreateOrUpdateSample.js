// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update the specified External SVM
 *
 * @summary create or update the specified External SVM
 * x-ms-original-file: 2026-08-15-preview/ExternalSvms_CreateOrUpdate.json
 */
async function externalSvmsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.externalSvms.createOrUpdate(
    "contosoNetAppRg",
    "contoso-external-cluster",
    "contoso-svm",
    { location: "eastus", properties: { ontapSvmName: "contoso-svm" } },
  );
  console.log(result);
}

async function main() {
  await externalSvmsCreateOrUpdate();
}

main().catch(console.error);
