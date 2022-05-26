// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary SecretReference represents a configuration setting that references as KeyVault secret.
 */
import {
  AppConfigurationClient,
  SecretReferenceValue,
  secretReferenceContentType,
  ConfigurationSetting,
  parseSecretReference,
} from "@azure/app-configuration";
import { parseKeyVaultSecretIdentifier, SecretClient } from "@azure/keyvault-secrets";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log(`Running secretReference sample`);

  const key = `secret${new Date().getTime()}`;

  // setup method creates
  // - a secret using `@azure/keyvault-secrets`
  // - a corresponding secret reference config setting with `@azure/app-configuration`
  await setup(key);

  console.log(`Get the added secretReference from App Config with key: ${key}`);
  // Set the following environment variable or edit the value on the following line.
  const connectionString = process.env["APPCONFIG_CONNECTION_STRING"] || "";
  const appConfigClient = new AppConfigurationClient(connectionString);
  const getResponse = await appConfigClient.getConfigurationSetting({
    key,
  });
  // You can use the `isSecretReference` global method to check if the content type is secretReferenceContentType ("application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8")

  const parsedSecretReference = parseSecretReference(getResponse);

  // Get the name and vaultUrl from the secretId
  const { name: secretName, vaultUrl } = parseKeyVaultSecretIdentifier(
    parsedSecretReference.value.secretId
  );

  const secretClient = new SecretClient(vaultUrl, new DefaultAzureCredential());
  try {
    // Read the secret we created
    const secret = await secretClient.getSecret(secretName);
    console.log(`Get the secret from keyvault key: ${secretName}, value: ${secret.value}`);
  } catch (err: any) {
    const error = err as { code: string; statusCode: number };
    if (error.code === "SecretNotFound" && error.statusCode === 404) {
      throw new Error(
        `\n Secret is not found, make sure the secret ${parsedSecretReference.value.secretId} is present in your keyvault account;\n Original error - ${error}`
      );
    } else {
      throw err;
    }
  }

  console.log(`Deleting the secret from keyvault`);
  await secretClient.beginDeleteSecret(secretName);

  await cleanupSampleValues([key], appConfigClient);
}

async function setup(key: string) {
  if (
    !process.env["AZURE_TENANT_ID"] ||
    !process.env["AZURE_CLIENT_ID"] ||
    !process.env["AZURE_CLIENT_SECRET"] ||
    !process.env["KEYVAULT_URI"] ||
    !process.env["APPCONFIG_CONNECTION_STRING"]
  ) {
    console.log(
      `At least one of the AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, APPCONFIG_CONNECTION_STRING and KEYVAULT_URI variables is not present, 
      please add the missing ones in your environment and rerun the sample.`
    );
    return;
  }

  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const secretClient = new SecretClient(process.env["KEYVAULT_URI"], new DefaultAzureCredential());
  const secretName = `secret-${Date.now()}`;
  // Create a secret
  console.log(`Create a keyvault secret with key: ${secretName}  and value: "MySecretValue"`);
  const secret = await secretClient.setSecret(secretName, "MySecretValue");

  if (!secret.properties.id) {
    throw new Error("Something went wrong - secret id is undefined");
  }

  // creates the secret reference config setting
  await createConfigSetting(key, secret.properties.id);
}

async function createConfigSetting(key: string, secretId: string) {
  // Set the following environment variable or edit the value on the following line.
  const connectionString = process.env["APPCONFIG_CONNECTION_STRING"] || "<connection string>";
  const appConfigClient = new AppConfigurationClient(connectionString);

  const secretReference: ConfigurationSetting<SecretReferenceValue> = {
    key,
    value: { secretId },
    isReadOnly: false,
    contentType: secretReferenceContentType,
  };

  await cleanupSampleValues([key], appConfigClient);

  console.log(
    `Add a new secretReference with key: ${key} and secretId: ${secretReference.value.secretId}`
  );
  await appConfigClient.addConfigurationSetting(secretReference);
}

async function cleanupSampleValues(keys: string[], client: AppConfigurationClient) {
  const settingsIterator = client.listConfigurationSettings({
    keyFilter: keys.join(","),
  });

  for await (const setting of settingsIterator) {
    await client.deleteConfigurationSetting({ key: setting.key, label: setting.label });
  }
}

main().catch((err) => {
  console.error("Failed to run sample:", err);
  process.exit(1);
});
