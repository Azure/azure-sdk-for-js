// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Data Plane access.
 *
 * @summary get Data Plane access.
 * x-ms-original-file: 2018-06-01/Factories_GetDataPlaneAccess.json
 */
async function factoriesGetDataPlaneAccess() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.factories.getDataPlaneAccess(
    "exampleResourceGroup",
    "exampleFactoryName",
    {
      accessResourcePath: "",
      expireTime: "2018-11-10T09:46:20.2659347Z",
      permissions: "r",
      profileName: "DefaultProfile",
      startTime: "2018-11-10T02:46:20.2659347Z",
    },
  );
  console.log(result);
}

async function main() {
  await factoriesGetDataPlaneAccess();
}

main().catch(console.error);
