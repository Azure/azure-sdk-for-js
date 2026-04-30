// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMapsManagementClient } from "@azure/arm-maps";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create and list an account shared access signature token. Use this SAS token for authentication to Azure Maps REST APIs through various Azure Maps SDKs. As prerequisite to create a SAS Token.
 *
 * Prerequisites:
 * 1. Create or have an existing User Assigned Managed Identity in the same Azure region as the account.
 * 2. Create or update an Azure Maps account with the same Azure region as the User Assigned Managed Identity is placed.
 *
 * @summary create and list an account shared access signature token. Use this SAS token for authentication to Azure Maps REST APIs through various Azure Maps SDKs. As prerequisite to create a SAS Token.
 *
 * Prerequisites:
 * 1. Create or have an existing User Assigned Managed Identity in the same Azure region as the account.
 * 2. Create or update an Azure Maps account with the same Azure region as the User Assigned Managed Identity is placed.
 * x-ms-original-file: 2025-10-01-preview/AccountListSAS.json
 */
async function listAccountSas(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const result = await client.accounts.listSas("myResourceGroup", "myMapsAccount", {
    expiry: "2017-05-24T11:42:03.1567373Z",
    maxRatePerSecond: 500,
    principalId: "e917f87b-324d-4728-98ed-e31d311a7d65",
    regions: ["eastus"],
    signingKey: "primaryKey",
    start: "2017-05-24T10:42:03.1567373Z",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await listAccountSas();
}

main().catch(console.error);
