// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-http";

import { DataLakeServiceClient } from "../../src";
import { AnonymousCredential } from "../../src/credentials/AnonymousCredential";
import { newPipeline } from "../../src/Pipeline";
import { SimpleTokenCredential } from "./testutils.common";

export * from "./testutils.common";

export function getGenericCredential(accountType: string): AnonymousCredential {
  const _accountType = accountType; // bypass compiling error
  accountType = _accountType;
  return new AnonymousCredential();
}

export function getTokenCredential(): TokenCredential {
  const accountTokenEnvVar = `DFS_ACCOUNT_TOKEN`;
  const accountToken = (self as any).__env__[accountTokenEnvVar];

  if (!accountToken || accountToken === "") {
    throw new Error(`${accountTokenEnvVar} environment variables not specified.`);
  }

  return new SimpleTokenCredential(accountToken);
}

export function getGenericDataLakeServiceClient(
  accountType: string,
  accountNameSuffix: string = ""
): DataLakeServiceClient {
  const accountNameEnvVar = `${accountType}ACCOUNT_NAME`;
  const accountSASEnvVar = `${accountType}ACCOUNT_SAS`;

  const accountName = (self as any).__env__[accountNameEnvVar];

  let accountSAS: string | undefined;
  accountSAS = (self as any).__env__[accountSASEnvVar];

  if (!accountName || !accountSAS || accountName === "" || accountSAS === "") {
    throw new Error(
      `${accountNameEnvVar} and/or ${accountSASEnvVar} environment variables not specified.`
    );
  }

  if (accountSAS) {
    accountSAS = accountSAS.startsWith("?") ? accountSAS : `?${accountSAS}`;
  }

  const credentials = getGenericCredential(accountType);
  const pipeline = newPipeline(credentials, {
    // Enable logger when debugging
    // logger: new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO)
  });
  const dfsPrimaryURL = `https://${accountName}${accountNameSuffix}.dfs.core.windows.net${accountSAS}`;
  return new DataLakeServiceClient(dfsPrimaryURL, pipeline);
}

export function getTokenDataLakeServiceClient(): DataLakeServiceClient {
  const accountNameEnvVar = `DFS_ACCOUNT_NAME`;
  const accountName = (self as any).__env__[accountNameEnvVar];

  if (!accountName || accountName === "") {
    throw new Error(`${accountNameEnvVar} environment variables not specified.`);
  }

  const credentials = getTokenCredential();
  const pipeline = newPipeline(credentials, {
    // Enable logger when debugging
    // logger: new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO)
  });
  const dfsPrimaryURL = `https://${accountName}.dfs.core.windows.net/`;
  return new DataLakeServiceClient(dfsPrimaryURL, pipeline);
}

export function getDataLakeServiceClient(): DataLakeServiceClient {
  return getGenericDataLakeServiceClient("DFS_");
}

export function getAlternateDataLakeServiceClient(): DataLakeServiceClient {
  return getGenericDataLakeServiceClient("SECONDARY_", "-secondary");
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
  _length?: number
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

  // IE11 & Edge doesn't support create File using var file = new File([binary], name);
  // We leverage Blob() to mock a File

  const file = new Blob([uint8Arr]) as any;
  file.name = name;
  return file;
}

export function getSASConnectionStringFromEnvironment(): string {
  const env = (self as any).__env__;
  return `BlobEndpoint=https://${env.DFS_ACCOUNT_NAME}.blob.core.windows.net/;QueueEndpoint=https://${env.DFS_ACCOUNT_NAME}.queue.core.windows.net/;FileEndpoint=https://${env.DFS_ACCOUNT_NAME}.file.core.windows.net/;TableEndpoint=https://${env.DFS_ACCOUNT_NAME}.table.core.windows.net/;SharedAccessSignature=${env.DFS_ACCOUNT_SAS}`;
}
