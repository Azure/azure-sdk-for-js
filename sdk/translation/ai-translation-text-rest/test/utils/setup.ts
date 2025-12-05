// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createLiveCredential } from "@azure-tools/test-credential";
import type { TestProject } from "vitest/node";
import { EnvVarKeys } from "./constants.js";
import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import * as MOCKS from "./constants.js";

declare module "vitest" {
  type MyEnvVarKeys = {
    [K in (typeof EnvVarKeys)[keyof typeof EnvVarKeys]]: string;
  };
  export interface ProvidedContext extends Omit<
    MyEnvVarKeys,
    typeof EnvVarKeys.DISABLE_LOCAL_AUTH | typeof EnvVarKeys.TEST_MODE
  > {
    [EnvVarKeys.TEST_MODE]: string | undefined;
    [EnvVarKeys.DISABLE_LOCAL_AUTH]: boolean;
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
    const resourceName = assertEnvironmentVariable(EnvVarKeys.COGNITIVE_ACCOUNT_NAME);
    const region = assertEnvironmentVariable(EnvVarKeys.REGION);
    const customEndpoint = assertEnvironmentVariable(EnvVarKeys.CUSTOM_ENDPOINT);
    const resourceId = assertEnvironmentVariable(EnvVarKeys.RESOURCE_ID);
    const cred = createLiveCredential();
    const mgmtClient = new CognitiveServicesManagementClient(cred, subId);
    const account = await mgmtClient.accounts.get(rgName, resourceName);
    const disableLocalAuth = account.properties?.disableLocalAuth ?? false;
    const endpoint = account.properties?.endpoint;
    if (!endpoint) {
      throw new Error("Endpoint is not defined.");
    }
    const { key1 } = await mgmtClient.accounts.listKeys(rgName, resourceName);
    if (!key1) {
      throw new Error("Key is not defined.");
    }
    provide(EnvVarKeys.ENDPOINT, endpoint);
    provide(EnvVarKeys.CUSTOM_ENDPOINT, customEndpoint);
    provide(EnvVarKeys.DISABLE_LOCAL_AUTH, disableLocalAuth);
    provide(EnvVarKeys.KEY, key1);
    provide(EnvVarKeys.TEST_MODE, testMode);
    provide(EnvVarKeys.REGION, region);
    provide(EnvVarKeys.RESOURCE_ID, resourceId);
  } else {
    provide(EnvVarKeys.ENDPOINT, MOCKS.ENDPOINT);
    provide(EnvVarKeys.CUSTOM_ENDPOINT, MOCKS.CUSTOM_ENDPOINT);
    provide(EnvVarKeys.DISABLE_LOCAL_AUTH, MOCKS.DISABLE_LOCAL_AUTH);
    provide(EnvVarKeys.KEY, MOCKS.KEY);
    provide(EnvVarKeys.TEST_MODE, testMode);
    provide(EnvVarKeys.REGION, MOCKS.REGION);
    provide(EnvVarKeys.RESOURCE_ID, MOCKS.RESOURCE_ID);
  }
}
