// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export enum EnvVarKeys {
  TEST_MODE = "TEST_MODE",
  SUBSCRIPTION_ID = "SUBSCRIPTION_ID",
  RESOURCE_GROUP = "RESOURCE_GROUP",
  DFS_ACCOUNT_NAME = "DFS_ACCOUNT_NAME",
  DFS_ACCOUNT_URL = "DFS_ACCOUNT_URL",
  DFS_ACCOUNT_KEY = "DFS_ACCOUNT_KEY",
  DFS_ACCOUNT_SAS = "DFS_ACCOUNT_SAS",
  DFS_STORAGE_CONNECTION_STRING = "DFS_STORAGE_CONNECTION_STRING",
  DFS_STORAGE_CONNECTION_STRING_WITH_SAS = "DFS_STORAGE_CONNECTION_STRING_WITH_SAS",
  DFS_SOFT_DELETE_ACCOUNT_NAME = "DFS_SOFT_DELETE_ACCOUNT_NAME",
  DFS_SOFT_DELETE_ACCOUNT_URL = "DFS_SOFT_DELETE_ACCOUNT_URL",
  DFS_SOFT_DELETE_ACCOUNT_KEY = "DFS_SOFT_DELETE_ACCOUNT_KEY",
  DFS_SOFT_DELETE_ACCOUNT_SAS = "DFS_SOFT_DELETE_ACCOUNT_SAS",
  DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING = "DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING",
  DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING_WITH_SAS = "DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING_WITH_SAS",
  IMMUTABLE_CONTAINER_NAME = "IMMUTABLE_CONTAINER_NAME",
  ENCRYPTION_SCOPE_1 = "ENCRYPTION_SCOPE_1",
  ENCRYPTION_SCOPE_2 = "ENCRYPTION_SCOPE_2",
  CUSTOMER_PROVIDED_KEY = "CUSTOMER_PROVIDED_KEY",
  ACL_ID_FOR_TEST = "ACL_ID_FOR_TEST",
  STREAM_DEBUG = "STREAM_DEBUG",
}

export const DFS_ACCOUNT_NAME = "fakedefsaccountname";
export const DFS_ACCOUNT_URL = `https://${DFS_ACCOUNT_NAME}.dfs.core.windows.net/`;
export const DFS_ACCOUNT_KEY = "fakedefsaccountkey";
export const DFS_ACCOUNT_SAS =
  "sv=Sanitized&ss=bfqt&srt=sco&sp=rwdlacup&se=2025-09-03T18%3A13%3A39.8140000Z&sig=sanitizedsig";
export const DFS_STORAGE_CONNECTION_STRING = `DefaultEndpointsProtocol=https;AccountName=${DFS_ACCOUNT_NAME};AccountKey=${DFS_ACCOUNT_KEY};EndpointSuffix=core.windows.net`;
export const DFS_STORAGE_CONNECTION_STRING_WITH_SAS = `BlobEndpoint=https://${DFS_ACCOUNT_NAME}.blob.core.windows.net/;FileEndpoint=https://${DFS_ACCOUNT_NAME}.file.core.windows.net/;SharedAccessSignature=${DFS_ACCOUNT_SAS}`;
export const DFS_SOFT_DELETE_ACCOUNT_NAME = "fakedefssoftdeleteaccountname";
export const DFS_SOFT_DELETE_ACCOUNT_URL = `https://${DFS_SOFT_DELETE_ACCOUNT_NAME}.dfs.core.windows.net/`;
export const DFS_SOFT_DELETE_ACCOUNT_KEY = "fakedefssoftdeleteaccountkey";
export const DFS_SOFT_DELETE_ACCOUNT_SAS =
  "sv=Sanitized&ss=bfqt&srt=sco&sp=rwdlacup&se=2025-09-03T18%3A13%3A39.8140000Z&sig=sanitizedsig";
export const DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING = `DefaultEndpointsProtocol=https;AccountName=${DFS_SOFT_DELETE_ACCOUNT_NAME};AccountKey=${DFS_SOFT_DELETE_ACCOUNT_KEY};EndpointSuffix=core.windows.net`;
export const DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING_WITH_SAS = `BlobEndpoint=https://${DFS_SOFT_DELETE_ACCOUNT_NAME}.blob.core.windows.net/;FileEndpoint=https://${DFS_SOFT_DELETE_ACCOUNT_NAME}.file.core.windows.net/;SharedAccessSignature=${DFS_SOFT_DELETE_ACCOUNT_SAS}`;
export const IMMUTABLE_CONTAINER_NAME = "fakeimmutablecontainer";
export const ENCRYPTION_SCOPE_1 = "fakeencryptionscope1";
export const ENCRYPTION_SCOPE_2 = "fakeencryptionscope2";
export const CUSTOMER_PROVIDED_KEY = {
  encryptionKey: "MDEyMzQ1NjcwMTIzNDU2NzAxMjM0NTY3MDEyMzQ1Njc=",
  encryptionKeySha256: "3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=",
};
export const ACL_ID_FOR_TEST = "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=";
export const STREAM_DEBUG = "";

export const STORAGE_SCOPE = "https://storage.azure.com/.default";
export const SERVICE_VERSION = "2025-11-05";
