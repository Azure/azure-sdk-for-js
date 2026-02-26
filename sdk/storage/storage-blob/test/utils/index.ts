// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { randomBytes } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { config } from "dotenv";
import { configureFileStorageClient, SimpleTokenCredential } from "./testutils.common.js";
import { createTestCredential } from "@azure-tools/test-credential";
import type { StoragePipelineOptions } from "../../src/index.js";
import { StorageSharedKeyCredential } from "@azure/storage-common";
import { BlobServiceClient } from "../../src/index.js";
import { getUniqueName, configureBlobStorageClient } from "./testutils.common.js";
import { newPipeline } from "../../src/index.js";
import {
  generateAccountSASQueryParameters,
  AccountSASPermissions,
  SASProtocol,
  AccountSASResourceTypes,
  AccountSASServices,
} from "../../src/index.js";
import { extractConnectionStringParts } from "../../src/utils/utils.common.js";
import type { AccessToken, TokenCredential } from "@azure/core-auth";
import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import {
  ShareServiceClient,
  StorageSharedKeyCredential as FileStorageSharedKeyCredential,
} from "@azure/storage-file-share";
import { BlobClientOptions } from "../../src/models.js";

export * from "./testutils.common.js";
config();

export function getFileGenericCredential(): FileStorageSharedKeyCredential {
  const accountNameEnvVar = `ACCOUNT_NAME`;
  const accountKeyEnvVar = `ACCOUNT_KEY`;

  const accountName = env[accountNameEnvVar];
  const accountKey = env[accountKeyEnvVar];

  if (!accountName || !accountKey || accountName === "" || accountKey === "") {
    throw new Error(
      `${accountNameEnvVar} and/or ${accountKeyEnvVar} environment variables not specified.`,
    );
  }

  return new FileStorageSharedKeyCredential(accountName, accountKey);
}

