// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export enum EnvVarKeys {
  TEST_MODE = "TEST_MODE",
  SUBSCRIPTION_ID = "SUBSCRIPTION_ID",
  RESOURCE_GROUP = "RESOURCE_GROUP",
  ACCOUNT_NAME = "ACCOUNT_NAME",
  ACCOUNT_BLOB_URL = "ACCOUNT_BLOB_URL",
  ACCOUNT_FILE_URL = "ACCOUNT_FILE_URL",
  ACCOUNT_QUEUE_URL = "ACCOUNT_QUEUE_URL",
  ACCOUNT_KEY = "ACCOUNT_KEY",
  ACCOUNT_SAS = "ACCOUNT_SAS",
  STORAGE_CONNECTION_STRING = "STORAGE_CONNECTION_STRING",
  STORAGE_CONNECTION_STRING_WITH_SAS = "STORAGE_CONNECTION_STRING_WITH_SAS",
  DFS_ACCOUNT_NAME = "DFS_ACCOUNT_NAME",
  DFS_ACCOUNT_BLOB_URL = "DFS_ACCOUNT_BLOB_URL",
  DFS_ACCOUNT_FILE_URL = "DFS_ACCOUNT_FILE_URL",
  DFS_ACCOUNT_QUEUE_URL = "DFS_ACCOUNT_QUEUE_URL",
  DFS_ACCOUNT_KEY = "DFS_ACCOUNT_KEY",
  DFS_ACCOUNT_SAS = "DFS_ACCOUNT_SAS",
  DFS_STORAGE_CONNECTION_STRING = "DFS_STORAGE_CONNECTION_STRING",
  DFS_STORAGE_CONNECTION_STRING_WITH_SAS = "DFS_STORAGE_CONNECTION_STRING_WITH_SAS",
  DFS_SOFT_DELETE_ACCOUNT_NAME = "DFS_SOFT_DELETE_ACCOUNT_NAME",
  DFS_SOFT_DELETE_ACCOUNT_BLOB_URL = "DFS_SOFT_DELETE_ACCOUNT_BLOB_URL",
  DFS_SOFT_DELETE_ACCOUNT_FILE_URL = "DFS_SOFT_DELETE_ACCOUNT_FILE_URL",
  DFS_SOFT_DELETE_ACCOUNT_QUEUE_URL = "DFS_SOFT_DELETE_ACCOUNT_QUEUE_URL",
  DFS_SOFT_DELETE_ACCOUNT_KEY = "DFS_SOFT_DELETE_ACCOUNT_KEY",
  DFS_SOFT_DELETE_ACCOUNT_SAS = "DFS_SOFT_DELETE_ACCOUNT_SAS",
  DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING = "DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING",
  DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING_WITH_SAS = "DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING_WITH_SAS",
  FULL_ACCOUNT_NAME = "FULL_ACCOUNT_NAME",
  FULL_ACCOUNT_BLOB_URL = "FULL_ACCOUNT_BLOB_URL",
  FULL_ACCOUNT_FILE_URL = "FULL_ACCOUNT_FILE_URL",
  FULL_ACCOUNT_QUEUE_URL = "FULL_ACCOUNT_QUEUE_URL",
  FULL_ACCOUNT_KEY = "FULL_ACCOUNT_KEY",
  FULL_ACCOUNT_SAS = "FULL_ACCOUNT_SAS",
  FULL_STORAGE_CONNECTION_STRING = "FULL_STORAGE_CONNECTION_STRING",
  FULL_STORAGE_CONNECTION_STRING_WITH_SAS = "FULL_STORAGE_CONNECTION_STRING_WITH_SAS",
  SOFT_DELETE_ACCOUNT_NAME = "SOFT_DELETE_ACCOUNT_NAME",
  SOFT_DELETE_ACCOUNT_BLOB_URL = "SOFT_DELETE_ACCOUNT_BLOB_URL",
  SOFT_DELETE_ACCOUNT_FILE_URL = "SOFT_DELETE_ACCOUNT_FILE_URL",
  SOFT_DELETE_ACCOUNT_QUEUE_URL = "SOFT_DELETE_ACCOUNT_QUEUE_URL",
  SOFT_DELETE_ACCOUNT_KEY = "SOFT_DELETE_ACCOUNT_KEY",
  SOFT_DELETE_ACCOUNT_SAS = "SOFT_DELETE_ACCOUNT_SAS",
  SOFT_DELETE_STORAGE_CONNECTION_STRING = "SOFT_DELETE_STORAGE_CONNECTION_STRING",
  SOFT_DELETE_STORAGE_CONNECTION_STRING_WITH_SAS = "SOFT_DELETE_STORAGE_CONNECTION_STRING_WITH_SAS",
  PREMIUM_FILE_ACCOUNT_NAME = "PREMIUM_FILE_ACCOUNT_NAME",
  PREMIUM_FILE_ACCOUNT_FILE_URL = "PREMIUM_FILE_ACCOUNT_FILE_URL",
  PREMIUM_FILE_ACCOUNT_KEY = "PREMIUM_FILE_ACCOUNT_KEY",
  PREMIUM_FILE_ACCOUNT_SAS = "PREMIUM_FILE_ACCOUNT_SAS",
  PREMIUM_FILE_STORAGE_CONNECTION_STRING = "PREMIUM_FILE_STORAGE_CONNECTION_STRING",
  PREMIUM_FILE_STORAGE_CONNECTION_STRING_WITH_SAS = "PREMIUM_FILE_STORAGE_CONNECTION_STRING_WITH_SAS",
  GRS_ACCOUNT_NAME = "GRS_ACCOUNT_NAME",
  GRS_ACCOUNT_BLOB_URL = "GRS_ACCOUNT_BLOB_URL",
  GRS_ACCOUNT_FILE_URL = "GRS_ACCOUNT_FILE_URL",
  GRS_ACCOUNT_QUEUE_URL = "GRS_ACCOUNT_QUEUE_URL",
  GRS_ACCOUNT_KEY = "GRS_ACCOUNT_KEY",
  GRS_ACCOUNT_SAS = "GRS_ACCOUNT_SAS",
  GRS_STORAGE_CONNECTION_STRING = "GRS_STORAGE_CONNECTION_STRING",
  GRS_STORAGE_CONNECTION_STRING_WITH_SAS = "GRS_STORAGE_CONNECTION_STRING_WITH_SAS",
  GRS_ACCOUNT_SECONDARY_BLOB_URL = "GRS_ACCOUNT_SECONDARY_BLOB_URL",
  GRS_ACCOUNT_SECONDARY_FILE_URL = "GRS_ACCOUNT_SECONDARY_FILE_URL",
  GRS_ACCOUNT_SECONDARY_QUEUE_URL = "GRS_ACCOUNT_SECONDARY_QUEUE_URL",
  OR_DEST_ACCOUNT_NAME = "OR_DEST_ACCOUNT_NAME",
  OR_DEST_ACCOUNT_BLOB_URL = "OR_DEST_ACCOUNT_BLOB_URL",
  OR_DEST_ACCOUNT_FILE_URL = "OR_DEST_ACCOUNT_FILE_URL",
  OR_DEST_ACCOUNT_QUEUE_URL = "OR_DEST_ACCOUNT_QUEUE_URL",
  OR_DEST_ACCOUNT_KEY = "OR_DEST_ACCOUNT_KEY",
  OR_DEST_ACCOUNT_SAS = "OR_DEST_ACCOUNT_SAS",
  OR_DEST_STORAGE_CONNECTION_STRING = "OR_DEST_STORAGE_CONNECTION_STRING",
  OR_DEST_STORAGE_CONNECTION_STRING_WITH_SAS = "OR_DEST_STORAGE_CONNECTION_STRING_WITH_SAS",
  MD_ACCOUNT_NAME = "MD_ACCOUNT_NAME",
  MD_ACCOUNT_KEY = "MD_ACCOUNT_KEY",
  OR_SOURCE_CONTAINER_NAME = "OR_SOURCE_CONTAINER_NAME",
  OR_DEST_CONTAINER_NAME = "OR_DEST_CONTAINER_NAME",
  IMMUTABLE_CONTAINER_NAME = "IMMUTABLE_CONTAINER_NAME",
  CUSTOMER_PROVIDED_KEY = "CUSTOMER_PROVIDED_KEY",
  ENCRYPTION_SCOPE_1 = "ENCRYPTION_SCOPE_1",
  ENCRYPTION_SCOPE_2 = "ENCRYPTION_SCOPE_2",
}

