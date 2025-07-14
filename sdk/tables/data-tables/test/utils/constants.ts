// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const EnvVarKeys = {
  SUBSCRIPTION_ID: "SUBSCRIPTION_ID",
  RESOURCE_GROUP: "RESOURCE_GROUP",
  ACCOUNT_NAME: "ACCOUNT_NAME",
  ENDPOINT: "TABLES_URL",
  CONNECTION_STRING: "ACCOUNT_CONNECTION_STRING",
  KEY: "ACCOUNT_KEY",
  ALLOW_SHARED_KEY_ACCESS: "ALLOW_SHARED_KEY_ACCESS",
  SAS_CONNECTION_STRING: "SAS_CONNECTION_STRING",
  SAS_TOKEN: "SAS_TOKEN",
  TEST_MODE: "TEST_MODE",
} as const;

export const ACCOUNT_NAME = "fakeaccountname";
export const ENDPOINT = `https://${ACCOUNT_NAME}.table.core.windows.net/`;
export const KEY = "api_key";
export const ALLOW_SHARED_KEY_ACCESS = true;
export const CONNECTION_STRING = `DefaultEndpointsProtocol=https;AccountName=${ACCOUNT_NAME};AccountKey=${KEY};EndpointSuffix=core.windows.net`;
export const SAS_TOKEN = "st=2021-08-03T08:52:15Z&spr=https&sig=fakesigval";
export const SAS_CONNECTION_STRING = `TableEndpoint=${ENDPOINT};SharedAccessSignature=${SAS_TOKEN}`;
