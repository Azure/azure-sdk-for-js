// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createLiveCredential } from "@azure-tools/test-credential";
import type { TestProject } from "vitest/node";
import { EnvVarKeys } from "./constants.js";
import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import "dotenv/config";

declare module "vitest" {
  type MyEnvVarKeys = {
    [K in keyof typeof EnvVarKeys]: string;
  };
  export interface ProvidedContext extends MyEnvVarKeys {
    [EnvVarKeys.KEY1]: string | undefined;
    [EnvVarKeys.KEY2]: string | undefined;
  }
}

function assertEnvironmentVariable<T extends Pick<typeof EnvVarKeys, "KEY1" | "KEY2">>(
  key: T,
): string | undefined;
function assertEnvironmentVariable(key: string): string;
function assertEnvironmentVariable(key: string): string | undefined {
  const value = process.env[key];
  if (key === EnvVarKeys.TEST_MODE) {
    return !value ? value : value.toLowerCase();
  }
  if (([EnvVarKeys.KEY1, EnvVarKeys.KEY2] as string[]).includes(key)) {
    return value;
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
    const accountName = assertEnvironmentVariable("ACCOUNT_NAME");
    const cred = createLiveCredential({ authorityHost: `https://sts.windows.net/${subId}` });
    const mgmtClient = new CognitiveServicesManagementClient(cred, subId);
    const res = await mgmtClient.accounts.get(rgName, accountName);
    if (!res.properties?.disableLocalAuth) {
      const { key1, key2 } = await mgmtClient.accounts.listKeys(rgName, accountName);
      process.env[EnvVarKeys.KEY1] = key1;
      process.env[EnvVarKeys.KEY2] = key2;
    }

    for (const key of Object.values(EnvVarKeys)) {
      provide(key, assertEnvironmentVariable(key));
    }
  }
}
