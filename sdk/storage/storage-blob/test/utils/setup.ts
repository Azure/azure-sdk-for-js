// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createLiveCredential } from "@azure-tools/test-credential";
import type { TestProject } from "vitest/node";
import { EnvVarKeys } from "./constants.js";
import * as MOCKS from "./constants.js";
import { type StorageAccount, StorageManagementClient } from "@azure/arm-storage";
import { BlobServiceClient } from "@azure/storage-blob";
import { randomBytes, createHash } from "node:crypto";
import type { CpkInfo } from "@azure/storage-blob";

declare module "vitest" {
  export interface ProvidedContext
    extends Record<Exclude<EnvVarKeys, EnvVarKeys.CUSTOMER_PROVIDED_KEY>, string | undefined> {
    [EnvVarKeys.ACCOUNT_NAME]: string;
    [EnvVarKeys.ACCOUNT_BLOB_URL]: string;
    [EnvVarKeys.ACCOUNT_FILE_URL]: string;
    [EnvVarKeys.ACCOUNT_QUEUE_URL]: string;
    [EnvVarKeys.DFS_ACCOUNT_NAME]: string;
    [EnvVarKeys.DFS_ACCOUNT_BLOB_URL]: string;
    [EnvVarKeys.DFS_ACCOUNT_FILE_URL]: string;
    [EnvVarKeys.DFS_ACCOUNT_QUEUE_URL]: string;
    [EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_NAME]: string;
    [EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_BLOB_URL]: string;
    [EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_FILE_URL]: string;
    [EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_QUEUE_URL]: string;
    [EnvVarKeys.FULL_ACCOUNT_NAME]: string;
    [EnvVarKeys.FULL_ACCOUNT_BLOB_URL]: string;
    [EnvVarKeys.FULL_ACCOUNT_FILE_URL]: string;
    [EnvVarKeys.FULL_ACCOUNT_QUEUE_URL]: string;
    [EnvVarKeys.SOFT_DELETE_ACCOUNT_NAME]: string;
    [EnvVarKeys.SOFT_DELETE_ACCOUNT_BLOB_URL]: string;
    [EnvVarKeys.SOFT_DELETE_ACCOUNT_FILE_URL]: string;
    [EnvVarKeys.SOFT_DELETE_ACCOUNT_QUEUE_URL]: string;
    [EnvVarKeys.PREMIUM_FILE_ACCOUNT_NAME]: string;
    [EnvVarKeys.PREMIUM_FILE_ACCOUNT_FILE_URL]: string;
    [EnvVarKeys.GRS_ACCOUNT_NAME]: string;
    [EnvVarKeys.GRS_ACCOUNT_BLOB_URL]: string;
    [EnvVarKeys.GRS_ACCOUNT_FILE_URL]: string;
    [EnvVarKeys.GRS_ACCOUNT_QUEUE_URL]: string;
    [EnvVarKeys.GRS_ACCOUNT_SECONDARY_BLOB_URL]: string;
    [EnvVarKeys.GRS_ACCOUNT_SECONDARY_FILE_URL]: string;
    [EnvVarKeys.GRS_ACCOUNT_SECONDARY_QUEUE_URL]: string;
    [EnvVarKeys.OR_DEST_ACCOUNT_NAME]: string;
    [EnvVarKeys.OR_DEST_ACCOUNT_BLOB_URL]: string;
    [EnvVarKeys.OR_DEST_ACCOUNT_FILE_URL]: string;
    [EnvVarKeys.OR_DEST_ACCOUNT_QUEUE_URL]: string;
    [EnvVarKeys.IMMUTABLE_CONTAINER_NAME]: string;
    [EnvVarKeys.CUSTOMER_PROVIDED_KEY]: Required<CpkInfo>;
    [EnvVarKeys.ENCRYPTION_SCOPE_1]: string;
    [EnvVarKeys.ENCRYPTION_SCOPE_2]: string;
  }
}

function createCustomerProvidedKey(): Required<CpkInfo> {
  const rawKey = randomBytes(32); // 256-bit
  const encryptionKey = rawKey.toString("base64");
  const encryptionKeySha256 = createHash("sha256").update(rawKey).digest("base64");
  return {
    encryptionKey,
    encryptionKeySha256,
    encryptionAlgorithm: "AES256" as const,
  };
}

