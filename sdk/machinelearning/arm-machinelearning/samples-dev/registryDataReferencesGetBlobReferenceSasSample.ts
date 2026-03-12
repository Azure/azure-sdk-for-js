// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get blob reference SAS Uri.
 *
 * @summary Get blob reference SAS Uri.
 * x-ms-original-file: specification/machinelearningservices/resource-manager/Microsoft.MachineLearningServices/stable/2024-04-01/examples/DataReference/getBlobReferenceSAS.json
 */

import type { GetBlobReferenceSASRequestDto } from "@azure/arm-machinelearning";
import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getBlobReferenceSasDataReference(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNING_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["MACHINELEARNING_RESOURCE_GROUP"] || "test-rg";
  const registryName = "registryName";
  const name = "string";
  const version = "string";
  const body: GetBlobReferenceSASRequestDto = {
    assetId: "string",
    blobUri: "https://www.contoso.com/example",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.registryDataReferences.getBlobReferenceSAS(
    resourceGroupName,
    registryName,
    name,
    version,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getBlobReferenceSasDataReference();
}

main().catch(console.error);
