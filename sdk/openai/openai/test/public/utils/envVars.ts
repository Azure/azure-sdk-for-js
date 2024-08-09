// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export enum EnvironmentVariableNamesForVision {
  ENDPOINT_VISION = "AZURE_OPENAI_SWEDENCENTRAL_ENDPOINT",
  ACCOUNT_NAME_VISION = "ACCOUNT_NAME_VISION",
}

export enum EnvironmentVariableNamesForAudio {
  ENDPOINT_AUDIO = "AZURE_OPENAI_NORTHCENTRALUS_ENDPOINT",
  ACCOUNT_NAME_AUDIO = "ACCOUNT_NAME_AUDIO",
}

export enum EnvironmentVariableNamesForCompletions {
  ENDPOINT_COMPLETIONS = "AZURE_OPENAI_ENDPOINT",
  ACCOUNT_NAME_COMPLETIONS = "ACCOUNT_NAME_COMPLETIONS",
}

export enum EnvironmentVariableNamesForAzureSearch {
  AZURE_SEARCH_ENDPOINT = "AZURE_OPENAI_SEARCH_ENDPOINT",
  AZURE_SEARCH_INDEX = "AZURE_OPENAI_SEARCH_INDEX",
}

export enum EnvironmentVariableNamesAzureCommon {
  RESOURCE_GROUP = "RESOURCE_GROUP",
  SUBSCRIPTION_ID = "SUBSCRIPTION_ID",
}

export const EnvironmentVariableNames = {
  ...EnvironmentVariableNamesAzureCommon,
  ...EnvironmentVariableNamesForAzureSearch,
  ...EnvironmentVariableNamesForCompletions,
  ...EnvironmentVariableNamesForAudio,
  ...EnvironmentVariableNamesForVision,
};