/**
 * Set an environment variable only if it is currently unset (undefined).
 * You may supply either a literal value or a function that derives a value
 * from the existing (currently undefined) value. The function is only invoked
 * if the variable is unset. Empty (""), null, or undefined resolved values are ignored.
 * A present variable (even if empty string) is considered set and will not be overwritten.
 *
 * @param name - Environment variable name.
 * @param valueOrFactory - String value, or a function returning the value.
 * @returns true if the variable was set by this call, false otherwise.
 */
export function setEnv(
  name: string | undefined,
  valueOrFactory:
    | string
    | null
    | undefined
    | ((current: string | undefined) => string | null | undefined),
  { overwrite }: { overwrite?: boolean } = {},
): boolean {
  if (!name) {
    return false;
  }
  const alreadyHas =
    Object.prototype.hasOwnProperty.call(process.env, name) && process.env[name] !== undefined;
  if (alreadyHas && !overwrite) {
    return false;
  }
  let next: string | null | undefined;
  if (typeof valueOrFactory === "function") {
    next = valueOrFactory(process.env[name]);
  } else {
    next = valueOrFactory;
  }
  if (next === undefined || next === null || next === "") {
    return false;
  }
  process.env[name] = next;
  return true;
}

function assertEnvironmentVariable<
  T extends Exclude<
    typeof EnvVarKeys,
    | EnvVarKeys.ACCOUNT_NAME
    | EnvVarKeys.ACCOUNT_BLOB_URL
    | EnvVarKeys.ACCOUNT_FILE_URL
    | EnvVarKeys.ACCOUNT_QUEUE_URL
    | EnvVarKeys.DFS_ACCOUNT_NAME
    | EnvVarKeys.DFS_ACCOUNT_BLOB_URL
    | EnvVarKeys.DFS_ACCOUNT_FILE_URL
    | EnvVarKeys.DFS_ACCOUNT_QUEUE_URL
    | EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_NAME
    | EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_BLOB_URL
    | EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_FILE_URL
    | EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_QUEUE_URL
    | EnvVarKeys.FULL_ACCOUNT_NAME
    | EnvVarKeys.FULL_ACCOUNT_BLOB_URL
    | EnvVarKeys.FULL_ACCOUNT_FILE_URL
    | EnvVarKeys.FULL_ACCOUNT_QUEUE_URL
    | EnvVarKeys.SOFT_DELETE_ACCOUNT_NAME
    | EnvVarKeys.SOFT_DELETE_ACCOUNT_BLOB_URL
    | EnvVarKeys.SOFT_DELETE_ACCOUNT_FILE_URL
    | EnvVarKeys.SOFT_DELETE_ACCOUNT_QUEUE_URL
    | EnvVarKeys.PREMIUM_FILE_ACCOUNT_NAME
    | EnvVarKeys.PREMIUM_FILE_ACCOUNT_FILE_URL
    | EnvVarKeys.GRS_ACCOUNT_NAME
    | EnvVarKeys.GRS_ACCOUNT_BLOB_URL
    | EnvVarKeys.GRS_ACCOUNT_FILE_URL
    | EnvVarKeys.GRS_ACCOUNT_QUEUE_URL
    | EnvVarKeys.OR_DEST_ACCOUNT_NAME
    | EnvVarKeys.OR_DEST_ACCOUNT_BLOB_URL
    | EnvVarKeys.OR_DEST_ACCOUNT_FILE_URL
    | EnvVarKeys.OR_DEST_ACCOUNT_QUEUE_URL
    | EnvVarKeys.OR_SOURCE_CONTAINER_NAME
    | EnvVarKeys.OR_DEST_CONTAINER_NAME
    | EnvVarKeys.IMMUTABLE_CONTAINER_NAME
  >,
