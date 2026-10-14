// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureSphereClient } = require("@azure/arm-sphere");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name.
 *
 * @summary create a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name.
 * x-ms-original-file: 2024-04-01/PutDeployment.json
 */
async function deploymentsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const result = await client.deployments.createOrUpdate(
    "MyResourceGroup1",
    "MyCatalog1",
    "MyProduct1",
    "myDeviceGroup1",
    "MyDeployment1",
    {},
  );
  console.log(result);
}

async function main() {
  await deploymentsCreateOrUpdate();
}

main().catch(console.error);
