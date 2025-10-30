// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generate a [SAS Token](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview#how-a-shared-access-signature-works)
 * for the given storage account and container. The storage account and container
 * must be associated with a Planetary Computer dataset indexed by the STAC API.
 *
 * @summary generate a [SAS Token](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview#how-a-shared-access-signature-works)
 * for the given storage account and container. The storage account and container
 * must be associated with a Planetary Computer dataset indexed by the STAC API.
 * x-ms-original-file: 2025-04-30-preview/Sas_GetToken.json
 */
async function sasGetToken(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.sharedAccessSignature.getToken("naip-atl");
  console.log(result);
}

async function main(): Promise<void> {
  await sasGetToken();
}

main().catch(console.error);