export function parseJwt(token: string): any {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

export function getGenericCredential(accountType: string): StorageSharedKeyCredential {
  const accountNameEnvVar = `${accountType}ACCOUNT_NAME`;
  const accountKeyEnvVar = `${accountType}ACCOUNT_KEY`;

  const accountName = env[accountNameEnvVar];
  const accountKey = env[accountKeyEnvVar];

  if (!accountName || !accountKey || accountName === "" || accountKey === "") {
    throw new Error(
      `${accountNameEnvVar} and/or ${accountKeyEnvVar} environment variables not specified.`,
    );
  }

  return new StorageSharedKeyCredential(accountName, accountKey);
}

export function getEncryptionScope_1(): string {
  const encryptionScopeEnvVar = "ENCRYPTION_SCOPE_1";
  const encryptionScope = env[encryptionScopeEnvVar];

  if (!encryptionScope) {
    throw new Error(`${encryptionScopeEnvVar}  environment variables not specified.`);
  }

  return encryptionScope;
}

export function getEncryptionScope_2(): string {
  const encryptionScopeEnvVar = "ENCRYPTION_SCOPE_2";
  const encryptionScope = env[encryptionScopeEnvVar];

  if (!encryptionScope) {
    throw new Error(`${encryptionScopeEnvVar}  environment variables not specified.`);
  }

  return encryptionScope;
}

export function getGenericBSU(
  recorder: Recorder,
  accountType: string,
  accountNameSuffix: string = "",
  pipelineOptions: BlobClientOptions = {},
): BlobServiceClient {
  if (
    env.STORAGE_CONNECTION_STRING &&
    env.STORAGE_CONNECTION_STRING.startsWith("UseDevelopmentStorage=true")
  ) {
    return BlobServiceClient.fromConnectionString(
      getConnectionStringFromEnvironment(),
      pipelineOptions,
    );
  } else {
    const credential = getGenericCredential(accountType) as StorageSharedKeyCredential;

    const pipeline = newPipeline(credential, pipelineOptions);
    const blobPrimaryURL = `https://${credential.accountName}${accountNameSuffix}.blob.core.windows.net/`;
    const client = new BlobServiceClient(blobPrimaryURL, pipeline, pipelineOptions);
    configureBlobStorageClient(recorder, client);
    return client;
  }
}

export function getTokenCredential(): TokenCredential {
  const accountTokenEnvVar = `ACCOUNT_TOKEN`;

  const accountToken = env[accountTokenEnvVar];

  if (!accountToken || accountToken === "") {
    throw new Error(`${accountTokenEnvVar} environment variables not specified.`);
  }

  return new SimpleTokenCredential(accountToken);
}

export function getTokenBSU(recorder: Recorder): BlobServiceClient {
  const accountNameEnvVar = `ACCOUNT_NAME`;

  const accountName = env[accountNameEnvVar];

  if (!accountName || accountName === "") {
    throw new Error(`${accountNameEnvVar} environment variables not specified.`);
  }

  const credential = getTokenCredential();
  const pipeline = newPipeline(credential);
  const blobPrimaryURL = `https://${accountName}.blob.core.windows.net/`;
  const client = new BlobServiceClient(blobPrimaryURL, pipeline);
  configureBlobStorageClient(recorder, client);
  return client;
}

export function getFileShareService(recorder: Recorder): ShareServiceClient {
  if (
    env.STORAGE_CONNECTION_STRING &&
    env.STORAGE_CONNECTION_STRING.startsWith("UseDevelopmentStorage=true")
  ) {
    return ShareServiceClient.fromConnectionString(getConnectionStringFromEnvironment());
  } else {
    const credential = getFileGenericCredential();

    const filePrimaryURL = `https://${credential.accountName}.file.core.windows.net/`;
    const client = new ShareServiceClient(filePrimaryURL, credential);
    configureFileStorageClient(recorder, client);
    return client;
  }
}

export function getTokenBSUWithDefaultCredential(
  recorder: Recorder,
  pipelineOptions: StoragePipelineOptions = {},
  accountType: string = "",
  accountNameSuffix: string = "",
): BlobServiceClient {
  const accountNameEnvVar = `${accountType}ACCOUNT_NAME`;
  const accountName = env[accountNameEnvVar];
  if (!accountName || accountName === "") {
    throw new Error(`${accountNameEnvVar} environment variables not specified.`);
  }

  const now = new Date();
  now.setDate(now.getDate() + 1);
  const credential = new SimpleTokenCredential("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InNNMV95QXhWOEdWNHlOLUI2ajJ4em1pazVBbyIsImtpZCI6InNNMV95QXhWOEdWNHlOLUI2ajJ4em1pazVBbyJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTc3MjQzMjY1NSwibmJmIjoxNzcyNDMyNjU1LCJleHAiOjE3NzI0MzY5NzksIl9jbGFpbV9uYW1lcyI6eyJncm91cHMiOiJzcmMxIn0sIl9jbGFpbV9zb3VyY2VzIjp7InNyYzEiOnsiZW5kcG9pbnQiOiJodHRwczovL2dyYXBoLndpbmRvd3MubmV0LzcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0Ny91c2Vycy9mYjMyNThmMi01NzRmLTRlMGYtYmFlNS0zNDcwYjhmMjI5MDMvZ2V0TWVtYmVyT2JqZWN0cyJ9fSwiYWNyIjoiMSIsImFpbyI6IkFZUUFlLzhiQUFBQXVsMVpvdmhlWnJzbjlybkRHWGZORFNxa2FQNncrS2U3eVVVbUdkZkRMREdiaEUxQU00WjB2clYvYzl0N0ZvTitRdGRoeVZOV1luYjNsQ2gwNjZDN1YvRUE5cjZiMjQybHB3L1ZadTlsdDZrMWxaTzU1aEYwQWVyUE8xaW1qNlU5M3l6UEYrZGRibWs0djNWUk5KQUNVaTZOZ1U0eS90eTdma0ZQWmgwaFpCQT0iLCJhbXIiOlsicHdkIiwicnNhIiwibWZhIl0sImFwcGlkIjoiMTk1MGEyNTgtMjI3Yi00ZTMxLWE5Y2YtNzE3NDk1OTQ1ZmMyIiwiYXBwaWRhY3IiOiIwIiwiZGV2aWNlaWQiOiI3OTBmNzMxMi02MDFkLTQxZGEtYWEzZC04MDVkODNjMzRmMWMiLCJmYW1pbHlfbmFtZSI6IlpodSIsImdpdmVuX25hbWUiOiJFbW1hIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiNC4xOTQuMTIyLjE3MCIsIm5hbWUiOiJFbW1hIFpodSIsIm9pZCI6ImZiMzI1OGYyLTU3NGYtNGUwZi1iYWU1LTM0NzBiOGYyMjkwMyIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0yMTQ2NzczMDg1LTkwMzM2MzI4NS03MTkzNDQ3MDctMTM3NTAyOSIsInB1aWQiOiIxMDAzMDAwMDgxNUE4NEVEIiwicHdkX3VybCI6Imh0dHBzOi8vZ28ubWljcm9zb2Z0LmNvbS9md2xpbmsvP2xpbmtpZD0yMjI0MTk4IiwicmgiOiIxLkFSb0F2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI0R21CdVRVODZoQ2tMYkNzQ2xKZXZFYUFQd2FBQS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWQiOiI4ZTVmZjE5ZC1iM2VkLTRmZDQtYjA0YS1hZDZkYWY4MGIxYzEiLCJzdWIiOiItTVFWdlhtb1FmX1Uzcmozb3dTQTdQY2hVYWR6WTBVQ1JSUS1JUWVnbk1FIiwidGlkIjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3IiwidW5pcXVlX25hbWUiOiJlbW1hemh1QG1pY3Jvc29mdC5jb20iLCJ1cG4iOiJlbW1hemh1QG1pY3Jvc29mdC5jb20iLCJ1dGkiOiJsYU1PVW9jTlYwR3ZjNk5UdTc2ckFBIiwidmVyIjoiMS4wIiwieG1zX2FjdF9mY3QiOiIzIDUiLCJ4bXNfZnRkIjoiOTFNTmd4UC11UVBEcFlnNmFNRDg3YUtYRjN4RWtSMzV5d0NzejVGMTBnOEJhMjl5WldGemIzVjBhQzFrYzIxeiIsInhtc19pZHJlbCI6IjEgMTAiLCJ4bXNfc3ViX2ZjdCI6IjMgNCJ9.bi4eGCBLtu-qdxJTSbdcPHsMn8QxaVg5FgNxGynHXzCccEF9qyyBLNo0eXsO2n7xrd31WH9-vJM-MGtMNwq8XhBQwtpELYhZPWvtlk6nP0l-zbb-0vcPxZv4wdJ9bb6eEoaz6cqx7V_MAmbTs2JF5sEk0bZZaz2bkEzSPmVWF8TPH4A0fs3339_UUd3I1ZLnIs3xrGo-KSrhoUcbOkBrHegGk4IKtENYCbPOJUEraT85huC1P8KStoAb1LG0dWL9M86MBJv0Vd4ThSxlA1zwjn74PtCOclSrKvnCXXpom0mH6lcl8k3PEX53Q4MwMiC106I9rfQJqFDu_IDgNN8NdA");
  const pipeline = newPipeline(credential, {
    ...pipelineOptions,
  });
  const blobPrimaryURL = `https://${accountName}${accountNameSuffix}.blob.core.windows.net/`;
  const client = new BlobServiceClient(blobPrimaryURL, pipeline);
  configureBlobStorageClient(recorder, client);
  return client;
}

export async function getStorageAccessTokenWithDefaultCredential(): Promise<AccessToken | null> {
  const credential = createTestCredential();
  return credential.getToken(["https://storage.azure.com/.default"]);
}

export function getBSU(
  recorder: Recorder,
  pipelineOptions: BlobClientOptions = {},
): BlobServiceClient {
  return getGenericBSU(recorder, "", undefined, pipelineOptions);
}

export function getAlternateBSU(recorder: Recorder): BlobServiceClient {
  return getGenericBSU(recorder, "SECONDARY_", "-secondary");
}

export function getImmutableContainerName(): string {
  const immutableContainerEnvVar = `IMMUTABLE_CONTAINER_NAME`;
  const immutableContainerName = env[immutableContainerEnvVar];

  if (!immutableContainerName) {
    throw new Error(`${immutableContainerEnvVar} environment variables not specified.`);
  }

  return immutableContainerName;
}

export function getConnectionStringFromEnvironment(): string {
  const connectionStringEnvVar = `STORAGE_CONNECTION_STRING`;
  const connectionString = env[connectionStringEnvVar];

  if (!connectionString) {
    throw new Error(`${connectionStringEnvVar} environment variables not specified.`);
  }

  return connectionString;
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
  length?: number,
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    response.readableStreamBody!.on("readable", () => {
      const chunk = response.readableStreamBody!.read(length);
      if (chunk) {
        resolve(chunk.toString());
      }
    });

    response.readableStreamBody!.on("error", reject);
    response.readableStreamBody!.on("end", () => {
      resolve("");
    });
  });
}

