// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type ServiceSasParameters } from "@azure/arm-storage";
import { EnvVarKeys } from "./constants.js";

export function getConfigs(
  accountName: string,
  containerNames: {
    trainingDataContainer: string;
    testingDataContainer: string;
    selectionMarkTrainingDataContainer: string;
    classifierTrainingDataContainer: string;
    batchTrainingDataContainer: string;
    batchTrainingDataResultContainer: string;
    multiPageTestingDataContainer: string;
  },
): Array<{
  name: string;
  sasParams: ServiceSasParameters;
  envVarName: (typeof EnvVarKeys)[keyof typeof EnvVarKeys];
}> {
  const {
    trainingDataContainer,
    testingDataContainer,
    selectionMarkTrainingDataContainer,
    classifierTrainingDataContainer,
    batchTrainingDataContainer,
    batchTrainingDataResultContainer,
    multiPageTestingDataContainer,
  } = containerNames;
  // For training, testing, selection mark, and multi-page containers: expiry in 60 days, permission "rl"
  const defaultSasParams = (container: string): ServiceSasParameters => ({
    canonicalizedResource: `/blob/${accountName}/${container}`,
    sharedAccessExpiryTime: getExpiryTime(0, 60),
    permissions: "rl",
    resource: "c",
  });

  // For batch training containers: expiry in 60 days, permission "rwl"
  const batchSasParams = (container: string): ServiceSasParameters => ({
    canonicalizedResource: `/blob/${accountName}/${container}`,
    sharedAccessExpiryTime: getExpiryTime(0, 60),
    permissions: "rwl",
    resource: "c",
  });

  // For classifier, expiry in 3 hours, permission "rl"
  const classifierSasParams: ServiceSasParameters = {
    canonicalizedResource: `/blob/${accountName}/${classifierTrainingDataContainer}`,
    sharedAccessExpiryTime: getExpiryTime(3, 0), // 3 hours expiry
    permissions: "rl",
    resource: "c",
  };
  return [
    {
      name: trainingDataContainer,
      sasParams: defaultSasParams(trainingDataContainer),
      envVarName: EnvVarKeys.TRAINING_CONTAINER_SAS_URL,
    },
    {
      name: testingDataContainer,
      sasParams: defaultSasParams(testingDataContainer),
      envVarName: EnvVarKeys.TESTING_CONTAINER_SAS_URL,
    },
    {
      name: selectionMarkTrainingDataContainer,
      sasParams: defaultSasParams(selectionMarkTrainingDataContainer),
      envVarName: EnvVarKeys.SELECTION_MARK_STORAGE_CONTAINER_SAS_URL,
    },
    {
      name: classifierTrainingDataContainer,
      sasParams: classifierSasParams,
      envVarName: EnvVarKeys.CLASSIFIER_TRAINING_DATA_CONTAINER_SAS_URL,
    },
    {
      name: batchTrainingDataContainer,
      sasParams: batchSasParams(batchTrainingDataContainer),
      envVarName: EnvVarKeys.BATCH_TRAINING_DATA_CONTAINER_SAS_URL,
    },
    {
      name: batchTrainingDataResultContainer,
      sasParams: batchSasParams(batchTrainingDataResultContainer),
      envVarName: EnvVarKeys.BATCH_TRAINING_DATA_RESULT_CONTAINER_SAS_URL,
    },
    {
      name: multiPageTestingDataContainer,
      sasParams: defaultSasParams(multiPageTestingDataContainer),
      envVarName: EnvVarKeys.MULTIPAGE_TRAINING_DATA_CONTAINER_SAS_URL,
    },
  ];
}

// Helper to add time based on milliseconds; adjust for periods like 'P2M' or 'PT3H'.
function addMilliseconds(date: Date, ms: number): Date {
  return new Date(date.getTime() + ms);
}

// Helper to generate ISO string for SAS expiry
function getExpiryTime(hours: number = 0, days: number = 0): Date {
  const now = new Date();
  return addMilliseconds(now, days * 24 * 60 * 60 * 1000 + hours * 60 * 60 * 1000);
}
