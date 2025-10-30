// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to revoke a [SAS Token](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview#how-a-shared-access-signature-works)
 * for managed storage account of this GeoCatalog.
 *
 * @summary revoke a [SAS Token](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview#how-a-shared-access-signature-works)
 * for managed storage account of this GeoCatalog.
 * x-ms-original-file: 2025-04-30-preview/Sas_RevokeToken.json
 */
async function sasRevokeToken(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  await client.sharedAccessSignature.revokeToken();
}

async function main(): Promise<void> {
  await sasRevokeToken();
}

main().catch(console.error);