export async function readBuffer(
  response: {
    readableStreamBody?: NodeJS.ReadableStream;
    blobBody?: Promise<Blob>;
  },
  length?: number,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    response.readableStreamBody!.on("readable", () => {
      const chunk = response.readableStreamBody!.read(length);
      if (chunk) {
        resolve();
      }
    });

    response.readableStreamBody!.on("error", reject);
    response.readableStreamBody!.on("end", () => {
      resolve();
    });
  });
}

export async function createRandomLocalFile(
  folder: string,
  blockNumber: number,
  blockContent: Buffer,
): Promise<string>;
export async function createRandomLocalFile(
  folder: string,
  blockNumber: number,
  blockSize: number,
): Promise<string>;

// Total file size = (blockNumber -1)*blockSize + lastBlockSize
export async function createRandomLocalFile(
  folder: string,
  blockNumber: number,
  blockSize: number,
  lastBlockSize: number,
): Promise<string>;
export async function createRandomLocalFile(
  folder: string,
  blockNumber: number,
  blockSizeOrContent: number | Buffer,
  lastBlockSize: number = 0,
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const destFile = path.join(folder, getUniqueName("tempfile."));
    const ws = fs.createWriteStream(destFile);
    let offsetInMB = 0;

    function randomValueHex(blockIndex: number): string | Buffer<ArrayBufferLike> {
      if (typeof blockSizeOrContent !== "number") {
        return blockSizeOrContent;
      }

      let len = blockSizeOrContent;
      if (blockIndex === blockNumber && lastBlockSize !== 0) {
        len = lastBlockSize;
      }

      return randomBytes(Math.ceil(len / 2))
        .toString("hex") // convert to hexadecimal format
        .slice(0, len); // return required number of characters
    }

    ws.on("open", () => {
      while (offsetInMB++ < blockNumber && ws.write(randomValueHex(offsetInMB))) {
        /* empty */
      }
      if (offsetInMB >= blockNumber) {
        ws.end();
      }
    });

    ws.on("drain", () => {
      while (offsetInMB++ < blockNumber && ws.write(randomValueHex(offsetInMB))) {
        /* empty */
      }
      if (offsetInMB >= blockNumber) {
        ws.end();
      }
    });
    ws.on("finish", () => resolve(destFile));
    ws.on("error", reject);
  });
}

