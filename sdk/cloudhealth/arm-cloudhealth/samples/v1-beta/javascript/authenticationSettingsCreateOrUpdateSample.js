// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a AuthenticationSetting
 *
 * @summary create a AuthenticationSetting
 * x-ms-original-file: 2026-05-01-preview/AuthenticationSettings_CreateOrUpdate.json
 */
async function authenticationSettingsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.authenticationSettings.createOrUpdate(
    "online-store-rg",
    "online-store",
    "default-auth",
    {
      properties: {
        managedIdentityName: "SystemAssigned",
        displayName: "Default managed identity",
        authenticationKind: "ManagedIdentity",
      },
    },
  );
  console.log(result);
}

async function main() {
  await authenticationSettingsCreateOrUpdate();
}

main().catch(console.error);