export const ACCOUNT_NAME = "fakeaccountname";
export const ACCOUNT_BLOB_URL = `https://${ACCOUNT_NAME}.blob.core.windows.net/`;
export const ACCOUNT_FILE_URL = `https://${ACCOUNT_NAME}.file.core.windows.net/`;
export const ACCOUNT_QUEUE_URL = `https://${ACCOUNT_NAME}.queue.core.windows.net/`;
export const ACCOUNT_KEY = "fakeaccountkey";
export const ACCOUNT_SAS =
  "sv=Sanitized&ss=bfqt&srt=sco&sp=rwdlacup&se=2025-09-03T18%3A13%3A39.8140000Z&sig=sanitizedsig";
export const STORAGE_CONNECTION_STRING = `DefaultEndpointsProtocol=https;AccountName=${ACCOUNT_NAME};AccountKey=${ACCOUNT_KEY};EndpointSuffix=core.windows.net`;
export const STORAGE_CONNECTION_STRING_WITH_SAS = `BlobEndpoint=${ACCOUNT_BLOB_URL};FileEndpoint=${ACCOUNT_FILE_URL};SharedAccessSignature=${ACCOUNT_SAS}`;
export const DFS_ACCOUNT_NAME = "fakedefsaccountname";
export const DFS_ACCOUNT_BLOB_URL = `https://${DFS_ACCOUNT_NAME}.dfs.core.windows.net/`;
export const DFS_ACCOUNT_FILE_URL = `https://${DFS_ACCOUNT_NAME}.dfs.core.windows.net/`;
export const DFS_ACCOUNT_QUEUE_URL = `https://${DFS_ACCOUNT_NAME}.queue.core.windows.net/`;
export const DFS_ACCOUNT_KEY = "fakedefsaccountkey";
export const DFS_ACCOUNT_SAS =
  "sv=Sanitized&ss=bfqt&srt=sco&sp=rwdlacup&se=2025-09-03T18%3A13%3A39.8140000Z&sig=sanitizedsig";
