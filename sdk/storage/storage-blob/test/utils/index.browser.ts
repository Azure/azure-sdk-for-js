import { AnonymousCredential } from "../../src";
import { BlobServiceClient } from "../../src";
import { newPipeline } from "../../src";
import { SimpleTokenCredential } from "./testutils.common";
import { TokenCredential } from "@azure/core-http";

export * from "./testutils.common";

export function getGenericCredential(accountType: string): AnonymousCredential {
  accountType = accountType; // bypass compiling error
  return new AnonymousCredential();
}
export function getGenericBSU(
  accountType: string,
  accountNameSuffix: string = ""
): BlobServiceClient {
  const accountNameEnvVar = `${accountType}ACCOUNT_NAME`;
  const accountSASEnvVar = `${accountType}ACCOUNT_SAS`;

  let accountName: string | undefined;
  let accountSAS: string | undefined;
  accountName = (window as any).__env__[accountNameEnvVar];
  accountSAS = (window as any).__env__[accountSASEnvVar];

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
  const blobPrimaryURL = `https://${accountName}${accountNameSuffix}.blob.core.windows.net${accountSAS}`;
  return new BlobServiceClient(blobPrimaryURL, pipeline);
}

export function getTokenCredential(): TokenCredential {
  const accountTokenEnvVar = `ACCOUNT_TOKEN`;
  let accountToken: string | undefined;

  accountToken = (window as any).__env__[accountTokenEnvVar];

  if (!accountToken || accountToken === "") {
    throw new Error(`${accountTokenEnvVar} environment variables not specified.`);
  }

  return new SimpleTokenCredential(accountToken);
}

export function getTokenBSU(): BlobServiceClient {
  const accountNameEnvVar = `ACCOUNT_NAME`;

  let accountName: string | undefined;

  accountName = (window as any).__env__[accountNameEnvVar];

  if (!accountName || accountName === "") {
    throw new Error(`${accountNameEnvVar} environment variables not specified.`);
  }

  const credentials = getTokenCredential();
  const pipeline = newPipeline(credentials, {
    // Enable logger when debugging
    // logger: new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO)
  });
  const blobPrimaryURL = `https://${accountName}.blob.core.windows.net/`;
  return new BlobServiceClient(blobPrimaryURL, pipeline);
}

export function getBSU(): BlobServiceClient {
  return getGenericBSU("");
}

export function getAlternateBSU(): BlobServiceClient {
  return getGenericBSU("SECONDARY_", "-secondary");
}

/**
 * Read body from downloading operation methods to string.
 * Work on both Node.js and browser environment.
 *
 * @param response Convenience layer methods response with downloaded body
 * @param length Length of Readable stream, needed for Node.js environment
 */
export async function bodyToString(
  response: {
    readableStreamBody?: NodeJS.ReadableStream;
    blobBody?: Promise<Blob>;
  },
  // tslint:disable-next-line:variable-name
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

export function isIE(): boolean {
  const sAgent = window.navigator.userAgent;
  const Idx = sAgent.indexOf("MSIE");

  // If IE, return version number.
  if (Idx > 0) {
    return true;
  } else if (navigator.userAgent.match(/Trident\/7\./)) {
    // IE 11
    return true;
  } else {
    return false;
  } // It is not IE
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
  const env = (window as any).__env__;
  return `BlobEndpoint=https://${env.ACCOUNT_NAME}.blob.core.windows.net/;QueueEndpoint=https://${env.ACCOUNT_NAME}.queue.core.windows.net/;FileEndpoint=https://${env.ACCOUNT_NAME}.file.core.windows.net/;TableEndpoint=https://${env.ACCOUNT_NAME}.table.core.windows.net/;SharedAccessSignature=${env.ACCOUNT_SAS}`;
}

export function isBlobVersioningDisabled(): boolean {
  const env = (window as any).__env__;
  return !env["BLOB_VERSIONING_ENABLED"];
}

export function isBlobTagsDisabled(): boolean {
  const env = (window as any).__env__;
  return !env["BLOB_TAGS_ENABLED"];
}

export function isQuickQueryDisabled(): boolean {
  const env = (window as any).__env__;
  return !env["QUICK_QUERY_ENABLED"];
}
