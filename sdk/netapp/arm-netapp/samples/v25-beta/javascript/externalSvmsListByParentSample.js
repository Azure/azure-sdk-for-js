// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all External SVMs under an External Cluster
 *
 * @summary list all External SVMs under an External Cluster
 * x-ms-original-file: 2026-08-15-preview/ExternalSvms_ListByParent.json
 */
async function externalSvmsListByParent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.externalSvms.listByParent(
    "contosoNetAppRg",
    "contoso-external-cluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await externalSvmsListByParent();
}

main().catch(console.error);
