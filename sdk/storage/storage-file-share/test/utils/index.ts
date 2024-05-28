// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { randomBytes } from "crypto";
import * as fs from "fs";
import * as path from "path";
import { env, Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";

import { TokenCredential } from "@azure/core-auth";
import { BlobServiceClient } from "@azure/storage-blob";

import {
  AccountSASPermissions,
  AccountSASResourceTypes,
  AccountSASServices,
  generateAccountSASQueryParameters,
  SASProtocol,
  ShareClientConfig,
} from "../../src";
import { StorageSharedKeyCredential } from "../../../storage-blob/src/credentials/StorageSharedKeyCredential";
import { newPipeline } from "../../src/Pipeline";
import { ShareServiceClient } from "../../src/ShareServiceClient";
import { extractConnectionStringParts } from "../../src/utils/utils.common";
import { getUniqueName, configureStorageClient } from "./testutils.common";
import { StorageClient } from "../../src/StorageClient";

export * from "./testutils.common";

export function getGenericBSU(
  recorder: Recorder,
  accountType: string,
  accountNameSuffix: string = "",
  config?: ShareClientConfig,
): ShareServiceClient {
  const accountNameEnvVar = `${accountType}ACCOUNT_NAME`;
  const accountKeyEnvVar = `${accountType}ACCOUNT_KEY`;

  const accountName = env[accountNameEnvVar];
  const accountKey = env[accountKeyEnvVar];

  if (!accountName || !accountKey) {
    throw new Error(
      `${accountNameEnvVar} and/or ${accountKeyEnvVar} environment variables not specified.`,
    );
  }

  const credentials = new StorageSharedKeyCredential(accountName, accountKey);
  const pipeline = newPipeline(credentials);
  const filePrimaryURL = `https://${accountName}${accountNameSuffix}.file.core.windows.net/`;
  const client = new ShareServiceClient(filePrimaryURL, pipeline, config);
  configureStorageClient(recorder, client);
  return client;
}

export function getBlobServiceClient(recorder: Recorder): BlobServiceClient {
  const client = BlobServiceClient.fromConnectionString(getConnectionStringFromEnvironment());
  configureStorageClient(recorder, client as unknown as StorageClient);
  return client;
}

export function getTokenBSU(
  recorder: Recorder,
  accountType: string = "",
  accountNameSuffix: string = "",
  shareClientConfig?: ShareClientConfig,
): ShareServiceClient {
  const accountNameEnvVar = `${accountType}ACCOUNT_NAME`;

  const accountName = env[accountNameEnvVar];

  if (!accountName || accountName === "") {
    throw new Error(`${accountNameEnvVar} environment variables not specified.`);
  }

  const credential = getTokenCredential();
  const pipeline = newPipeline(credential);
  const blobPrimaryURL = `https://${accountName}${accountNameSuffix}.file.core.windows.net/`;
  const client = new ShareServiceClient(blobPrimaryURL, pipeline, shareClientConfig);
  configureStorageClient(recorder, client);
  return client;
}

export function getBSU(recorder: Recorder, config?: ShareClientConfig): ShareServiceClient {
  return getGenericBSU(recorder, "", "", config);
}

export function getAccountName(): string {
  const accountNameEnvVar = `ACCOUNT_NAME`;

  const accountName = process.env[accountNameEnvVar];

  if (!accountName || accountName === "") {
    throw new Error(`${accountNameEnvVar} environment variables not specified.`);
  }

  return accountName;
}

export function getAlternateBSU(recorder: Recorder): ShareServiceClient {
  return getGenericBSU(recorder, "SECONDARY_", "-secondary");
}

export function getSoftDeleteBSU(recorder: Recorder): ShareServiceClient {
  return getGenericBSU(recorder, "SOFT_DELETE_");
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

export async function createRandomLocalFile(
  folder: string,
  blockNumber: number,
  blockSize: number,
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const destFile = path.join(folder, getUniqueName("tempfile."));
    const ws = fs.createWriteStream(destFile);
    let offsetInMB = 0;

    function randomValueHex(len = blockSize) {
      return randomBytes(Math.ceil(len / 2))
        .toString("hex") // convert to hexadecimal format
        .slice(0, len); // return required number of characters
    }

    ws.on("open", () => {
      while (offsetInMB++ < blockNumber && ws.write(randomValueHex())) {
        /* empty */
      }
      if (offsetInMB >= blockNumber) {
        ws.end();
      }
    });

    ws.on("drain", () => {
      while (offsetInMB++ < blockNumber && ws.write(randomValueHex())) {
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

export function getSASConnectionStringFromEnvironment(recorder: Recorder): string {
  const now = new Date();
  now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

  const tmr = new Date();
  tmr.setDate(tmr.getDate() + 1);
  const queueServiceClient = getBSU(recorder);
  const sharedKeyCredential = queueServiceClient["credential"];

  const sas = generateAccountSASQueryParameters(
    {
      expiresOn: tmr,
      ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
      permissions: AccountSASPermissions.parse("rwdlacup"),
      protocol: SASProtocol.HttpsAndHttp,
      resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
      services: AccountSASServices.parse("btqf").toString(),
      startsOn: now,
      version: "2016-05-31",
    },
    sharedKeyCredential as StorageSharedKeyCredential,
  ).toString();

  const fileEndpoint = extractConnectionStringParts(getConnectionStringFromEnvironment()).url;

  return `BlobEndpoint=${fileEndpoint.replace(
    ".file.",
    ".blob.",
  )}/;QueueEndpoint=${fileEndpoint.replace(
    ".file.",
    ".queue.",
  )}/;FileEndpoint=${fileEndpoint}/;TableEndpoint=${fileEndpoint.replace(
    ".file.",
    ".table.",
  )}/;SharedAccessSignature=${sas}`;
}

// A helper method used to read a Node.js readable stream into a Buffer
async function streamToBuffer(readableStream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    readableStream.on("data", (data: Buffer | string) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

export function getTokenCredential(): TokenCredential {
  return createTestCredential();
}

/**
 * Compare the content of body from downloading operation methods with a Uint8Array.
 * Works in both Node.js and browsers.
 *
 * @param response - Convenience layer methods response with downloaded body
 */
export async function compareBodyWithUint8Array(
  response: {
    readableStreamBody?: NodeJS.ReadableStream;
    blobBody?: Promise<Blob>;
  },
  uint8arry: Uint8Array,
): Promise<boolean> {
  const buf = await streamToBuffer(response.readableStreamBody!);
  return buf.equals(Buffer.from(uint8arry.buffer, uint8arry.byteOffset, uint8arry.byteLength));
}
