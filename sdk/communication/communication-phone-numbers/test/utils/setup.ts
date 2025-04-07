// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createLiveCredential } from "@azure-tools/test-credential";
import type { TestProject } from "vitest/node";
import { EnvVarKeys } from "./constants.js";
import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import { SecretClient } from "@azure/keyvault-secrets";
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";
import * as MOCKS from "./constants.js";
import type { TokenCredential } from "@azure/core-auth";
import { parseConnectionString } from "@azure/communication-common";

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

export default async function ({ provide }: TestProject): Promise<() => Promise<void>> {
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
      COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING: string;
      AZURE_TEST_DOMAIN: string;
      AZURE_USERAGENT_OVERRIDE: string;
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
        AZURE_TEST_DOMAIN: assertEnvironmentVariable(EnvVarKeys.AZURE_TEST_DOMAIN),
        AZURE_USERAGENT_OVERRIDE: assertEnvironmentVariable(EnvVarKeys.AZURE_USERAGENT_OVERRIDE),
        COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING: assertEnvironmentVariable(
          EnvVarKeys.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING,
        ),
      };
    }
    const { phoneNumber, releaser } = await getPhoneNumber(endpoint, cred);
    provide(EnvVarKeys.ENDPOINT, endpoint);
    provide(EnvVarKeys.CONNECTION_STRING, primaryConnectionString);
    provide(EnvVarKeys.AZURE_TEST_DOMAIN, staticEnvVars.AZURE_TEST_DOMAIN);
    provide(EnvVarKeys.AZURE_USERAGENT_OVERRIDE, staticEnvVars.AZURE_USERAGENT_OVERRIDE);
    provide(EnvVarKeys.AZURE_PHONE_NUMBER, phoneNumber);
    provide(
      EnvVarKeys.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING,
      staticEnvVars.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING,
    );
    provide(
      EnvVarKeys.COMMUNICATION_LIVETEST_DYNAMIC_ENDPOINT,
      parseConnectionString(staticEnvVars.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING)
        .endpoint,
    );
    provide(EnvVarKeys.TEST_MODE, testMode);
    return releaser;
  } else {
    provide(EnvVarKeys.ENDPOINT, MOCKS.ENDPOINT);
    provide(EnvVarKeys.CONNECTION_STRING, MOCKS.CONNECTION_STRING);
    provide(EnvVarKeys.AZURE_TEST_DOMAIN, MOCKS.AZURE_TEST_DOMAIN);
    provide(EnvVarKeys.AZURE_USERAGENT_OVERRIDE, MOCKS.AZURE_USERAGENT_OVERRIDE);
    provide(EnvVarKeys.AZURE_PHONE_NUMBER, MOCKS.AZURE_PHONE_NUMBER);
    provide(EnvVarKeys.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING, MOCKS.CONNECTION_STRING);
    provide(EnvVarKeys.COMMUNICATION_LIVETEST_DYNAMIC_ENDPOINT, MOCKS.ENDPOINT);
    provide(EnvVarKeys.TEST_MODE, testMode);
    return async () => {};
  }
}

async function getPhoneNumber(
  endpoint: string,
  credential: TokenCredential,
): Promise<{
  phoneNumber: string;
  releaser: () => Promise<void>;
}> {
  const client = new PhoneNumbersClient(endpoint, credential);

  const searchPoller = await client.beginSearchAvailablePhoneNumbers({
    countryCode: "US",
    phoneNumberType: "tollFree",
    assignmentType: "application",
    capabilities: {
      sms: "outbound",
      calling: "none",
    },
    quantity: 1,
  });
  const { searchId, phoneNumbers } = await searchPoller.pollUntilDone();
  const purchasePoller = await client.beginPurchasePhoneNumbers(searchId);
  await purchasePoller.pollUntilDone();
  return {
    phoneNumber: phoneNumbers[0],
    releaser: async () => {
      const releasePoller = await client.beginReleasePhoneNumber(phoneNumbers[0]);
      await releasePoller.pollUntilDone();
    },
  };
}
