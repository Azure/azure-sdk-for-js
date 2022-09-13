// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-http";
import { env } from "@azure-tools/test-recorder";
import { randomBytes } from "crypto";
import * as fs from "fs";
import * as path from "path";
import { DefaultAzureCredential } from "@azure/identity";

import { StorageSharedKeyCredential } from "../../src/credentials/StorageSharedKeyCredential";
import { DataLakeServiceClient } from "../../src/DataLakeServiceClient";
import { newPipeline, StoragePipelineOptions } from "../../src/Pipeline";
import { getUniqueName, SimpleTokenCredential } from "./testutils.common";
import {
  AccountSASPermissions,
  AccountSASResourceTypes,
  AccountSASServices,
  DataLakeFileSystemClient,
  DataLakeSASSignatureValues,
  generateAccountSASQueryParameters,
  generateDataLakeSASQueryParameters,
} from "../../src";
import { extractConnectionStringParts } from "../../src/utils/utils.common";

export * from "./testutils.common";

export function getGenericCredential(accountType: string): StorageSharedKeyCredential {
  const accountNameEnvVar = `${accountType}ACCOUNT_NAME`;
  const accountKeyEnvVar = `${accountType}ACCOUNT_KEY`;

  const accountName = process.env[accountNameEnvVar];
  const accountKey = process.env[accountKeyEnvVar];

  if (!accountName || !accountKey || accountName === "" || accountKey === "") {
    throw new Error(
      `${accountNameEnvVar} and/or ${accountKeyEnvVar} environment variables not specified.`
    );
  }

  return new StorageSharedKeyCredential(accountName, accountKey);
}

export function getTokenCredential(): TokenCredential {
  const accountTokenEnvVar = `DFS_ACCOUNT_TOKEN`;
  const accountToken = process.env[accountTokenEnvVar];

  if (!accountToken || accountToken === "") {
    throw new Error(`${accountTokenEnvVar} environment variables not specified.`);
  }

  return new SimpleTokenCredential(accountToken);
}

/**
 * Return a sasToken that can be used for testing
 */
export function getSASToken(accountType: string, sasValues: DataLakeSASSignatureValues): string {
  const accountNameEnvVar = `${accountType}ACCOUNT_NAME`;
  const accountKeyEnvVar = `${accountType}ACCOUNT_KEY`;
  const accountName = process.env[accountNameEnvVar];
  const accountKey = process.env[accountKeyEnvVar];

  if (!accountName || !accountKey || accountName === "" || accountKey === "") {
    throw new Error(
      `${accountNameEnvVar} and/or ${accountKeyEnvVar} environment variables not specified.`
    );
  }

  const sasParameters = generateDataLakeSASQueryParameters(
    sasValues,
    new StorageSharedKeyCredential(accountName, accountKey)
  );
  return sasParameters.toString();
}

export function getSASFileSystemClient(
  accountType: string,
  sasValues: DataLakeSASSignatureValues,
  accountNameSuffix: string = "",
  pipelineOptions: StoragePipelineOptions = {}
): DataLakeFileSystemClient {
  const credential = getGenericCredential(accountType) as StorageSharedKeyCredential;
  const sasToken = getSASToken(accountType, sasValues);
  const pipeline = newPipeline(undefined, { ...pipelineOptions });
  const dfsPrimaryURL = `https://${credential.accountName}${accountNameSuffix}.dfs.core.windows.net/${sasValues.fileSystemName}/?${sasToken}`;
  return new DataLakeFileSystemClient(dfsPrimaryURL, pipeline);
}

