import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";

import { SharedKeyCredential } from "../../src/credentials/SharedKeyCredential";
import { BlobServiceClient } from "../../src/BlobServiceClient";
import { getUniqueName } from "./testutils.common";
import * as dotenv from "dotenv";
import { newPipeline } from "../../src/Pipeline";
import {
  generateAccountSASQueryParameters,
  AccountSASPermissions,
  SASProtocol,
  AccountSASResourceTypes,
  AccountSASServices
} from "../../src";
import { extractConnectionStringParts } from "../../src/utils/utils.common";
dotenv.config({ path: "../.env" });

export * from "./testutils.common";

export function getGenericBSU(
  accountType: string,
  accountNameSuffix: string = ""
): BlobServiceClient {
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

  const credentials = new SharedKeyCredential(accountName, accountKey);
  const pipeline = newPipeline(credentials, {
    // Enable logger when debugging
    // logger: new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO)
  });
  const blobPrimaryURL = `https://${accountName}${accountNameSuffix}.blob.core.windows.net/`;
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
      return crypto
        .randomBytes(Math.ceil(len / 2))
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
      expiryTime: tmr,
      ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
      permissions: AccountSASPermissions.parse("rwdlacup").toString(),
      protocol: SASProtocol.HTTPSandHTTP,
      resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
      services: AccountSASServices.parse("btqf").toString(),
      startTime: now,
      version: "2016-05-31"
    },
    sharedKeyCredential as SharedKeyCredential
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
