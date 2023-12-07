// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export enum EnvironmentVariableNamesForDalle {
  AZURE_API_KEY_DALLE = "AZURE_API_KEY_DALLE",
  ENDPOINT_DALLE = "ENDPOINT_DALLE",
  ACCOUNT_NAME_DALLE = "ACCOUNT_NAME_DALLE",
}

export enum EnvironmentVariableNamesForWhisper {
  AZURE_API_KEY_WHISPER = "AZURE_API_KEY_WHISPER",
  ENDPOINT_WHISPER = "ENDPOINT_WHISPER",
  ACCOUNT_NAME_WHISPER = "ACCOUNT_NAME_WHISPER",
}

export enum EnvironmentVariableNamesForCompletions {
  AZURE_API_KEY_COMPLETIONS = "AZURE_API_KEY_COMPLETIONS",
  ENDPOINT_COMPLETIONS = "ENDPOINT_COMPLETIONS",
  ACCOUNT_NAME_COMPLETIONS = "ACCOUNT_NAME_COMPLETIONS",
}

export enum EnvironmentVariableNamesForAzureSearch {
  ENDPOINT_SEARCH = "AZURE_SEARCH_ENDPOINT",
  AZURE_API_KEY_SEARCH = "AZURE_SEARCH_KEY",
  AZURE_SEARCH_INDEX = "AZURE_SEARCH_INDEX",
}

export enum EnvironmentVariableNamesAzureCommon {
  RESOURCE_GROUP = "RESOURCE_GROUP",
  SUBSCRIPTION_ID = "SUBSCRIPTION_ID",
}

export enum EnvironmentVariableNamesOpenAI {
  OPENAI_API_KEY = "OPENAI_API_KEY",
}

export const EnvironmentVariableNames = {
  ...EnvironmentVariableNamesAzureCommon,
  ...EnvironmentVariableNamesForAzureSearch,
  ...EnvironmentVariableNamesForCompletions,
  ...EnvironmentVariableNamesForWhisper,
  ...EnvironmentVariableNamesForDalle,
  ...EnvironmentVariableNamesOpenAI,
};
