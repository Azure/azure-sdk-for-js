// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createLiveCredential } from "@azure-tools/test-credential";
import type { TestProject } from "vitest/node";
import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { AzureKeyCredential } from "@azure/core-auth";
import { EnvVarKeys } from "./constants.js";
import * as MOCKS from "./constants.js";
import { deployProjects } from "./deployProjects.js";
import "dotenv/config";

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
    const accountName = assertEnvironmentVariable(EnvVarKeys.ACCOUNT_NAME);
    const cred = createLiveCredential();
    const mgmtClient = new CognitiveServicesManagementClient(cred, subId);
    const account = await mgmtClient.accounts.get(rgName, accountName);
    const disableLocalAuth = account.properties?.disableLocalAuth ?? false;
    const { key1, key2 } = await mgmtClient.accounts.listKeys(rgName, accountName);
    if (!key1 || !key2) {
      throw new Error("Keys not found");
    }
    const credential = disableLocalAuth ? cred : new AzureKeyCredential(key1);
    const endpoint = account.properties?.endpoint;
    if (!endpoint) {
      throw new Error("Endpoint not found");
    }
    const { conversation, orchestration } = await deployProjects(endpoint, credential);
    provide(EnvVarKeys.ENDPOINT, endpoint);
    provide(EnvVarKeys.KEY1, key1);
    provide(EnvVarKeys.KEY2, key2);
    provide(EnvVarKeys.DISABLE_LOCAL_AUTH, disableLocalAuth);
    provide(EnvVarKeys.LANGUAGE_CLU_PROJECT_NAME, conversation.projectName);
    provide(EnvVarKeys.LANGUAGE_CLU_DEPLOYMENT_NAME, conversation.deploymentName);
    provide(EnvVarKeys.LANGUAGE_ORCHESTRATION_PROJECT_NAME, orchestration.projectName);
    provide(EnvVarKeys.LANGUAGE_ORCHESTRATION_DEPLOYMENT_NAME, orchestration.deploymentName);
    provide(EnvVarKeys.TEST_MODE, testMode);
  } else {
    provide(EnvVarKeys.ENDPOINT, MOCKS.ENDPOINT);
    provide(EnvVarKeys.DISABLE_LOCAL_AUTH, false);
    provide(EnvVarKeys.KEY1, MOCKS.KEY1);
    provide(EnvVarKeys.KEY2, MOCKS.KEY2);
    provide(EnvVarKeys.LANGUAGE_CLU_PROJECT_NAME, MOCKS.LANGUAGE_CLU_PROJECT_NAME);
    provide(EnvVarKeys.LANGUAGE_CLU_DEPLOYMENT_NAME, MOCKS.LANGUAGE_CLU_DEPLOYMENT_NAME);
    provide(
      EnvVarKeys.LANGUAGE_ORCHESTRATION_PROJECT_NAME,
      MOCKS.LANGUAGE_ORCHESTRATION_PROJECT_NAME,
    );
    provide(
      EnvVarKeys.LANGUAGE_ORCHESTRATION_DEPLOYMENT_NAME,
      MOCKS.LANGUAGE_ORCHESTRATION_DEPLOYMENT_NAME,
    );
  }
}
