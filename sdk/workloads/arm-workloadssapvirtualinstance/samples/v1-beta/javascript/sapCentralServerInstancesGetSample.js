// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadsClient } = require("@azure/arm-workloadssapvirtualinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the SAP Central Services Instance resource.
 *
 * @summary gets the SAP Central Services Instance resource.
 * x-ms-original-file: 2024-09-01/SapCentralInstances_Get.json
 */
async function sapCentralServerInstancesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6d875e77-e412-4d7d-9af4-8895278b4443";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapCentralServerInstances.get("test-rg", "X00", "centralServer");
  console.log(result);
}

async function main() {
  await sapCentralServerInstancesGet();
}

main().catch(console.error);
