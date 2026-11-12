// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { containerNames } from "./types.js";

export const EnvVarKeys = {
  SUBSCRIPTION_ID: "SUBSCRIPTION_ID",
  RESOURCE_GROUP: "RESOURCE_GROUP",
  COGNITIVE_ACCOUNT_NAME: "COGNITIVE_ACCOUNT_NAME",
  RESOURCE_ID: "TRANSLATOR_RESOURCE_ID",
  ENDPOINT: "DOCUMENT_TRANSLATION_ENDPOINT",
  BLOB_ENDPOINT: "STORAGE_BLOB_ENDPOINT",
  KEY: "DOCUMENT_TRANSLATION_API_KEY",
  DISABLE_LOCAL_AUTH: "DISABLE_LOCAL_AUTH",
  REGION: "TRANSLATOR_REGION",
  CONTAINERS: "CONTAINERS",
  TEST_MODE: "TEST_MODE",
} as const;

export const ENDPOINT = "https://endpoint/";
export const BLOB_ENDPOINT = "https://blob.endpoint/";
export const KEY = "api_key";
export const DISABLE_LOCAL_AUTH = false;
export const REGION = "region";
export const RESOURCE_ID = "resource_id";
export const CONTAINERS = containerNames.reduce(
  (acc, name) => {
    acc[name] = { url: `${BLOB_ENDPOINT}${name}` };
    return acc;
  },
  {} as Record<string, { url: string }>,
);
