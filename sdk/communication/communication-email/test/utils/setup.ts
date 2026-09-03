// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createLiveCredential } from "@azure-tools/test-credential";
import type { TestProject } from "vitest/node";
import { EnvVarKeys } from "./constants.js";
import { CommunicationServiceManagementClient } from "@azure/arm-communication";
import * as MOCKS from "./constants.js";

declare module "vitest" {
  type MyEnvVarKeys = {
    [K in (typeof EnvVarKeys)[keyof typeof EnvVarKeys]]: K extends typeof EnvVarKeys.TEST_MODE
      ? string | undefined
      : string;
  };
  export interface ProvidedContext extends MyEnvVarKeys {}
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
    const senderAddress = assertEnvironmentVariable(EnvVarKeys.SENDER_ADDRESS);
    const recipientAddress = assertEnvironmentVariable(EnvVarKeys.RECIPIENT_ADDRESS);
    const secondRecipientAddress = assertEnvironmentVariable(EnvVarKeys.SECOND_RECIPIENT_ADDRESS);
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
    provide(EnvVarKeys.ENDPOINT, endpoint);
    provide(EnvVarKeys.CONNECTION_STRING, primaryConnectionString);
    provide(EnvVarKeys.SENDER_ADDRESS, senderAddress);
    provide(EnvVarKeys.RECIPIENT_ADDRESS, recipientAddress);
    provide(EnvVarKeys.SECOND_RECIPIENT_ADDRESS, secondRecipientAddress);
    provide(EnvVarKeys.TEST_MODE, testMode);
  } else {
    provide(EnvVarKeys.ENDPOINT, MOCKS.ENDPOINT);
    provide(EnvVarKeys.CONNECTION_STRING, MOCKS.CONNECTION_STRING);
    provide(EnvVarKeys.SENDER_ADDRESS, MOCKS.SENDER_ADDRESS);
    provide(EnvVarKeys.RECIPIENT_ADDRESS, MOCKS.RECIPIENT_ADDRESS);
    provide(EnvVarKeys.SECOND_RECIPIENT_ADDRESS, MOCKS.SECOND_RECIPIENT_ADDRESS);
    provide(EnvVarKeys.TEST_MODE, testMode);
  }
}