export async function createRandomLocalFileWithTotalSize(
  folder: string,
  totalSize: number,
  blockSize?: number,
): Promise<string> {
  if (blockSize === undefined || isNaN(blockSize) || blockSize <= 0) {
    blockSize = 1024 * 1024;
  }
  const blockNumber = Math.ceil(totalSize / blockSize);
  const lastBlockSize = totalSize - (blockNumber - 1) * blockSize;
  return createRandomLocalFile(folder, blockNumber, blockSize, lastBlockSize);
}

export function getSASConnectionStringFromEnvironment(recorder: Recorder): string {
  const now = new Date(recorder.variable("now", new Date().toISOString()));
  now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

  const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
  tmr.setDate(tmr.getDate() + 1);
  const queueServiceClient = getBSU(recorder);

  const sharedKeyCredential = queueServiceClient.credential;

  const sas = generateAccountSASQueryParameters(
    {
      expiresOn: tmr,
      // ipRange: {
      //   start: "0000:0000:0000:0000:0000:000:000:0000",
      //   end: "ffff:ffff:ffff:ffff:ffff:fff:fff:ffff",
      // },
      permissions: AccountSASPermissions.parse("rwdlacupi"),
      protocol: SASProtocol.HttpsAndHttp,
      resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
      services: AccountSASServices.parse("btqf").toString(),
      startsOn: now,
      version: "2020-08-04",
    },
    sharedKeyCredential as StorageSharedKeyCredential,
  ).toString();

  const blobEndpoint = extractConnectionStringParts(getConnectionStringFromEnvironment()).url;

  return `BlobEndpoint=${blobEndpoint}/;QueueEndpoint=${blobEndpoint.replace(
    ".blob.",
    ".queue.",
  )}/;FileEndpoint=${blobEndpoint.replace(
    ".queue.",
    ".file.",
  )}/;TableEndpoint=${blobEndpoint.replace(".queue.", ".table.")}/;SharedAccessSignature=${sas}`;
}

export function getSignatureFromSasUrl(sasUrl: string): string {
  const url = new URL(sasUrl);
  const signature = url.searchParams.get("sig");
  return signature!;
}

// Mock a Browser file with specified name and size
export function getBrowserFile(name: string, size: number): File {
  const uint8Arr = new Uint8Array(size);
  for (let j = 0; j < size; j++) {
    uint8Arr[j] = Math.floor(Math.random() * 256);
  }

  return new File([uint8Arr], name);
}

export function arrayBufferEqual(buf1: ArrayBuffer, buf2: ArrayBuffer): boolean {
  if (buf1.byteLength !== buf2.byteLength) {
    return false;
  }

  const uint8Arr1 = new Uint8Array(buf1);
  const uint8Arr2 = new Uint8Array(buf2);

  for (let i = 0; i < uint8Arr1.length; i++) {
    if (uint8Arr1[i] !== uint8Arr2[i]) {
      return false;
    }
  }

  return true;
}
