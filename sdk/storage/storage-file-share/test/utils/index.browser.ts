// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AnonymousCredential } from "../../../storage-blob/src/credentials/AnonymousCredential";
import { newPipeline } from "../../../storage-blob/src/Pipeline";
import { ShareServiceClient } from "../../src/ShareServiceClient";
import { createXhrHttpClient } from "@azure/test-utils";
import { isLiveMode } from "@azure-tools/test-recorder";
import { setTestOnlySetHttpClient } from "../../src/StorageClient";

export * from "./testutils.common";

export function getGenericBSU(
  accountType: string,
  accountNameSuffix: string = ""
): ShareServiceClient {
  // only needed until we can migrate to test recorder v2
  if (!isLiveMode()) {
    setTestOnlySetHttpClient(createXhrHttpClient());
  }
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

  // don't add the test account SAS value.
  if (accountSAS === "?fakeSasToken") {
    accountSAS = "";
  }

  const credentials = new AnonymousCredential();
  const pipeline = newPipeline(credentials, {
    // Enable logger when debugging
    // logger: new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO)
  });
  const filePrimaryURL = `https://${accountName}${accountNameSuffix}.file.core.windows.net${accountSAS}`;
  return new ShareServiceClient(filePrimaryURL, pipeline);
}

export function getBSU(): ShareServiceClient {
  return getGenericBSU("");
}

export function getAlternateBSU(): ShareServiceClient {
  return getGenericBSU("SECONDARY_", "-secondary");
}

export function getSoftDeleteBSU(): ShareServiceClient {
  return getGenericBSU("SOFT_DELETE_");
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
  _length?: number
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
  if (!isLiveMode()) {
    setTestOnlySetHttpClient(createXhrHttpClient());
  }
  const env = (self as any).__env__;
  let sasToken: string = env.ACCOUNT_SAS;
  // connection string SAS doesn't have the prefix
  if (sasToken && sasToken.startsWith("?")) {
    sasToken = sasToken.slice(1);
  }
  return `BlobEndpoint=https://${env.ACCOUNT_NAME}.blob.core.windows.net/;QueueEndpoint=https://${env.ACCOUNT_NAME}.queue.core.windows.net/;FileEndpoint=https://${env.ACCOUNT_NAME}.file.core.windows.net/;TableEndpoint=https://${env.ACCOUNT_NAME}.table.core.windows.net/;SharedAccessSignature=${sasToken}`;
}

export function arraysEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/**
 * Compare the content of body from downloading operation methods with a Uint8Array.
 * Works in both Node.js and browsers.
 *
 * @param response - Convenience layer methods response with downloaded body
 * @param uint8arry -
 */
export async function compareBodyWithUint8Array(
  response: {
    readableStreamBody?: NodeJS.ReadableStream;
    blobBody?: Promise<Blob>;
  },
  uint8arry: Uint8Array
): Promise<boolean> {
  const blob = await response.blobBody!;
  return arraysEqual(uint8arry, new Uint8Array(await blob.arrayBuffer()));
}
