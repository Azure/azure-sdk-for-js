// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates named value.
 *
 * @summary creates or updates named value.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceNamedValue.json
 */
async function apiManagementCreateWorkspaceNamedValue() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceNamedValue.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "testprop2",
    { displayName: "prop3name", secret: false, tags: ["foo", "bar"], value: "propValue" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates named value.
 *
 * @summary creates or updates named value.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceNamedValueWithKeyVault.json
 */
async function apiManagementCreateWorkspaceNamedValueWithKeyVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceNamedValue.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "testprop6",
    {
      displayName: "prop6namekv",
      keyVault: {
        identityClientId: "ceaa6b06-c00f-43ef-99ac-f53d1fe876a0",
        secretIdentifier: "https://contoso.vault.azure.net/secrets/aadSecret",
      },
      secret: true,
      tags: ["foo", "bar"],
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateWorkspaceNamedValue();
  await apiManagementCreateWorkspaceNamedValueWithKeyVault();
}

main().catch(console.error);
