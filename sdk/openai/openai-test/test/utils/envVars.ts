// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export enum EnvironmentVariableNamesForDalle {
  AZURE_API_KEY_DALLE = "AZURE_OPENAI_SWEDENCENTRAL_ENDPOINT",
  ENDPOINT_DALLE = "AZURE_OPENAI_SWEDENCENTRAL_KEY",
}

export enum EnvironmentVariableNamesForWhisper {
  AZURE_API_KEY_WHISPER = "AZURE_OPENAI_NORTHCENTRALUS_ENDPOINT",
  ENDPOINT_WHISPER = "AZURE_OPENAI_NORTHCENTRALUS_KEY",
}

export enum EnvironmentVariableNamesForCompletions {
  AZURE_API_KEY_COMPLETIONS = "AZURE_OPENAI_ENDPOINT",
  ENDPOINT_COMPLETIONS = "AZURE_OPENAI_KEY",
}

export enum EnvironmentVariableNamesForAzureSearch {
  AZURE_SEARCH_ENDPOINT = "AZURE_OPENAI_SEARCH_ENDPOINT",
  AZURE_SEARCH_KEY = "ZURE_OPENAI_SEARCH_KEY",
  AZURE_SEARCH_INDEX = "AZURE_OPENAI_SEARCH_INDEX",
}

export enum EnvironmentVariableNamesAzureCommon {
  RESOURCE_GROUP = "RESOURCE_GROUP",
  SUBSCRIPTION_ID = "SUBSCRIPTION_ID",
}

export enum EnvironmentVariableNamesOpenAI {
  OPENAI_KEY = "OPENAI_KEY",
}

export const EnvironmentVariableNames = {
  ...EnvironmentVariableNamesAzureCommon,
  ...EnvironmentVariableNamesForAzureSearch,
  ...EnvironmentVariableNamesForCompletions,
  ...EnvironmentVariableNamesForWhisper,
  ...EnvironmentVariableNamesForDalle,
  ...EnvironmentVariableNamesOpenAI,
};
