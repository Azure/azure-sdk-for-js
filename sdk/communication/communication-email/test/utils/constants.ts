// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const EnvVarKeys = {
  SUBSCRIPTION_ID: "SUBSCRIPTION_ID",
  RESOURCE_GROUP: "RESOURCE_GROUP",
  ACCOUNT_NAME: "COMMUNICATION_SERVICE_NAME",
  ENDPOINT: "COMMUNICATION_ENDPOINT",
  CONNECTION_STRING: "COMMUNICATION_CONNECTION_STRING",
  SENDER_ADDRESS: "SENDER_ADDRESS",
  RECIPIENT_ADDRESS: "RECIPIENT_ADDRESS",
  SECOND_RECIPIENT_ADDRESS: "SECOND_RECIPIENT_ADDRESS",
  TEST_MODE: "TEST_MODE",
} as const;

export const ENDPOINT = `https://endpoint/`;
export const CONNECTION_STRING = `endpoint=https://account.unitedstates.communication.azure.com/;accesskey=key`;
export const SENDER_ADDRESS = "xxx@yyy.com";
export const RECIPIENT_ADDRESS = "yyy@xxx.com";
export const SECOND_RECIPIENT_ADDRESS = "zzz@xxx.com";
