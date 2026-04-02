// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create Cognitive Services Account. Accounts is a resource group wide resource type. It holds the keys for developer to access intelligent APIs. It's also the resource type for billing.
 *
 * @summary create Cognitive Services Account. Accounts is a resource group wide resource type. It holds the keys for developer to access intelligent APIs. It's also the resource type for billing.
 * x-ms-original-file: 2026-01-15-preview/CreateAccount.json
 */
async function createAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accounts.create("myResourceGroup", "testCreate1", {
    identity: { type: "SystemAssigned" },
    kind: "Emotion",
    location: "West US",
    properties: {
      encryption: {
        keySource: "Microsoft.KeyVault",
        keyVaultProperties: {
          keyName: "KeyName",
          keyVaultUri: "https://pltfrmscrts-use-pc-dev.vault.azure.net/",
          keyVersion: "891CF236-D241-4738-9462-D506AF493DFA",
        },
      },
      userOwnedStorage: [
        {
          resourceId:
            "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/myResourceGroup/providers/Microsoft.Storage/storageAccounts/myStorageAccount",
        },
      ],
    },
    sku: { name: "S0" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create Cognitive Services Account. Accounts is a resource group wide resource type. It holds the keys for developer to access intelligent APIs. It's also the resource type for billing.
 *
 * @summary create Cognitive Services Account. Accounts is a resource group wide resource type. It holds the keys for developer to access intelligent APIs. It's also the resource type for billing.
 * x-ms-original-file: 2026-01-15-preview/CreateAccountMin.json
 */
async function createAccountMin(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accounts.create("myResourceGroup", "testCreate1", {
    identity: { type: "SystemAssigned" },
    kind: "CognitiveServices",
    location: "West US",
    properties: {},
    sku: { name: "S0" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createAccount();
  await createAccountMin();
}

main().catch(console.error);