export const DFS_STORAGE_CONNECTION_STRING = `DefaultEndpointsProtocol=https;AccountName=${DFS_ACCOUNT_NAME};AccountKey=${DFS_ACCOUNT_KEY};EndpointSuffix=core.windows.net`;
export const DFS_STORAGE_CONNECTION_STRING_WITH_SAS = `BlobEndpoint=${DFS_ACCOUNT_BLOB_URL};FileEndpoint=${DFS_ACCOUNT_FILE_URL};SharedAccessSignature=${DFS_ACCOUNT_SAS}`;
export const DFS_SOFT_DELETE_ACCOUNT_NAME = "fakedefssoftdeleteaccountname";
export const DFS_SOFT_DELETE_ACCOUNT_BLOB_URL = `https://${DFS_SOFT_DELETE_ACCOUNT_NAME}.dfs.core.windows.net/`;
export const DFS_SOFT_DELETE_ACCOUNT_FILE_URL = `https://${DFS_SOFT_DELETE_ACCOUNT_NAME}.dfs.core.windows.net/`;
export const DFS_SOFT_DELETE_ACCOUNT_QUEUE_URL = `https://${DFS_SOFT_DELETE_ACCOUNT_NAME}.queue.core.windows.net/`;
export const DFS_SOFT_DELETE_ACCOUNT_KEY = "fakedefssoftdeleteaccountkey";
export const DFS_SOFT_DELETE_ACCOUNT_SAS =
  "sv=Sanitized&ss=bfqt&srt=sco&sp=rwdlacup&se=2025-09-03T18%3A13%3A39.8140000Z&sig=sanitizedsig";
export const DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING = `DefaultEndpointsProtocol=https;AccountName=${DFS_SOFT_DELETE_ACCOUNT_NAME};AccountKey=${DFS_SOFT_DELETE_ACCOUNT_KEY};EndpointSuffix=core.windows.net`;
export const DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING_WITH_SAS = `BlobEndpoint=${DFS_SOFT_DELETE_ACCOUNT_BLOB_URL};FileEndpoint=${DFS_SOFT_DELETE_ACCOUNT_FILE_URL};SharedAccessSignature=${DFS_SOFT_DELETE_ACCOUNT_SAS}`;
export const FULL_ACCOUNT_NAME = "fakefullaccountname";
export const FULL_ACCOUNT_BLOB_URL = `https://${FULL_ACCOUNT_NAME}.blob.core.windows.net/`;
export const FULL_ACCOUNT_FILE_URL = `https://${FULL_ACCOUNT_NAME}.file.core.windows.net/`;
export const FULL_ACCOUNT_QUEUE_URL = `https://${FULL_ACCOUNT_NAME}.queue.core.windows.net/`;
export const FULL_ACCOUNT_KEY = "fakefullaccountkey";
export const FULL_ACCOUNT_SAS =
  "sv=Sanitized&ss=bfqt&srt=sco&sp=rwdlacup&se=2025-09-03T18%3A13%3A39.8140000Z&sig=sanitizedsig";
