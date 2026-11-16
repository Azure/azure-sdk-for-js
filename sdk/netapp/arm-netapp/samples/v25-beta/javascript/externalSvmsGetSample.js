// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the External SVM resource
 *
 * @summary get the External SVM resource
 * x-ms-original-file: 2026-08-15-preview/ExternalSvms_Get.json
 */
async function externalSvmsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.externalSvms.get(
    "contosoNetAppRg",
    "contoso-external-cluster",
    "contoso-svm",
  );
  console.log(result);
}

async function main() {
  await externalSvmsGet();
}

main().catch(console.error);
