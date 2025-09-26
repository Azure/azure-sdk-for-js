// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get the status of a specific operation in the specified managed cluster.
 *
 * @summary Get the status of a specific operation in the specified managed cluster.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/OperationStatusResultGet.json
 */
async function getOperationStatusResult() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const operationId = "00000000-0000-0000-0000-000000000001";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.operationStatusResultOperations.get(
    resourceGroupName,
    resourceName,
    operationId,
  );
  console.log(result);
}

async function main() {
  await getOperationStatusResult();
}

main().catch(console.error);
