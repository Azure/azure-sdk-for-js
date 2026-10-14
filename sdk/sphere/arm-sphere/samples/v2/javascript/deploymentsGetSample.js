// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureSphereClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name.
 *
 * @summary get a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name.
 * x-ms-original-file: 2024-04-01/GetDeployment.json
 */
async function deploymentsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const result = await client.deployments.get(
    "MyResourceGroup1",
    "MyCatalog1",
    "MyProduct1",
    "myDeviceGroup1",
    "MyDeployment1",
  );
  console.log(result);
}

async function main() {
  await deploymentsGet();
}

main().catch(console.error);