export const FULL_STORAGE_CONNECTION_STRING = `DefaultEndpointsProtocol=https;AccountName=${FULL_ACCOUNT_NAME};AccountKey=${FULL_ACCOUNT_KEY};EndpointSuffix=core.windows.net`;
export const FULL_STORAGE_CONNECTION_STRING_WITH_SAS = `BlobEndpoint=${FULL_ACCOUNT_BLOB_URL};FileEndpoint=${FULL_ACCOUNT_FILE_URL};SharedAccessSignature=${FULL_ACCOUNT_SAS}`;
export const SOFT_DELETE_ACCOUNT_NAME = "fakesoftdeleteaccountname";
export const SOFT_DELETE_ACCOUNT_BLOB_URL = `https://${SOFT_DELETE_ACCOUNT_NAME}.blob.core.windows.net/`;
export const SOFT_DELETE_ACCOUNT_FILE_URL = `https://${SOFT_DELETE_ACCOUNT_NAME}.file.core.windows.net/`;
export const SOFT_DELETE_ACCOUNT_QUEUE_URL = `https://${SOFT_DELETE_ACCOUNT_NAME}.queue.core.windows.net/`;
export const SOFT_DELETE_ACCOUNT_KEY = "fakesoftdeleteaccountkey";
export const SOFT_DELETE_ACCOUNT_SAS =
  "sv=Sanitized&ss=bfqt&srt=sco&sp=rwdlacup&se=2025-09-03T18%3A13%3A39.8140000Z&sig=sanitizedsig";
export const SOFT_DELETE_STORAGE_CONNECTION_STRING = `DefaultEndpointsProtocol=https;AccountName=${SOFT_DELETE_ACCOUNT_NAME};AccountKey=${SOFT_DELETE_ACCOUNT_KEY};EndpointSuffix=core.windows.net`;
export const SOFT_DELETE_STORAGE_CONNECTION_STRING_WITH_SAS = `BlobEndpoint=${SOFT_DELETE_ACCOUNT_BLOB_URL};FileEndpoint=${SOFT_DELETE_ACCOUNT_FILE_URL};SharedAccessSignature=${SOFT_DELETE_ACCOUNT_SAS}`;
export const PREMIUM_FILE_ACCOUNT_NAME = "fakepremiumfileaccountname";
export const PREMIUM_FILE_ACCOUNT_FILE_URL = `https://${PREMIUM_FILE_ACCOUNT_NAME}.file.core.windows.net/`;
export const PREMIUM_FILE_ACCOUNT_KEY = "fakepremiumfileaccountkey";
export const PREMIUM_FILE_ACCOUNT_SAS =
  "sv=Sanitized&ss=bfqt&srt=sco&sp=rwdlacup&se=2025-09-03T18%3A13%3A39.8140000Z&sig=sanitizedsig";
export const PREMIUM_FILE_STORAGE_CONNECTION_STRING = `DefaultEndpointsProtocol=https;AccountName=${PREMIUM_FILE_ACCOUNT_NAME};AccountKey=${PREMIUM_FILE_ACCOUNT_KEY};EndpointSuffix=core.windows.net`;
export const PREMIUM_FILE_STORAGE_CONNECTION_STRING_WITH_SAS = `FileEndpoint=${PREMIUM_FILE_ACCOUNT_FILE_URL};SharedAccessSignature=${PREMIUM_FILE_ACCOUNT_SAS}`;
export const GRS_ACCOUNT_NAME = "grsfakeaccountname-secondary";
export const GRS_ACCOUNT_BLOB_URL = `https://${GRS_ACCOUNT_NAME}.blob.core.windows.net/`;
export const GRS_ACCOUNT_FILE_URL = `https://${GRS_ACCOUNT_NAME}.file.core.windows.net/`;
export const GRS_ACCOUNT_QUEUE_URL = `https://${GRS_ACCOUNT_NAME}.queue.core.windows.net/`;
export const GRS_ACCOUNT_KEY = "fakegrsaccountkey";
export const GRS_ACCOUNT_SAS =
  "sv=Sanitized&ss=bfqt&srt=sco&sp=rwdlacup&se=2025-09-03T18%3A13%3A39.8140000Z&sig=sanitizedsig";
