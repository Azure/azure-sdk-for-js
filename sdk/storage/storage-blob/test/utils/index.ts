import { randomBytes } from "crypto";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

import { SimpleTokenCredential } from "./testutils.common";
import { StorageSharedKeyCredential } from "../../src";
import { BlobServiceClient } from "../../src";
import { getUniqueName } from "./testutils.common";
import { newPipeline } from "../../src";
import {
  generateAccountSASQueryParameters,
  AccountSASPermissions,
  SASProtocol,
  AccountSASResourceTypes,
  AccountSASServices
} from "../../src";
import { extractConnectionStringParts } from "../../src/utils/utils.common";
import { TokenCredential } from "@azure/core-http";
import { env } from "@azure/test-utils-recorder";

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

export function getGenericBSU(
  accountType: string,
  accountNameSuffix: string = ""
): BlobServiceClient {
  if (
    env.STORAGE_CONNECTION_STRING &&
    env.STORAGE_CONNECTION_STRING.startsWith("UseDevelopmentStorage=true")
  ) {
    return BlobServiceClient.fromConnectionString(getConnectionStringFromEnvironment());
  } else {
    const credential = getGenericCredential(accountType) as StorageSharedKeyCredential;

    const pipeline = newPipeline(credential, {
      // Enable logger when debugging
      // logger: new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO)
    });
    const blobPrimaryURL = `https://${credential.accountName}${accountNameSuffix}.blob.core.windows.net/`;
    return new BlobServiceClient(blobPrimaryURL, pipeline);
  }
}

export function getTokenCredential(): TokenCredential {
  const accountTokenEnvVar = `ACCOUNT_TOKEN`;
  let accountToken: string | undefined;

  accountToken = process.env[accountTokenEnvVar];

  if (!accountToken || accountToken === "") {
    throw new Error(`${accountTokenEnvVar} environment variables not specified.`);
  }

  return new SimpleTokenCredential(accountToken);
}

export function getTokenBSU(): BlobServiceClient {
  const accountNameEnvVar = `ACCOUNT_NAME`;

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
  const blobPrimaryURL = `https://${accountName}.blob.core.windows.net/`;
  return new BlobServiceClient(blobPrimaryURL, pipeline);
}

export function getBSU(): BlobServiceClient {
  return getGenericBSU("");
}

export function getAlternateBSU(): BlobServiceClient {
  return getGenericBSU("SECONDARY_", "-secondary");
}

export function getConnectionStringFromEnvironment(): string {
  const connectionStringEnvVar = `STORAGE_CONNECTION_STRING`;
  const connectionString = process.env[connectionStringEnvVar];

  if (!connectionString) {
    throw new Error(`${connectionStringEnvVar} environment variables not specified.`);
  }

  return connectionString;
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
  blockContent: Buffer
): Promise<string>;
export async function createRandomLocalFile(
  folder: string,
  blockNumber: number,
  blockSize: number
): Promise<string>;
export async function createRandomLocalFile(
  folder: string,
  blockNumber: number,
  blockSizeOrContent: number | Buffer
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const destFile = path.join(folder, getUniqueName("tempfile."));
    const ws = fs.createWriteStream(destFile);
    let offsetInMB = 0;

    function randomValueHex() {
      if (blockSizeOrContent instanceof Buffer) {
        return blockSizeOrContent;
      }

      const len = blockSizeOrContent;

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

export function getSASConnectionStringFromEnvironment(): string {
  const now = new Date();
  now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server

  const tmr = new Date();
  tmr.setDate(tmr.getDate() + 1);
  const queueServiceClient = getBSU();
  // By default, credential is always the last element of pipeline factories
  const factories = (queueServiceClient as any).pipeline.factories;
  const sharedKeyCredential = factories[factories.length - 1];

  const sas = generateAccountSASQueryParameters(
    {
      expiresOn: tmr,
      ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
      permissions: AccountSASPermissions.parse("rwdlacup"),
      protocol: SASProtocol.HttpsAndHttp,
      resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
      services: AccountSASServices.parse("btqf").toString(),
      startsOn: now,
      version: "2016-05-31"
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
