// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { createLiveCredential } from "@azure-tools/test-credential";
import type { TestProject } from "vitest/node";
import { EnvVarKeys } from "./constants.js";
import { deployProjects } from "./deployProjects.js";
import * as MOCKS from "./constants.js";

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
    const storageEndpoint = assertEnvironmentVariable(EnvVarKeys.STORAGE_ENDPOINT);
    const cred = createLiveCredential();
    const mgmtClient = new CognitiveServicesManagementClient(cred, subId);
    const account = await mgmtClient.accounts.get(rgName, accountName);
    const disableLocalAuth = account.properties?.disableLocalAuth ?? false;
    const { key1, key2 } = await mgmtClient.accounts.listKeys(rgName, accountName);
    if (!key1 || !key2) {
      throw new Error("Keys not found");
    }
    const languageEndpoint = account.properties?.endpoint;
    if (!languageEndpoint) {
      throw new Error("Endpoint not found");
    }
    const { entityRecognition, multiLabelClassification, singleLabelClassification } =
      await deployProjects(languageEndpoint, storageEndpoint, cred);
    provide(EnvVarKeys.ENDPOINT, languageEndpoint);
    provide(EnvVarKeys.KEY1, key1);
    provide(EnvVarKeys.KEY2, key2);
    provide(EnvVarKeys.DISABLE_LOCAL_AUTH, disableLocalAuth);
    provide(EnvVarKeys.ENTITY_RECOGNITION_PROJECT_NAME, entityRecognition.projectName);
    provide(EnvVarKeys.ENTITY_RECOGNITION_DEPLOYMENT_NAME, entityRecognition.deploymentName);
    provide(
      EnvVarKeys.MULTI_LABEL_CLASSIFICATION_PROJECT_NAME,
      multiLabelClassification.projectName,
    );
    provide(
      EnvVarKeys.MULTI_LABEL_CLASSIFICATION_DEPLOYMENT_NAME,
      multiLabelClassification.deploymentName,
    );
    provide(
      EnvVarKeys.SINGLE_LABEL_CLASSIFICATION_PROJECT_NAME,
      singleLabelClassification.projectName,
    );
    provide(
      EnvVarKeys.SINGLE_LABEL_CLASSIFICATION_DEPLOYMENT_NAME,
      singleLabelClassification.deploymentName,
    );
    provide(EnvVarKeys.TEST_MODE, testMode);
  } else {
    provide(EnvVarKeys.ENDPOINT, MOCKS.ENDPOINT);
    provide(EnvVarKeys.DISABLE_LOCAL_AUTH, false);
    provide(EnvVarKeys.KEY1, MOCKS.KEY1);
    provide(EnvVarKeys.KEY2, MOCKS.KEY2);
    provide(EnvVarKeys.ENTITY_RECOGNITION_PROJECT_NAME, MOCKS.ENTITY_RECOGNITION_PROJECT_NAME);
    provide(
      EnvVarKeys.ENTITY_RECOGNITION_DEPLOYMENT_NAME,
      MOCKS.ENTITY_RECOGNITION_DEPLOYMENT_NAME,
    );
    provide(
      EnvVarKeys.MULTI_LABEL_CLASSIFICATION_PROJECT_NAME,
      MOCKS.MULTI_LABEL_CLASSIFICATION_PROJECT_NAME,
    );
    provide(
      EnvVarKeys.MULTI_LABEL_CLASSIFICATION_DEPLOYMENT_NAME,
      MOCKS.MULTI_LABEL_CLASSIFICATION_DEPLOYMENT_NAME,
    );
    provide(
      EnvVarKeys.SINGLE_LABEL_CLASSIFICATION_PROJECT_NAME,
      MOCKS.SINGLE_LABEL_CLASSIFICATION_PROJECT_NAME,
    );
    provide(
      EnvVarKeys.SINGLE_LABEL_CLASSIFICATION_DEPLOYMENT_NAME,
      MOCKS.SINGLE_LABEL_CLASSIFICATION_DEPLOYMENT_NAME,
    );
  }
}
