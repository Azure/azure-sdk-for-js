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
  export interface ProvidedContext extends MyEnvVarKeys {}
}

function assertEnvironmentVariable<T extends Pick<typeof EnvVarKeys, "TEST_MODE">>(
  key: T,
): string | undefined;
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
  if (process.env[EnvVarKeys.TEST_MODE]?.toLowerCase() === "live") {
    const subId = assertEnvironmentVariable("SUBSCRIPTION_ID");
    const rgName = assertEnvironmentVariable("RESOURCE_GROUP");
    const resourceName = assertEnvironmentVariable("COGNITIVE_ACCOUNT_NAME");
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
    provide(EnvVarKeys.DISABLE_LOCAL_AUTH, disableLocalAuth.toString());
    provide(EnvVarKeys.KEY, key1);
  } else {
    provide(EnvVarKeys.ENDPOINT, MOCKS.ENDPOINT);
    provide(EnvVarKeys.DISABLE_LOCAL_AUTH, MOCKS.DISABLE_LOCAL_AUTH);
    provide(EnvVarKeys.KEY, MOCKS.KEY);
  }
}