export function getGenericDataLakeServiceClient(
  accountType: string,
  accountNameSuffix: string = "",
  pipelineOptions: StoragePipelineOptions = {}
): DataLakeServiceClient {
  if (
    env.STORAGE_CONNECTION_STRING &&
    env.STORAGE_CONNECTION_STRING.startsWith("UseDevelopmentStorage=true")
  ) {
    throw Error(
      `getGenericDataLakeServiceClient() doesn't support creating DataLakeServiceClient from connection string.`
    );
  } else {
    const credential = getGenericCredential(accountType) as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential, {
      ...pipelineOptions,
      // Enable logger when debugging
      // logger: new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO)
      // proxyOptions: {
      //   host: "127.0.0.1",
      //   port: 8888
      // }
    });
    const dfsPrimaryURL = `https://${credential.accountName}${accountNameSuffix}.dfs.core.windows.net/`;
    return new DataLakeServiceClient(dfsPrimaryURL, pipeline);
  }
}

export function getTokenDataLakeServiceClient(): DataLakeServiceClient {
  const accountNameEnvVar = `DFS_ACCOUNT_NAME`;

  const accountName = process.env[accountNameEnvVar];
  if (!accountName || accountName === "") {
    throw new Error(`${accountNameEnvVar} environment variables not specified.`);
  }

  const credential = getTokenCredential();
  const pipeline = newPipeline(credential, {
    // Enable logger when debugging
    // logger: new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO)
  });
  const dfsPrimaryURL = `https://${accountName}.dfs.core.windows.net/`;
  return new DataLakeServiceClient(dfsPrimaryURL, pipeline);
}

export function getDataLakeServiceClient(
  pipelineOptions: StoragePipelineOptions = {}
): DataLakeServiceClient {
  return getGenericDataLakeServiceClient("DFS_", undefined, pipelineOptions);
}

export function getDataLakeServiceClientWithDefaultCredential(
  accountType: string = "DFS_",
  pipelineOptions: StoragePipelineOptions = {},
  accountNameSuffix: string = ""
): DataLakeServiceClient {
  const accountNameEnvVar = `${accountType}ACCOUNT_NAME`;
  const accountName = process.env[accountNameEnvVar];
  if (!accountName || accountName === "") {
    throw new Error(`${accountNameEnvVar} environment variables not specified.`);
  }

  const credential = new DefaultAzureCredential();
  const pipeline = newPipeline(credential, {
    ...pipelineOptions,
  });
  const dfsPrimaryURL = `https://${accountName}${accountNameSuffix}.dfs.core.windows.net/`;
  return new DataLakeServiceClient(dfsPrimaryURL, pipeline);
}

export function getDataLakeFileSystemClientWithSASCredential(
  sasValues: DataLakeSASSignatureValues,
  accountType: string = "DFS_",
  accountNameSuffix: string = "",
  pipelineOptions: StoragePipelineOptions = {}
): DataLakeFileSystemClient {
  return getSASFileSystemClient(accountType, sasValues, accountNameSuffix, pipelineOptions);
}

export function getAlternateDataLakeServiceClient(): DataLakeServiceClient {
  return getGenericDataLakeServiceClient("SECONDARY_", "-secondary");
}

export function getEncryptionScope(): string {
  const encryptionScopeEnvVar = "ENCRYPTION_SCOPE";
  const encryptionScope = process.env[encryptionScopeEnvVar];

  if (!encryptionScope) {
    throw new Error(`${encryptionScopeEnvVar}  environment variables not specified.`);
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
  blockSize: number
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

export function getConnectionStringFromEnvironment(accountType: string = "DFS_"): string {
  const connectionStringEnvVar = `${accountType}STORAGE_CONNECTION_STRING`;
  const connectionString = process.env[connectionStringEnvVar];

  if (!connectionString) {
    throw new Error(`${connectionStringEnvVar} environment variables not specified.`);
  }

  return connectionString;
}

export function getSASConnectionStringFromEnvironment(): string {
  const now = new Date();
  now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

  const tmr = new Date();
  tmr.setDate(tmr.getDate() + 1);

  const sharedKeyCredential = getGenericCredential("DFS_");

  const sas = generateAccountSASQueryParameters(
    {
      expiresOn: tmr,
      permissions: AccountSASPermissions.parse("rwdlacup"),
      resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
      services: AccountSASServices.parse("btqf").toString(),
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
