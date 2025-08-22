// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update the AuthConfig for a Container App.
 *
 * @summary Create or update the AuthConfig for a Container App.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/AuthConfigs_CreateOrUpdate.json
 */

import { AuthConfig, ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateContainerAppAuthConfig(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "651f8027-33e8-4ec4-97b4-f6e9f3dc8744";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "workerapps-rg-xj";
  const containerAppName = "testcanadacentral";
  const authConfigName = "current";
  const authConfigEnvelope: AuthConfig = {
    encryptionSettings: {
      containerAppAuthEncryptionSecretName: "testEncryptionSecretName",
      containerAppAuthSigningSecretName: "testSigningSecretName",
    },
    globalValidation: { unauthenticatedClientAction: "AllowAnonymous" },
    identityProviders: {
      facebook: {
        registration: { appId: "123", appSecretSettingName: "facebook-secret" },
      },
    },
    platform: { enabled: true },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsAuthConfigs.createOrUpdate(
    resourceGroupName,
    containerAppName,
    authConfigName,
    authConfigEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateContainerAppAuthConfig();
}

main().catch(console.error);
