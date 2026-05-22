// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get blob reference SAS Uri.
 *
 * @summary get blob reference SAS Uri.
 * x-ms-original-file: 2025-12-01/DataReference/getBlobReferenceSAS.json
 */
async function getBlobReferenceSASDataReference() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.registryDataReferences.getBlobReferenceSAS(
    "test-rg",
    "registryName",
    "string",
    "string",
    { assetId: "string", blobUri: "https://www.contoso.com/example" },
  );
  console.log(result);
}

async function main() {
  await getBlobReferenceSASDataReference();
}

main().catch(console.error);
