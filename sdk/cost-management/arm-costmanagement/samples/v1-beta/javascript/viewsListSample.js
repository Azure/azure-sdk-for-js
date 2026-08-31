// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all views by tenant and object.
 *
 * @summary lists all views by tenant and object.
 * x-ms-original-file: 2025-03-01/PrivateViewList.json
 */
async function privateViewList() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.views.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await privateViewList();
}

main().catch(console.error);
