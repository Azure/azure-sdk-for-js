// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export enum EnvironmentVariableNamesForDalle {
  AZURE_API_KEY_DALLE = "AZURE_OPENAI_SWEDENCENTRAL_KEY",
  ENDPOINT_DALLE = "AZURE_OPENAI_SWEDENCENTRAL_ENDPOINT",
  ACCOUNT_NAME_DALLE = "ACCOUNT_NAME_DALLE",
  DEPLOYMENT_NAME_DALLE = "dall-e-3",
}

export enum EnvironmentVariableNamesForWhisper {
  AZURE_API_KEY_WHISPER = "AZURE_OPENAI_NORTHCENTRALUS_KEY",
  ENDPOINT_WHISPER = "AZURE_OPENAI_NORTHCENTRALUS_ENDPOINT",
  ACCOUNT_NAME_WHISPER = "ACCOUNT_NAME_WHISPER",
  DEPLOYMENT_NAME_WHISPER = "whisper",
}

export enum EnvironmentVariableNamesForCompletions {
  AZURE_API_KEY_COMPLETIONS = "AZURE_OPENAI_KEY",
  ENDPOINT_COMPLETIONS = "AZURE_OPENAI_ENDPOINT",
  ACCOUNT_NAME_COMPLETIONS = "ACCOUNT_NAME_COMPLETIONS",
  DEPLOYMENT_NAME_COMPLETIONS = "gpt-35-turbo",
}

export enum EnvironmentVariableNamesForAzureSearch {
  AZURE_SEARCH_ENDPOINT = "AZURE_OPENAI_SEARCH_ENDPOINT",
  AZURE_SEARCH_KEY = "AZURE_OPENAI_SEARCH_KEY",
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
