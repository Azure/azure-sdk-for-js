// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export enum EnvVarKeys {
  TEST_MODE = "TEST_MODE",
  SUBSCRIPTION_ID = "SUBSCRIPTION_ID",
  RESOURCE_GROUP = "RESOURCE_GROUP",
  ACCOUNT_NAME = "ACCOUNT_NAME",
  ACCOUNT_QUEUE_URL = "ACCOUNT_QUEUE_URL",
  ACCOUNT_KEY = "ACCOUNT_KEY",
  ACCOUNT_SAS = "ACCOUNT_SAS",
  STORAGE_CONNECTION_STRING = "STORAGE_CONNECTION_STRING",
  STORAGE_CONNECTION_STRING_WITH_SAS = "STORAGE_CONNECTION_STRING_WITH_SAS",
  SECONDARY_ACCOUNT_NAME = "SECONDARY_ACCOUNT_NAME",
  SECONDARY_ACCOUNT_QUEUE_URL = "SECONDARY_ACCOUNT_QUEUE_URL",
  SECONDARY_ACCOUNT_KEY = "SECONDARY_ACCOUNT_KEY",
}

export const ACCOUNT_NAME = "fakeaccountname";
export const ACCOUNT_QUEUE_URL = `https://${ACCOUNT_NAME}.queue.core.windows.net/`;
export const ACCOUNT_KEY = "fakeaccountkey";
export const ACCOUNT_SAS =
  "sv=Sanitized&ss=bfqt&srt=sco&sp=rwdlacup&se=2025-09-03T18%3A13%3A39.8140000Z&sig=sanitizedsig";
export const STORAGE_CONNECTION_STRING = `DefaultEndpointsProtocol=https;AccountName=${ACCOUNT_NAME};AccountKey=${ACCOUNT_KEY};EndpointSuffix=core.windows.net`;
export const STORAGE_CONNECTION_STRING_WITH_SAS = `QueueEndpoint=${ACCOUNT_QUEUE_URL};SharedAccessSignature=${ACCOUNT_SAS}`;
export const SECONDARY_ACCOUNT_NAME = `${ACCOUNT_NAME}-secondary`;
export const SECONDARY_ACCOUNT_QUEUE_URL = `https://${SECONDARY_ACCOUNT_NAME}.queue.core.windows.net/`;
export const SECONDARY_ACCOUNT_KEY = "fakesecondaryaccountkey";