export const GRS_STORAGE_CONNECTION_STRING = `DefaultEndpointsProtocol=https;AccountName=${GRS_ACCOUNT_NAME};AccountKey=${GRS_ACCOUNT_KEY};EndpointSuffix=core.windows.net`;
export const GRS_STORAGE_CONNECTION_STRING_WITH_SAS = `BlobEndpoint=${GRS_ACCOUNT_BLOB_URL};FileEndpoint=${GRS_ACCOUNT_FILE_URL};SharedAccessSignature=${GRS_ACCOUNT_SAS}`;
// Secondary (RA-GRS) endpoint variants for read-only operations
export const GRS_ACCOUNT_SECONDARY_BLOB_URL = `https://grsfakeaccountname-secondary.blob.core.windows.net/`;
export const GRS_ACCOUNT_SECONDARY_FILE_URL = `https://grsfakeaccountname-secondary.file.core.windows.net/`;
export const GRS_ACCOUNT_SECONDARY_QUEUE_URL = `https://grsfakeaccountname-secondary.queue.core.windows.net/`;
export const OR_DEST_ACCOUNT_NAME = "fakeordestaccountname";
export const OR_DEST_ACCOUNT_BLOB_URL = `https://${OR_DEST_ACCOUNT_NAME}.blob.core.windows.net/`;
export const OR_DEST_ACCOUNT_FILE_URL = `https://${OR_DEST_ACCOUNT_NAME}.file.core.windows.net/`;
export const OR_DEST_ACCOUNT_QUEUE_URL = `https://${OR_DEST_ACCOUNT_NAME}.queue.core.windows.net/`;
export const OR_DEST_ACCOUNT_KEY = "fakeordestaccountkey";
export const OR_DEST_ACCOUNT_SAS =
  "sv=Sanitized&ss=bfqt&srt=sco&sp=rwdlacup&se=2025-09-03T18%3A13%3A39.8140000Z&sig=sanitizedsig";
export const OR_DEST_STORAGE_CONNECTION_STRING = `DefaultEndpointsProtocol=https;AccountName=${OR_DEST_ACCOUNT_NAME};AccountKey=${OR_DEST_ACCOUNT_KEY};EndpointSuffix=core.windows.net`;
export const OR_DEST_STORAGE_CONNECTION_STRING_WITH_SAS = `BlobEndpoint=${OR_DEST_ACCOUNT_BLOB_URL};FileEndpoint=${OR_DEST_ACCOUNT_FILE_URL};SharedAccessSignature=${OR_DEST_ACCOUNT_SAS}`;
export const MD_ACCOUNT_NAME = "fakemdaccountname";
export const MD_ACCOUNT_BLOB_URL = `https://${MD_ACCOUNT_NAME}.blob.core.windows.net/`;
export const MD_ACCOUNT_FILE_URL = `https://${MD_ACCOUNT_NAME}.file.core.windows.net/`;
export const MD_ACCOUNT_QUEUE_URL = `https://${MD_ACCOUNT_NAME}.queue.core.windows.net/`;
export const MD_ACCOUNT_KEY = "fakemdaccountkey";
export const OR_SOURCE_CONTAINER_NAME = "src";
export const OR_DEST_CONTAINER_NAME = "dest";
export const IMMUTABLE_CONTAINER_NAME = "immutable";
export const CUSTOMER_PROVIDED_KEY = {
  encryptionKey: "MDEyMzQ1NjcwMTIzNDU2NzAxMjM0NTY3MDEyMzQ1Njc=",
  encryptionKeySha256: "3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=",
  encryptionAlgorithm: "AES256" as const,
};
export const ENCRYPTION_SCOPE_1 = "encryptionScope1";
export const ENCRYPTION_SCOPE_2 = "encryptionScope2";
