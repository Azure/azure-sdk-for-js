// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to signs a HREF (a link URL) by appending a [SAS Token](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview#how-a-shared-access-signature-works).
 * If the HREF is not a Azure Blob Storage HREF, then pass back the HREF unsigned.
 *
 * @summary signs a HREF (a link URL) by appending a [SAS Token](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview#how-a-shared-access-signature-works).
 * If the HREF is not a Azure Blob Storage HREF, then pass back the HREF unsigned.
 * x-ms-original-file: 2025-04-30-preview/Sas_GetSign.json
 */
async function sasGetSign(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.sharedAccessSignature.getSign(
    "https://SANITIZED.blob.core.windows.net/naip-atl-00000000/collection-assets/thumbnail/thumbnail.png",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await sasGetSign();
}

main().catch(console.error);
