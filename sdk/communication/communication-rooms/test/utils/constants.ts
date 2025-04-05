// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const EnvVarKeys = {
  SUBSCRIPTION_ID: "SUBSCRIPTION_ID",
  RESOURCE_GROUP: "RESOURCE_GROUP",
  ACCOUNT_NAME: "COMMUNICATION_SERVICE_NAME",
  ENDPOINT: "COMMUNICATION_ENDPOINT",
  CONNECTION_STRING: "COMMUNICATION_CONNECTION_STRING",
  TEST_MODE: "TEST_MODE",
} as const;

export const ENDPOINT = `https://endpoint/`;
export const CONNECTION_STRING = `endpoint=${ENDPOINT};accesskey=key`;
