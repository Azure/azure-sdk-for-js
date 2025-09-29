// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  EncryptionScope,
  CognitiveServicesManagementClient,
} from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update the state of specified encryptionScope associated with the Cognitive Services account.
 *
 * @summary Update the state of specified encryptionScope associated with the Cognitive Services account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/PutEncryptionScope.json
 */
async function putEncryptionScope(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const encryptionScopeName = "encryptionScopeName";
  const encryptionScope: EncryptionScope = {
    properties: {
      keySource: "Microsoft.KeyVault",
      keyVaultProperties: {
        identityClientId: "00000000-0000-0000-0000-000000000000",
        keyName: "DevKeyWestUS2",
        keyVaultUri: "https://devkvwestus2.vault.azure.net/",
        keyVersion: "9f85549d7bf14ff4bf178c10d3bdca95",
      },
      state: "Enabled",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.encryptionScopes.createOrUpdate(
    resourceGroupName,
    accountName,
    encryptionScopeName,
    encryptionScope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putEncryptionScope();
}

main().catch(console.error);
