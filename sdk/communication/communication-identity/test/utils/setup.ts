// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createLiveCredential } from "@azure-tools/test-credential";
import type { TestProject } from "vitest/node";
import { EnvVarKeys } from "./constants.js";
import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { SecretClient } from "@azure/keyvault-secrets";
import * as MOCKS from "./constants.js";

declare module "vitest" {
  type MyEnvVarKeys = {
    [K in (typeof EnvVarKeys)[keyof typeof EnvVarKeys]]: string;
  };
  export interface ProvidedContext extends MyEnvVarKeys {
    [EnvVarKeys.TEST_MODE]: string | undefined;
  }
}

function assertEnvironmentVariable<
  T extends (typeof EnvVarKeys)[keyof Pick<typeof EnvVarKeys, "TEST_MODE">],
>(key: T): string | undefined;
function assertEnvironmentVariable(key: string): string;
function assertEnvironmentVariable(key: string): string | undefined {
  const value = process.env[key];
  if (key === EnvVarKeys.TEST_MODE) {
    return value?.toLowerCase();
  }
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined.`);
  }
  return value;
}

export default async function ({ provide }: TestProject): Promise<void> {
  const testMode = assertEnvironmentVariable(EnvVarKeys.TEST_MODE);
  if (["live", "record"].includes(testMode ?? "")) {
    const subId = assertEnvironmentVariable(EnvVarKeys.SUBSCRIPTION_ID);
    const rgName = assertEnvironmentVariable(EnvVarKeys.RESOURCE_GROUP);
    const resourceName = assertEnvironmentVariable(EnvVarKeys.ACCOUNT_NAME);
    const endpoint = assertEnvironmentVariable(EnvVarKeys.ENDPOINT);
    const cred = createLiveCredential();
    const mgmtClient = new CommunicationServiceManagementClient(cred, subId);
    const account = await mgmtClient.communicationServices.get(rgName, resourceName);
    if (!account) {
      throw new Error("Storage account is not defined.");
    }
    const { primaryConnectionString } = await mgmtClient.communicationServices.listKeys(
      rgName,
      resourceName,
    );
    if (!primaryConnectionString) {
      throw new Error("Key is not defined.");
    }
    let staticEnvVars: {
      COMMUNICATION_MSAL_USERNAME: string;
      COMMUNICATION_MSAL_PASSWORD: string;
      COMMUNICATION_M365_APP_ID: string;
      COMMUNICATION_M365_AAD_TENANT: string;
      COMMUNICATION_EXPIRED_TEAMS_TOKEN: string;
      COMMUNICATION_M365_AAD_AUTHORITY: string;
    };
    try {
      const kvClient = new SecretClient(
        assertEnvironmentVariable(EnvVarKeys.KEYVAULT_ENDPOINT),
        cred,
      );
      const secret = await kvClient.getSecret(
        "sub-config-communication-services-cloud-test-resources-common",
      );
      if (!secret) {
        throw new Error("Secret is not defined.");
      }
      const secretValue = secret.value;
      if (!secretValue) {
        throw new Error("Secret value is not defined.");
      }
      staticEnvVars = JSON.parse(secretValue).EnvironmentVariables;
    } catch {
      staticEnvVars = {
        COMMUNICATION_MSAL_USERNAME: assertEnvironmentVariable(
          EnvVarKeys.COMMUNICATION_MSAL_USERNAME,
        ),
        COMMUNICATION_MSAL_PASSWORD: assertEnvironmentVariable(
          EnvVarKeys.COMMUNICATION_MSAL_PASSWORD,
        ),
        COMMUNICATION_M365_APP_ID: assertEnvironmentVariable(EnvVarKeys.COMMUNICATION_M365_APP_ID),
        COMMUNICATION_M365_AAD_TENANT: assertEnvironmentVariable(
          EnvVarKeys.COMMUNICATION_M365_AAD_TENANT,
        ),
        COMMUNICATION_M365_AAD_AUTHORITY: assertEnvironmentVariable(
          EnvVarKeys.COMMUNICATION_M365_AAD_AUTHORITY,
        ),
        COMMUNICATION_EXPIRED_TEAMS_TOKEN: assertEnvironmentVariable(
          EnvVarKeys.COMMUNICATION_EXPIRED_TEAMS_TOKEN,
        ),
      };
    }
    provide(EnvVarKeys.ENDPOINT, endpoint);
    provide(EnvVarKeys.CONNECTION_STRING, primaryConnectionString);
    provide(EnvVarKeys.TEST_MODE, testMode);
    provide(EnvVarKeys.COMMUNICATION_MSAL_USERNAME, staticEnvVars.COMMUNICATION_MSAL_USERNAME);
    provide(EnvVarKeys.COMMUNICATION_MSAL_PASSWORD, staticEnvVars.COMMUNICATION_MSAL_PASSWORD);
    provide(EnvVarKeys.COMMUNICATION_M365_APP_ID, staticEnvVars.COMMUNICATION_M365_APP_ID);
    provide(EnvVarKeys.COMMUNICATION_M365_AAD_TENANT, staticEnvVars.COMMUNICATION_M365_AAD_TENANT);
    provide(
      EnvVarKeys.COMMUNICATION_EXPIRED_TEAMS_TOKEN,
      staticEnvVars.COMMUNICATION_EXPIRED_TEAMS_TOKEN,
    );
    provide(
      EnvVarKeys.COMMUNICATION_M365_AAD_AUTHORITY,
      staticEnvVars.COMMUNICATION_M365_AAD_AUTHORITY,
    );
  } else {
    provide(EnvVarKeys.ENDPOINT, MOCKS.ENDPOINT);
    provide(EnvVarKeys.CONNECTION_STRING, MOCKS.CONNECTION_STRING);
    provide(EnvVarKeys.TEST_MODE, testMode);
    provide(EnvVarKeys.COMMUNICATION_MSAL_USERNAME, MOCKS.COMMUNICATION_MSAL_USERNAME);
    provide(EnvVarKeys.COMMUNICATION_MSAL_PASSWORD, MOCKS.COMMUNICATION_MSAL_PASSWORD);
    provide(EnvVarKeys.COMMUNICATION_M365_APP_ID, MOCKS.COMMUNICATION_M365_APP_ID);
    provide(EnvVarKeys.COMMUNICATION_M365_AAD_TENANT, MOCKS.COMMUNICATION_M365_AAD_TENANT);
    provide(EnvVarKeys.COMMUNICATION_EXPIRED_TEAMS_TOKEN, MOCKS.COMMUNICATION_EXPIRED_TEAMS_TOKEN);
    provide(EnvVarKeys.COMMUNICATION_M365_AAD_AUTHORITY, MOCKS.COMMUNICATION_M365_AAD_AUTHORITY);
  }
}
