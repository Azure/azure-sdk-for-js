// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";

import { DataLakeServiceClient, newPipeline } from "../../src";
import { AnonymousCredential } from "@azure/storage-blob";
import { configureStorageClient, SimpleTokenCredential } from "./testutils.common";
import { env, Recorder } from "@azure-tools/test-recorder";

export * from "./testutils.common";

export function getGenericCredential(): AnonymousCredential {
  return new AnonymousCredential();
}

export function getTokenCredential(): TokenCredential {
  const accountTokenEnvVar = `DFS_ACCOUNT_TOKEN`;
  const accountToken = env[accountTokenEnvVar];

  if (!accountToken || accountToken === "") {
    throw new Error(`${accountTokenEnvVar} environment variables not specified.`);
  }

  return new SimpleTokenCredential(accountToken);
}

export function getGenericDataLakeServiceClient(
  recorder: Recorder,
  accountType: string,
  accountNameSuffix: string = "",
): DataLakeServiceClient {
  const accountNameEnvVar = `${accountType}ACCOUNT_NAME`;
  const accountSASEnvVar = `${accountType}ACCOUNT_SAS`;

  const accountName = env[accountNameEnvVar];

  let accountSAS: string | undefined;
  accountSAS = env[accountSASEnvVar];

  if (!accountName || !accountSAS || accountName === "" || accountSAS === "") {
    throw new Error(
      `${accountNameEnvVar} and/or ${accountSASEnvVar} environment variables not specified.`,
    );
  }

  accountSAS = accountSAS.startsWith("?") ? accountSAS : `?${accountSAS}`;

  const credentials = getGenericCredential();
  const pipeline = newPipeline(credentials);
  const dfsPrimaryURL = `https://${accountName}${accountNameSuffix}.dfs.core.windows.net${accountSAS}`;
  const client = new DataLakeServiceClient(dfsPrimaryURL, pipeline);
  configureStorageClient(recorder, client);
  return client;
}

export function getTokenDataLakeServiceClient(recorder: Recorder): DataLakeServiceClient {
  const accountNameEnvVar = `DFS_ACCOUNT_NAME`;
  const accountName = env[accountNameEnvVar];

  if (!accountName) {
    throw new Error(`${accountNameEnvVar} environment variables not specified.`);
  }

  const credentials = getTokenCredential();
  const pipeline = newPipeline(credentials);
  const dfsPrimaryURL = `https://${accountName}.dfs.core.windows.net/`;
  const client = new DataLakeServiceClient(dfsPrimaryURL, pipeline);
  configureStorageClient(recorder, client);
  return client;
}

export function getDataLakeServiceClient(recorder: Recorder): DataLakeServiceClient {
  return getGenericDataLakeServiceClient(recorder, "DFS_");
}

export function getAlternateDataLakeServiceClient(recorder: Recorder): DataLakeServiceClient {
  return getGenericDataLakeServiceClient(recorder, "SECONDARY_", "-secondary");
}

export function getEncryptionScope(): string {
  const encryptionScopeEnvVar = "ENCRYPTION_SCOPE";
  const encryptionScope = env[encryptionScopeEnvVar];

  if (!encryptionScope) {
    throw new Error(`${encryptionScopeEnvVar} environment variables not specified.`);
  }

  return encryptionScope;
}

/**
 * Read body from downloading operation methods to string.
 * Works in both Node.js and browsers.
 *
 * @param response - Convenience layer methods response with downloaded body
 * @param length - Length of Readable stream, needed for Node.js environment
 */
export async function bodyToString(
  response: {
    readableStreamBody?: NodeJS.ReadableStream;
    contentAsBlob?: Promise<Blob>;
  },
  _length?: number,
): Promise<string> {
  const blob = await response.contentAsBlob!;
  return blobToString(blob);
}

export async function blobToString(blob: Blob): Promise<string> {
  const fileReader = new FileReader();
  return new Promise<string>((resolve, reject) => {
    fileReader.onloadend = (ev: any) => {
      resolve(ev.target!.result);
    };
    fileReader.onerror = reject;
    fileReader.readAsText(blob);
  });
}

export async function blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
  const fileReader = new FileReader();
  return new Promise<ArrayBuffer>((resolve, reject) => {
    fileReader.onloadend = (ev: any) => {
      resolve(ev.target!.result);
    };
    fileReader.onerror = reject;
    fileReader.readAsArrayBuffer(blob);
  });
}

export function arrayBufferEqual(buf1: ArrayBuffer, buf2: ArrayBuffer): boolean {
  if (buf1.byteLength !== buf2.byteLength) {
    return false;
  }

  const uint8Arr1 = new Uint8Array(buf1);
  const uint8Arr2 = new Uint8Array(buf2);

  for (let i = 0; i <= uint8Arr1.length; i++) {
    if (uint8Arr1[i] !== uint8Arr2[i]) {
      return false;
    }
  }

  return true;
}

// Mock a Browser file with specified name and size
export function getBrowserFile(name: string, size: number): File {
  const uint8Arr = new Uint8Array(size);
  for (let j = 0; j < size; j++) {
    uint8Arr[j] = Math.floor(Math.random() * 256);
  }

  return new File([uint8Arr], name);
}

export function getSASConnectionStringFromEnvironment(): string {
  let sasToken: string = env.DFS_ACCOUNT_SAS ?? "";
  // connection string SAS doesn't have the prefix
  if (sasToken && sasToken.startsWith("?")) {
    sasToken = sasToken.slice(1);
  }
  return `BlobEndpoint=https://${env.DFS_ACCOUNT_NAME}.blob.core.windows.net/;QueueEndpoint=https://${env.DFS_ACCOUNT_NAME}.queue.core.windows.net/;FileEndpoint=https://${env.DFS_ACCOUNT_NAME}.file.core.windows.net/;TableEndpoint=https://${env.DFS_ACCOUNT_NAME}.table.core.windows.net/;SharedAccessSignature=${sasToken}`;
}
