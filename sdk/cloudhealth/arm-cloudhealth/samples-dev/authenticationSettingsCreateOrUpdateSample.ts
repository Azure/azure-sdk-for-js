// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a AuthenticationSetting
 *
 * @summary create a AuthenticationSetting
 * x-ms-original-file: 2025-05-01-preview/AuthenticationSettings_CreateOrUpdate.json
 */

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

async function authenticationSettingsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.authenticationSettings.createOrUpdate(
    "myResourceGroup",
    "myHealthModel",
    "myAuthSetting",
    {
      properties: {
        managedIdentityName: "SystemAssigned",
        displayName: "myDisplayName",
        authenticationKind: "ManagedIdentity",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await authenticationSettingsCreateOrUpdate();
}

main().catch(console.error);
