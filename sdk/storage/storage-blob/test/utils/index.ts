// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { randomBytes } from "crypto";
import * as fs from "fs";
import * as path from "path";
import { config } from "dotenv";

import { SimpleTokenCredential } from "./testutils.common";
import { createTestCredential } from "@azure-tools/test-credential";
import { StoragePipelineOptions, StorageSharedKeyCredential } from "../../src";
import { BlobServiceClient } from "../../src";
import { getUniqueName, configureBlobStorageClient } from "./testutils.common";
import { newPipeline } from "../../src";
import {
  generateAccountSASQueryParameters,
  AccountSASPermissions,
  SASProtocol,
  AccountSASResourceTypes,
  AccountSASServices,
} from "../../src";
import { extractConnectionStringParts } from "../../src/utils/utils.common";
import { AccessToken, TokenCredential } from "@azure/core-auth";
import { env, Recorder } from "@azure-tools/test-recorder";

export * from "./testutils.common";
config();

export function getGenericCredential(accountType: string): StorageSharedKeyCredential {
  const accountNameEnvVar = `${accountType}ACCOUNT_NAME`;
  const accountKeyEnvVar = `${accountType}ACCOUNT_KEY`;

  const accountName = env[accountNameEnvVar];
  const accountKey = env[accountKeyEnvVar];

  if (!accountName || !accountKey || accountName === "" || accountKey === "") {
    throw new Error(
      `${accountNameEnvVar} and/or ${accountKeyEnvVar} environment variables not specified.`
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
  pipelineOptions: StoragePipelineOptions = {}
): BlobServiceClient {
  if (
    env.STORAGE_CONNECTION_STRING &&
    env.STORAGE_CONNECTION_STRING.startsWith("UseDevelopmentStorage=true")
  ) {
    return BlobServiceClient.fromConnectionString(getConnectionStringFromEnvironment());
  } else {
    const credential = getGenericCredential(accountType) as StorageSharedKeyCredential;

    const pipeline = newPipeline(credential, pipelineOptions);
    const blobPrimaryURL = `https://${credential.accountName}${accountNameSuffix}.blob.core.windows.net/`;
    const client = new BlobServiceClient(blobPrimaryURL, pipeline);
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

export function getTokenBSUWithDefaultCredential(
  recorder: Recorder,
  pipelineOptions: StoragePipelineOptions = {},
  accountType: string = "",
  accountNameSuffix: string = ""
): BlobServiceClient {
  const accountNameEnvVar = `${accountType}ACCOUNT_NAME`;
  const accountName = env[accountNameEnvVar];
  if (!accountName || accountName === "") {
    throw new Error(`${accountNameEnvVar} environment variables not specified.`);
  }

  const credential = createTestCredential();
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
  pipelineOptions: StoragePipelineOptions = {}
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
  length?: number
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

export async function createRandomLocalFile(
  folder: string,
  blockNumber: number,
  blockContent: Buffer
): Promise<string>;
export async function createRandomLocalFile(
  folder: string,
  blockNumber: number,
  blockSize: number
): Promise<string>;

// Total file size = (blockNumber -1)*blockSize + lastBlockSize
export async function createRandomLocalFile(
  folder: string,
  blockNumber: number,
  blockSize: number,
  lastBlockSize: number
): Promise<string>;
export async function createRandomLocalFile(
  folder: string,
  blockNumber: number,
  blockSizeOrContent: number | Buffer,
  lastBlockSize: number = 0
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const destFile = path.join(folder, getUniqueName("tempfile."));
    const ws = fs.createWriteStream(destFile);
    let offsetInMB = 0;

    function randomValueHex(blockIndex: number) {
      if (blockSizeOrContent instanceof Buffer) {
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
  blockSize?: number
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
      ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
      permissions: AccountSASPermissions.parse("rwdlacupi"),
      protocol: SASProtocol.HttpsAndHttp,
      resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
      services: AccountSASServices.parse("btqf").toString(),
      startsOn: now,
      version: "2020-08-04",
    },
    sharedKeyCredential as StorageSharedKeyCredential
  ).toString();

  const blobEndpoint = extractConnectionStringParts(getConnectionStringFromEnvironment()).url;

  return `BlobEndpoint=${blobEndpoint}/;QueueEndpoint=${blobEndpoint.replace(
    ".blob.",
    ".queue."
  )}/;FileEndpoint=${blobEndpoint.replace(
    ".queue.",
    ".file."
  )}/;TableEndpoint=${blobEndpoint.replace(".queue.", ".table.")}/;SharedAccessSignature=${sas}`;
}