>(key: T): string | undefined;
function assertEnvironmentVariable(key: string): string;
function assertEnvironmentVariable(key: string): string | undefined {
  const value = process.env[key];
  if (key === EnvVarKeys.TEST_MODE) {
    return !value ? value : value.toLowerCase();
  }
  if (
    !(
      [
        EnvVarKeys.ACCOUNT_NAME,
        EnvVarKeys.ACCOUNT_BLOB_URL,
        EnvVarKeys.ACCOUNT_FILE_URL,
        EnvVarKeys.ACCOUNT_QUEUE_URL,
        EnvVarKeys.DFS_ACCOUNT_NAME,
        EnvVarKeys.DFS_ACCOUNT_BLOB_URL,
        EnvVarKeys.DFS_ACCOUNT_FILE_URL,
        EnvVarKeys.DFS_ACCOUNT_QUEUE_URL,
        EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_NAME,
        EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_BLOB_URL,
        EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_FILE_URL,
        EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_QUEUE_URL,
        EnvVarKeys.FULL_ACCOUNT_NAME,
        EnvVarKeys.FULL_ACCOUNT_BLOB_URL,
        EnvVarKeys.FULL_ACCOUNT_FILE_URL,
        EnvVarKeys.FULL_ACCOUNT_QUEUE_URL,
        EnvVarKeys.SOFT_DELETE_ACCOUNT_NAME,
        EnvVarKeys.SOFT_DELETE_ACCOUNT_BLOB_URL,
        EnvVarKeys.SOFT_DELETE_ACCOUNT_FILE_URL,
        EnvVarKeys.SOFT_DELETE_ACCOUNT_QUEUE_URL,
        EnvVarKeys.PREMIUM_FILE_ACCOUNT_NAME,
        EnvVarKeys.PREMIUM_FILE_ACCOUNT_FILE_URL,
        EnvVarKeys.GRS_ACCOUNT_NAME,
        EnvVarKeys.GRS_ACCOUNT_BLOB_URL,
        EnvVarKeys.GRS_ACCOUNT_FILE_URL,
        EnvVarKeys.GRS_ACCOUNT_QUEUE_URL,
        EnvVarKeys.GRS_ACCOUNT_SECONDARY_BLOB_URL,
        EnvVarKeys.GRS_ACCOUNT_SECONDARY_FILE_URL,
        EnvVarKeys.GRS_ACCOUNT_SECONDARY_QUEUE_URL,
        EnvVarKeys.OR_DEST_ACCOUNT_NAME,
        EnvVarKeys.OR_DEST_ACCOUNT_BLOB_URL,
        EnvVarKeys.OR_DEST_ACCOUNT_FILE_URL,
        EnvVarKeys.OR_DEST_ACCOUNT_QUEUE_URL,
        EnvVarKeys.OR_SOURCE_CONTAINER_NAME,
        EnvVarKeys.OR_DEST_CONTAINER_NAME,
        EnvVarKeys.IMMUTABLE_CONTAINER_NAME,
      ] as string[]
    ).includes(key)
  ) {
    return value;
  }
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined.`);
  }
  return value;
}

async function ensureSharedKeyAndSas(
  mgmtClient: StorageManagementClient,
  rgName: string,
  accountName: string,
  accountUrlEnvVarName: string | undefined,
  accountFileUrlEnvVarName: string | undefined,
  accountQueueUrlEnvVarName: string | undefined,
  accountKeyEnvVarName: string,
  accountSasEnvVarName: string,
  connectionStringEnvVarName: string,
  connectionStringEnvVarNameWithSas: string,
  endpointSuffix: string,
): Promise<StorageAccount> {
  const props = await mgmtClient.storageAccounts.getProperties(rgName, accountName);
  const blobUrl = props.primaryEndpoints?.blob;
  const fileUrl = props.primaryEndpoints?.file;
  const queueUrl = props.primaryEndpoints?.queue;
  setEnv(accountUrlEnvVarName, blobUrl);
  setEnv(accountFileUrlEnvVarName, fileUrl);
  setEnv(accountQueueUrlEnvVarName, queueUrl);
  const { allowSharedKeyAccess } = props;
  if (!allowSharedKeyAccess) {
    return props;
  }

  const { keys } = await mgmtClient.storageAccounts.listKeys(rgName, accountName);
  if (!keys || keys.length === 0) {
    throw new Error(`No keys found for storage account ${accountName}.`);
  }
  const accountKey = keys[0].value;
  setEnv(accountKeyEnvVarName, accountKey);
  const connectionString = `DefaultEndpointsProtocol=https;AccountName=${accountName};AccountKey=${accountKey};EndpointSuffix=${endpointSuffix}`;
  setEnv(connectionStringEnvVarName, connectionString);

  const { accountSasToken } = await mgmtClient.storageAccounts.listAccountSAS(rgName, accountName, {
    permissions: "rwdlacup",
    services: "bfqt",
    resourceTypes: "sco",
    keyToSign: "key2",
    sharedAccessExpiryTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
  });

  if (!accountSasToken) {
    throw new Error(`No account SAS token found for storage account ${accountName}.`);
  }
  setEnv(accountSasEnvVarName, accountSasToken);
  const connectionStringWithSas = `BlobEndpoint=${blobUrl};QueueEndpoint=${queueUrl};FileEndpoint=${fileUrl};TableEndpoint=${props.primaryEndpoints?.table};SharedAccessSignature=${accountSasToken}`;
  setEnv(connectionStringEnvVarNameWithSas, connectionStringWithSas);
  return props;
}

export default async function ({ provide }: TestProject): Promise<void> {
  const testMode = process.env[EnvVarKeys.TEST_MODE]?.toLowerCase() ?? "";
  if (["playback", ""].includes(testMode)) {
    for (const key of Object.values(EnvVarKeys)) {
      const val = (MOCKS as Record<string, unknown>)[key as string];
      if (typeof val === "string") {
        provide(key, val);
      }
    }
    provide(EnvVarKeys.CUSTOMER_PROVIDED_KEY, MOCKS.CUSTOMER_PROVIDED_KEY);
    return;
  }
  const subId = assertEnvironmentVariable(EnvVarKeys.SUBSCRIPTION_ID);
  const rgName = assertEnvironmentVariable(EnvVarKeys.RESOURCE_GROUP);
  const accountName = assertEnvironmentVariable(EnvVarKeys.ACCOUNT_NAME);
  const dfsAccountName = assertEnvironmentVariable(EnvVarKeys.DFS_ACCOUNT_NAME);
  const fullAccountName = assertEnvironmentVariable(EnvVarKeys.FULL_ACCOUNT_NAME);
  const softDeleteAccountName = assertEnvironmentVariable(EnvVarKeys.SOFT_DELETE_ACCOUNT_NAME);
  const dfsSoftDeleteAccountName = assertEnvironmentVariable(
    EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_NAME,
  );
  const premiumFileAccountName = assertEnvironmentVariable(EnvVarKeys.PREMIUM_FILE_ACCOUNT_NAME);
  const grsAccountName = assertEnvironmentVariable(EnvVarKeys.GRS_ACCOUNT_NAME);
  const orDestAccountName = assertEnvironmentVariable(EnvVarKeys.OR_DEST_ACCOUNT_NAME);
  const orSourceContainerName = assertEnvironmentVariable(EnvVarKeys.OR_SOURCE_CONTAINER_NAME);
  const orDestContainerName = assertEnvironmentVariable(EnvVarKeys.OR_DEST_CONTAINER_NAME);

  const cred = createLiveCredential();
  const mgmtClient = new StorageManagementClient(cred, subId);
  let endpointSuffix = "core.windows.net";
  try {
    const props = await mgmtClient.storageAccounts.getProperties(rgName, accountName);
    const blobEndpoint = props.primaryEndpoints?.blob;
    if (blobEndpoint) {
      const host = new URL(blobEndpoint).hostname;
      const parts = host.split(".");
      if (parts.length > 2) {
        endpointSuffix = parts.slice(2).join(".");
      }
    }
  } catch {
    endpointSuffix = "core.windows.net";
  }
  const [_dflt, _dfs, _full, _softDelete, _dfsSoftDelete, _premiumFile, grs, orDest] =
    await Promise.all([
      ensureSharedKeyAndSas(
        mgmtClient,
        rgName,
        accountName,
        EnvVarKeys.ACCOUNT_BLOB_URL,
        EnvVarKeys.ACCOUNT_FILE_URL,
        EnvVarKeys.ACCOUNT_QUEUE_URL,
        EnvVarKeys.ACCOUNT_KEY,
        EnvVarKeys.ACCOUNT_SAS,
        EnvVarKeys.STORAGE_CONNECTION_STRING,
        EnvVarKeys.STORAGE_CONNECTION_STRING_WITH_SAS,
        endpointSuffix,
      ),
      ensureSharedKeyAndSas(
        mgmtClient,
        rgName,
        dfsAccountName,
        EnvVarKeys.DFS_ACCOUNT_BLOB_URL,
        EnvVarKeys.DFS_ACCOUNT_FILE_URL,
        EnvVarKeys.DFS_ACCOUNT_QUEUE_URL,
        EnvVarKeys.DFS_ACCOUNT_KEY,
        EnvVarKeys.DFS_ACCOUNT_SAS,
        EnvVarKeys.DFS_STORAGE_CONNECTION_STRING,
        EnvVarKeys.DFS_STORAGE_CONNECTION_STRING_WITH_SAS,
        endpointSuffix,
      ),
      ensureSharedKeyAndSas(
        mgmtClient,
        rgName,
        fullAccountName,
        EnvVarKeys.FULL_ACCOUNT_BLOB_URL,
        EnvVarKeys.FULL_ACCOUNT_FILE_URL,
        EnvVarKeys.FULL_ACCOUNT_QUEUE_URL,
        EnvVarKeys.FULL_ACCOUNT_KEY,
        EnvVarKeys.FULL_ACCOUNT_SAS,
        EnvVarKeys.FULL_STORAGE_CONNECTION_STRING,
        EnvVarKeys.FULL_STORAGE_CONNECTION_STRING_WITH_SAS,
        endpointSuffix,
      ),
      ensureSharedKeyAndSas(
        mgmtClient,
        rgName,
        softDeleteAccountName,
        EnvVarKeys.SOFT_DELETE_ACCOUNT_BLOB_URL,
        EnvVarKeys.SOFT_DELETE_ACCOUNT_FILE_URL,
        EnvVarKeys.SOFT_DELETE_ACCOUNT_QUEUE_URL,
        EnvVarKeys.SOFT_DELETE_ACCOUNT_KEY,
        EnvVarKeys.SOFT_DELETE_ACCOUNT_SAS,
        EnvVarKeys.SOFT_DELETE_STORAGE_CONNECTION_STRING,
        EnvVarKeys.SOFT_DELETE_STORAGE_CONNECTION_STRING_WITH_SAS,
        endpointSuffix,
      ),
      ensureSharedKeyAndSas(
        mgmtClient,
        rgName,
        dfsSoftDeleteAccountName,
        EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_BLOB_URL,
        EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_FILE_URL,
        EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_QUEUE_URL,
        EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_KEY,
        EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_SAS,
        EnvVarKeys.DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING,
        EnvVarKeys.DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING_WITH_SAS,
        endpointSuffix,
      ),
      ensureSharedKeyAndSas(
        mgmtClient,
        rgName,
        premiumFileAccountName,
        undefined,
        EnvVarKeys.PREMIUM_FILE_ACCOUNT_FILE_URL,
        undefined,
        EnvVarKeys.PREMIUM_FILE_ACCOUNT_KEY,
        EnvVarKeys.PREMIUM_FILE_ACCOUNT_SAS,
        EnvVarKeys.PREMIUM_FILE_STORAGE_CONNECTION_STRING,
        EnvVarKeys.PREMIUM_FILE_STORAGE_CONNECTION_STRING_WITH_SAS,
        endpointSuffix,
      ),
      ensureSharedKeyAndSas(
        mgmtClient,
        rgName,
        grsAccountName,
        EnvVarKeys.GRS_ACCOUNT_BLOB_URL,
        EnvVarKeys.GRS_ACCOUNT_FILE_URL,
        EnvVarKeys.GRS_ACCOUNT_QUEUE_URL,
        EnvVarKeys.GRS_ACCOUNT_KEY,
        EnvVarKeys.GRS_ACCOUNT_SAS,
        EnvVarKeys.GRS_STORAGE_CONNECTION_STRING,
        EnvVarKeys.GRS_STORAGE_CONNECTION_STRING_WITH_SAS,
        endpointSuffix,
      ),
      ensureSharedKeyAndSas(
        mgmtClient,
        rgName,
        orDestAccountName,
        EnvVarKeys.OR_DEST_ACCOUNT_BLOB_URL,
        EnvVarKeys.OR_DEST_ACCOUNT_FILE_URL,
        EnvVarKeys.OR_DEST_ACCOUNT_QUEUE_URL,
        EnvVarKeys.OR_DEST_ACCOUNT_KEY,
        EnvVarKeys.OR_DEST_ACCOUNT_SAS,
        EnvVarKeys.OR_DEST_STORAGE_CONNECTION_STRING,
        EnvVarKeys.OR_DEST_STORAGE_CONNECTION_STRING_WITH_SAS,
        endpointSuffix,
      ),
    ]);

  let replicationFailed = false;
  try {
    const srcUrl = assertEnvironmentVariable(EnvVarKeys.GRS_ACCOUNT_BLOB_URL);
    const dstUrl = assertEnvironmentVariable(EnvVarKeys.OR_DEST_ACCOUNT_BLOB_URL);
    const srcBlobSvc = new BlobServiceClient(srcUrl, cred);
    const dstBlobSvc = new BlobServiceClient(dstUrl, cred);
    await Promise.all([
      srcBlobSvc.getContainerClient(orSourceContainerName).createIfNotExists(),
      dstBlobSvc.getContainerClient(orDestContainerName).createIfNotExists(),
    ]);

    let found = false;
    for await (const policy of mgmtClient.objectReplicationPoliciesOperations.list(
      rgName,
      orDestAccountName,
    )) {
      const firstRule = policy.rules?.[0];
      if (
        firstRule &&
        firstRule.sourceContainer === orSourceContainerName &&
        firstRule.destinationContainer === orDestContainerName
      ) {
        found = true;
        break;
      }
    }

    if (!found) {
      await mgmtClient.objectReplicationPoliciesOperations.createOrUpdate(
        rgName,
        orDestAccountName,
        "default",
        {
          sourceAccount: grs.id,
          destinationAccount: orDest.id,
          rules: [
            {
              sourceContainer: orSourceContainerName,
              destinationContainer: orDestContainerName,
            },
          ],
        },
      );
    }
  } catch (e) {
    console.warn(
      "Object replication setup failed. OR_SOURCE_CONTAINER_NAME and OR_DEST_CONTAINER_NAME will be unset.",
      e,
    );
    delete process.env[EnvVarKeys.OR_SOURCE_CONTAINER_NAME];
    delete process.env[EnvVarKeys.OR_DEST_CONTAINER_NAME];
    replicationFailed = true;
  }

  const primaryBlob = assertEnvironmentVariable(EnvVarKeys.GRS_ACCOUNT_BLOB_URL);
  const primaryFile = assertEnvironmentVariable(EnvVarKeys.GRS_ACCOUNT_FILE_URL);
  const primaryQueue = assertEnvironmentVariable(EnvVarKeys.GRS_ACCOUNT_QUEUE_URL);
  if (primaryBlob) {
    setEnv(
      EnvVarKeys.GRS_ACCOUNT_SECONDARY_BLOB_URL,
      () => primaryBlob.replace(`${grsAccountName}.blob.`, `${grsAccountName}-secondary.blob.`),
      { overwrite: true },
    );
  }
  if (primaryFile) {
    setEnv(
      EnvVarKeys.GRS_ACCOUNT_SECONDARY_FILE_URL,
      () => primaryFile.replace(`${grsAccountName}.file.`, `${grsAccountName}-secondary.file.`),
      { overwrite: true },
    );
  }
  if (primaryQueue) {
    setEnv(
      EnvVarKeys.GRS_ACCOUNT_SECONDARY_QUEUE_URL,
      () => primaryQueue.replace(`${grsAccountName}.queue.`, `${grsAccountName}-secondary.queue.`),
      { overwrite: true },
    );
  }

  for (const key of Object.values(EnvVarKeys)) {
    if (key === EnvVarKeys.CUSTOMER_PROVIDED_KEY) {
      continue;
    }
    if (
      replicationFailed &&
      (key === EnvVarKeys.OR_SOURCE_CONTAINER_NAME || key === EnvVarKeys.OR_DEST_CONTAINER_NAME)
    ) {
      continue; // skip providing replication containers when replication setup failed
    }
    provide(key, assertEnvironmentVariable(key));
  }
  provide(EnvVarKeys.CUSTOMER_PROVIDED_KEY, createCustomerProvidedKey());
}
