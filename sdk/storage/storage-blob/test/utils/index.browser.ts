// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AnonymousCredential, StoragePipelineOptions } from "../../src";
import { BlobServiceClient } from "../../src";
import { newPipeline } from "../../src";
import { SimpleTokenCredential, configureBlobStorageClient } from "./testutils.common";
import { TokenCredential } from "@azure/core-auth";
import { env, Recorder } from "@azure-tools/test-recorder";

export * from "./testutils.common";

export function getGenericCredential(): AnonymousCredential {
  return new AnonymousCredential();
}
export function getGenericBSU(
  recorder: Recorder,
  accountType: string,
  accountNameSuffix: string = "",
  pipelineOptions: StoragePipelineOptions = {},
): BlobServiceClient {
  const accountNameEnvVar = `${accountType}ACCOUNT_NAME`;
  const accountSASEnvVar = `${accountType}ACCOUNT_SAS`;

  const accountName = env[accountNameEnvVar];
  let accountSAS = env[accountSASEnvVar];

  if (!accountName || !accountSAS) {
    throw new Error(
      `${accountNameEnvVar} and/or ${accountSASEnvVar} environment variables not specified.`,
    );
  }

  if (accountSAS) {
    accountSAS = accountSAS.startsWith("?") ? accountSAS : `?${accountSAS}`;
  }

  const credentials = getGenericCredential();
  const pipeline = newPipeline(credentials, pipelineOptions);
  const blobPrimaryURL = `https://${accountName}${accountNameSuffix}.blob.core.windows.net${accountSAS}`;
  const client = new BlobServiceClient(blobPrimaryURL, pipeline);
  configureBlobStorageClient(recorder, client);
  return client;
}

export function getTokenCredential(): TokenCredential {
  const accountTokenEnvVar = `ACCOUNT_TOKEN`;

  const accountToken = env[accountTokenEnvVar];

  if (!accountToken) {
    throw new Error(`${accountTokenEnvVar} environment variables not specified.`);
  }

  return new SimpleTokenCredential(accountToken);
}

export function getEncryptionScope_1(): string {
  const encryptionScopeEnvVar = "ENCRYPTION_SCOPE_1";
  const encryptionScope = env[encryptionScopeEnvVar];

  if (!encryptionScope) {
    throw new Error(`${encryptionScopeEnvVar} environment variables not specified.`);
  }

  return encryptionScope;
}

export function getEncryptionScope_2(): string {
  const encryptionScopeEnvVar = "ENCRYPTION_SCOPE_2";
  const encryptionScope = env[encryptionScopeEnvVar];

  if (!encryptionScope) {
    throw new Error(`${encryptionScopeEnvVar} environment variables not specified.`);
  }

  return encryptionScope;
}

export function getTokenBSU(recorder: Recorder): BlobServiceClient {
  const accountNameEnvVar = `ACCOUNT_NAME`;

  const accountName = env[accountNameEnvVar];

  if (!accountName) {
    throw new Error(`${accountNameEnvVar} environment variables not specified.`);
  }

  const credentials = getTokenCredential();
  const pipeline = newPipeline(credentials);
  const blobPrimaryURL = `https://${accountName}.blob.core.windows.net/`;
  const client = new BlobServiceClient(blobPrimaryURL, pipeline);
  configureBlobStorageClient(recorder, client);
  return client;
}

export function getImmutableContainerName(): string {
  const immutableContainerEnvVar = `IMMUTABLE_CONTAINER_NAME`;

  const immutableContainerName = env[immutableContainerEnvVar];

  if (!immutableContainerName || immutableContainerName === "") {
    throw new Error(`${immutableContainerEnvVar} environment variables not specified.`);
  }

  return immutableContainerName;
}

export function getBSU(
  recorder: Recorder,
  pipelineOptions: StoragePipelineOptions = {},
): BlobServiceClient {
  return getGenericBSU(recorder, "", undefined, pipelineOptions);
}

export function getAlternateBSU(recorder: Recorder): BlobServiceClient {
  return getGenericBSU(recorder, "SECONDARY_", "-secondary");
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
    blobBody?: Promise<Blob>;
  },
  _length?: number,
): Promise<string> {
  const blob = await response.blobBody!;
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
  return `BlobEndpoint=https://${env.ACCOUNT_NAME}.blob.core.windows.net/;QueueEndpoint=https://${env.ACCOUNT_NAME}.queue.core.windows.net/;FileEndpoint=https://${env.ACCOUNT_NAME}.file.core.windows.net/;TableEndpoint=https://${env.ACCOUNT_NAME}.table.core.windows.net/;SharedAccessSignature=${env.ACCOUNT_SAS}`;
}
