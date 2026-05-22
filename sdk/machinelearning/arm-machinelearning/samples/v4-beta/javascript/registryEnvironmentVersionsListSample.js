// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list versions.
 *
 * @summary list versions.
 * x-ms-original-file: 2025-12-01/Registry/EnvironmentVersion/list.json
 */
async function listRegistryEnvironmentVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.registryEnvironmentVersions.list(
    "test-rg",
    "my-aml-regsitry",
    "string",
    { orderBy: "string", top: 1 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRegistryEnvironmentVersion();
}

main().catch(console.error);
