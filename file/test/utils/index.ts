import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";

import { SharedKeyCredential } from "../../lib/credentials/SharedKeyCredential";
import { ServiceURL } from "../../lib/ServiceURL";
import { StorageURL } from "../../lib/StorageURL";
import { getUniqueName } from "./testutils.common";

export * from "./testutils.common";

export function getGenericBSU(
  accountType: string,
  accountNameSuffix: string = ""
): ServiceURL {
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
  const pipeline = StorageURL.newPipeline(credentials, {
    // Enable logger when debugging
    // logger: new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO)
  });
  const filePrimaryURL = `https://${accountName}${accountNameSuffix}.file.core.windows.net/`;
  return new ServiceURL(filePrimaryURL, pipeline);
}

export function getBSU(): ServiceURL {
  return getGenericBSU("");
}

export function getAlternateBSU(): ServiceURL {
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

export async function readStreamToLocalFile(
  rs: NodeJS.ReadableStream,
  file: string
) {
  return new Promise<void>((resolve, reject) => {
    const ws = fs.createWriteStream(file);
    rs.pipe(ws);
    rs.on("error", reject);
    ws.on("error", reject);
    ws.on("finish", resolve);
    rs.on("end", resolve);
  });
}
