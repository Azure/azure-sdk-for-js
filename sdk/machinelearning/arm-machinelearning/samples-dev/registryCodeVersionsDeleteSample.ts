// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete version.
 *
 * @summary Delete version.
 * x-ms-original-file: specification/machinelearningservices/resource-manager/Microsoft.MachineLearningServices/stable/2024-04-01/examples/Registry/CodeVersion/delete.json
 */

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteRegistryCodeVersion(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNING_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["MACHINELEARNING_RESOURCE_GROUP"] || "test-rg";
  const registryName = "my-aml-registry";
  const codeName = "string";
  const version = "string";
  const credential = new DefaultAzureCredential();
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.registryCodeVersions.beginDeleteAndWait(
    resourceGroupName,
    registryName,
    codeName,
    version,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteRegistryCodeVersion();
}

main().catch(console.error);
