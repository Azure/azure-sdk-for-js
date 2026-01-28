// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export enum EnvVarKeys {
  TEST_MODE = "TEST_MODE",
  SUBSCRIPTION_ID = "SUBSCRIPTION_ID",
  RESOURCE_GROUP = "RESOURCE_GROUP",
  ACCOUNT_NAME = "ACCOUNT_NAME",
  ACCOUNT_BLOB_URL = "ACCOUNT_BLOB_URL",
  ACCOUNT_KEY = "ACCOUNT_KEY",
  ACCOUNT_SAS = "ACCOUNT_SAS",
  STORAGE_CONNECTION_STRING = "STORAGE_CONNECTION_STRING",
  DFS_ACCOUNT_NAME = "DFS_ACCOUNT_NAME",
  DFS_ACCOUNT_BLOB_URL = "DFS_ACCOUNT_BLOB_URL",
}

export const ACCOUNT_NAME = "fakeaccountname";
export const ACCOUNT_BLOB_URL = `https://${ACCOUNT_NAME}.blob.core.windows.net/`;
export const ACCOUNT_KEY = "fakeaccountkey";
export const ACCOUNT_SAS =
  "sv=Sanitized&ss=bfqt&srt=sco&sp=rwdlacup&se=2025-09-03T18%3A13%3A39.8140000Z&sig=sanitizedsig";
export const STORAGE_CONNECTION_STRING = `DefaultEndpointsProtocol=https;AccountName=${ACCOUNT_NAME};AccountKey=${ACCOUNT_KEY};EndpointSuffix=core.windows.net`;
export const DFS_ACCOUNT_NAME = "fakedfsaccountname";
export const DFS_ACCOUNT_BLOB_URL = `https://${DFS_ACCOUNT_NAME}.blob.core.windows.net/`;
