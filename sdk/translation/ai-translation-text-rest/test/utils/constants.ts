// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const EnvVarKeys = {
  SUBSCRIPTION_ID: "SUBSCRIPTION_ID",
  RESOURCE_GROUP: "RESOURCE_GROUP",
  COGNITIVE_ACCOUNT_NAME: "COGNITIVE_ACCOUNT_NAME",
  RESOURCE_ID: "TRANSLATOR_RESOURCE_ID",
  ENDPOINT: "TEXT_TRANSLATION_ENDPOINT",
  KEY: "TEXT_TRANSLATION_API_KEY",
  DISABLE_LOCAL_AUTH: "DISABLE_LOCAL_AUTH",
  REGION: "TRANSLATOR_REGION",
  TEST_MODE: "TEST_MODE",
} as const;

export const ENDPOINT = "https://endpoint";
export const KEY = "api_key";
export const DISABLE_LOCAL_AUTH = false;
export const REGION = "region";
export const RESOURCE_ID = "resource_id";
