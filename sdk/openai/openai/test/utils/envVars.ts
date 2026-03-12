// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export enum EnvironmentVariableNamesAzureCommon {
  RESOURCE_GROUP = "RESOURCE_GROUP",
  SUBSCRIPTION_ID = "SUBSCRIPTION_ID",
  TEST_MODE = "TEST_MODE",
}

export const EnvironmentVariableNames = {
  ...EnvironmentVariableNamesAzureCommon,
};
