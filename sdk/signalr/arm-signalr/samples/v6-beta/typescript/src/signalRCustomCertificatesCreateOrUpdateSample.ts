// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementClient } from "@azure/arm-signalr";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a custom certificate.
 *
 * @summary create or update a custom certificate.
 * x-ms-original-file: 2025-01-01-preview/SignalRCustomCertificates_CreateOrUpdate.json
 */
async function signalRCustomCertificatesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SignalRManagementClient(credential, subscriptionId);
  const result = await client.signalRCustomCertificates.createOrUpdate(
    "myResourceGroup",
    "mySignalRService",
    "myCert",
    {
      keyVaultBaseUri: "https://myvault.keyvault.azure.net/",
      keyVaultSecretName: "mycert",
      keyVaultSecretVersion: "bb6a44b2743f47f68dad0d6cc9756432",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await signalRCustomCertificatesCreateOrUpdate();
}

main().catch(console.error);
