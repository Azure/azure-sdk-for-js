import { TokenCredential } from "@azure/core-http";
import { env } from "@azure/test-utils-recorder";
import { randomBytes } from "crypto";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { DefaultAzureCredential } from "@azure/identity";

import { StorageSharedKeyCredential } from "../../src/credentials/StorageSharedKeyCredential";
import { DataLakeServiceClient } from "../../src/DataLakeServiceClient";
import { newPipeline, StoragePipelineOptions } from "../../src/Pipeline";
import { getUniqueName, SimpleTokenCredential } from "./testutils.common";

dotenv.config();

export * from "./testutils.common";

export function getGenericCredential(accountType: string): StorageSharedKeyCredential {
  const accountNameEnvVar = `${accountType}ACCOUNT_NAME`;
  const accountKeyEnvVar = `${accountType}ACCOUNT_KEY`;

  let accountName: string | undefined;
  let accountKey: string | undefined;

  accountName = process.env[accountNameEnvVar];
  accountKey = process.env[accountKeyEnvVar];

  if (!accountName || !accountKey || accountName === "" || accountKey === "") {
    throw new Error(
      `${accountNameEnvVar} and/or ${accountKeyEnvVar} environment variables not specified.`
    );
  }

  return new StorageSharedKeyCredential(accountName, accountKey);
}

export function getTokenCredential(): TokenCredential {
  const accountTokenEnvVar = `DFS_ACCOUNT_TOKEN`;
  let accountToken: string | undefined;

  accountToken = process.env[accountTokenEnvVar];

  if (!accountToken || accountToken === "") {
    throw new Error(`${accountTokenEnvVar} environment variables not specified.`);
  }

  return new SimpleTokenCredential(accountToken);
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
      ...pipelineOptions
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

  let accountName: string | undefined;
  accountName = process.env[accountNameEnvVar];
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
  let accountName = process.env[accountNameEnvVar];
  if (!accountName || accountName === "") {
    throw new Error(`${accountNameEnvVar} environment variables not specified.`);
  }

  const credential = new DefaultAzureCredential();
  const pipeline = newPipeline(credential, {
    ...pipelineOptions
  });
  const dfsPrimaryURL = `https://${accountName}${accountNameSuffix}.dfs.core.windows.net/`;
  return new DataLakeServiceClient(dfsPrimaryURL, pipeline);
}

export function getAlternateDataLakeServiceClient(): DataLakeServiceClient {
  return getGenericDataLakeServiceClient("SECONDARY_", "-secondary");
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
    contentAsBlob?: Promise<Blob>;
  },
  length?: number
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    response.readableStreamBody!.on("readable", () => {
      let chunk;
      chunk = response.readableStreamBody!.read(length);
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
      // tslint:disable-next-line:no-empty
      while (offsetInMB++ < blockNumber && ws.write(randomValueHex())) {}
      if (offsetInMB >= blockNumber) {
        ws.end();
      }
    });

    ws.on("drain", () => {
      // tslint:disable-next-line:no-empty
      while (offsetInMB++ < blockNumber && ws.write(randomValueHex())) {}
      if (offsetInMB >= blockNumber) {
        ws.end();
      }
    });
    ws.on("finish", () => resolve(destFile));
    ws.on("error", reject);
  });
}
