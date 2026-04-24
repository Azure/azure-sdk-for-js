// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const EnvVarKeys = {
  ENDPOINT: "CONTENTUNDERSTANDING_ENDPOINT",
  KEY: "CONTENTUNDERSTANDING_KEY",
  TEST_MODE: "TEST_MODE",
  SOURCE_RESOURCE_ID: "CONTENTUNDERSTANDING_SOURCE_RESOURCE_ID",
  SOURCE_REGION: "CONTENTUNDERSTANDING_SOURCE_REGION",
  TARGET_ENDPOINT: "CONTENTUNDERSTANDING_TARGET_ENDPOINT",
  TARGET_RESOURCE_ID: "CONTENTUNDERSTANDING_TARGET_RESOURCE_ID",
  TARGET_REGION: "CONTENTUNDERSTANDING_TARGET_REGION",
  TARGET_KEY: "CONTENTUNDERSTANDING_TARGET_KEY",
  TRAINING_DATA_SAS_URL: "CONTENTUNDERSTANDING_TRAINING_DATA_SAS_URL",
  TRAINING_DATA_STORAGE_ACCOUNT: "CONTENTUNDERSTANDING_TRAINING_DATA_STORAGE_ACCOUNT",
  TRAINING_DATA_CONTAINER: "CONTENTUNDERSTANDING_TRAINING_DATA_CONTAINER",
  TRAINING_DATA_PREFIX: "CONTENTUNDERSTANDING_TRAINING_DATA_PREFIX",
} as const;

export const ENDPOINT = "https://sanitized.services.ai.azure.com/";
export const KEY = "Sanitized";
export const SOURCE_RESOURCE_ID = "placeholder-source-resource-id";
export const SOURCE_REGION = "placeholder-source-region";
export const TARGET_ENDPOINT = "https://sanitized-target.services.ai.azure.com/";
export const TARGET_RESOURCE_ID = "placeholder-target-resource-id";
export const TARGET_REGION = "placeholder-target-region";
export const TARGET_KEY = "Sanitized";
export const TRAINING_DATA_SAS_URL =
  "https://sanitized.blob.core.windows.net/container?sv=sanitized-sas-token";
export const TRAINING_DATA_STORAGE_ACCOUNT = "sanitizedstorage";
export const TRAINING_DATA_CONTAINER = "sanitizedcontainer";
export const TRAINING_DATA_PREFIX = "sanitized-prefix/";
