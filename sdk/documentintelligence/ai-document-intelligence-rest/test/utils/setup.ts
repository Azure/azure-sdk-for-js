// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createLiveCredential } from "@azure-tools/test-credential";
import type { TestProject } from "vitest/node";
import { EnvVarKeys } from "./constants.js";
import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import * as MOCKS from "./constants.js";
import { getContainerUrls } from "./getContainers.js";
import { getConfigs } from "./configs.js";

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
    const subscriptionId = assertEnvironmentVariable(EnvVarKeys.SUBSCRIPTION_ID);
    const rgName = assertEnvironmentVariable(EnvVarKeys.RESOURCE_GROUP);
    const cognitiveAccountName = assertEnvironmentVariable(EnvVarKeys.COGNITIVE_ACCOUNT_NAME);
    const storageAccountName = assertEnvironmentVariable(EnvVarKeys.STORAGE_ACCOUNT_NAME);
    const storageResourceGroup = assertEnvironmentVariable(EnvVarKeys.STORAGE_RESOURCE_GROUP);
    const trainingDataContainer = assertEnvironmentVariable(EnvVarKeys.CONTAINER_TRAINING_DATA);
    const batchTrainingDataContainer = assertEnvironmentVariable(
      EnvVarKeys.CONTAINER_BATCH_TRAINING_DATA,
    );
    const batchTrainingDataResultContainer = assertEnvironmentVariable(
      EnvVarKeys.CONTAINER_BATCH_TRAINING_RESULT,
    );
    const selectionMarkTrainingDataContainer = assertEnvironmentVariable(
      EnvVarKeys.CONTAINER_SELECTION_MARK_TRAINING_DATA,
    );
    const testingDataContainer = assertEnvironmentVariable(EnvVarKeys.CONTAINER_TESTING_DATA);
    const multiPageTestingDataContainer = assertEnvironmentVariable(
      EnvVarKeys.CONTAINER_MULTI_PAGE_TESTING_DATA,
    );
    const classifierTrainingDataContainer = assertEnvironmentVariable(
      EnvVarKeys.CONTAINER_CLASSIFIER_TRAINING_DATA,
    );

    const credential = createLiveCredential();
    const mgmtClient = new CognitiveServicesManagementClient(credential, subscriptionId);
    const account = await mgmtClient.accounts.get(rgName, cognitiveAccountName);
    const disableLocalAuth = account.properties?.disableLocalAuth ?? false;
    const endpoint = account.properties?.endpoint;
    if (!endpoint) {
      throw new Error("Endpoint is not defined.");
    }
    const { key1 } = await mgmtClient.accounts.listKeys(rgName, cognitiveAccountName);
    if (!key1) {
      throw new Error("Key is not defined.");
    }
    const containerUrls = await getContainerUrls({
      subscriptionId,
      accountName: storageAccountName,
      credential,
      resourceGroupName: storageResourceGroup,
      containers: getConfigs(storageAccountName, {
        trainingDataContainer,
        testingDataContainer,
        selectionMarkTrainingDataContainer,
        classifierTrainingDataContainer,
        batchTrainingDataContainer,
        batchTrainingDataResultContainer,
        multiPageTestingDataContainer,
      }),
    });
    provide(EnvVarKeys.ENDPOINT, endpoint);
    provide(EnvVarKeys.DISABLE_LOCAL_AUTH, disableLocalAuth);
    provide(EnvVarKeys.KEY, key1);
    provide(EnvVarKeys.TEST_MODE, testMode);
    for (const { envVarName, sasUrl } of containerUrls) {
      provide(envVarName, sasUrl);
    }
  } else {
    provide(EnvVarKeys.ENDPOINT, MOCKS.ENDPOINT);
    provide(EnvVarKeys.DISABLE_LOCAL_AUTH, MOCKS.DISABLE_LOCAL_AUTH);
    provide(EnvVarKeys.KEY, MOCKS.KEY);
    provide(EnvVarKeys.TRAINING_CONTAINER_SAS_URL, MOCKS.TRAINING_CONTAINER_SAS_URL);
    provide(EnvVarKeys.TESTING_CONTAINER_SAS_URL, MOCKS.TESTING_CONTAINER_SAS_URL);
    provide(
      EnvVarKeys.SELECTION_MARK_STORAGE_CONTAINER_SAS_URL,
      MOCKS.SELECTION_MARK_STORAGE_CONTAINER_SAS_URL,
    );
    provide(
      EnvVarKeys.CLASSIFIER_TRAINING_DATA_CONTAINER_SAS_URL,
      MOCKS.CLASSIFIER_TRAINING_DATA_CONTAINER_SAS_URL,
    );
    provide(
      EnvVarKeys.BATCH_TRAINING_DATA_CONTAINER_SAS_URL,
      MOCKS.BATCH_TRAINING_DATA_CONTAINER_SAS_URL,
    );
    provide(
      EnvVarKeys.BATCH_TRAINING_DATA_RESULT_CONTAINER_SAS_URL,
      MOCKS.BATCH_TRAINING_DATA_RESULT_CONTAINER_SAS_URL,
    );
    provide(
      EnvVarKeys.MULTIPAGE_TRAINING_DATA_CONTAINER_SAS_URL,
      MOCKS.MULTIPAGE_TRAINING_DATA_CONTAINER_SAS_URL,
    );
  }
}
