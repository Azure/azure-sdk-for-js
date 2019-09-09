import * as crypto from "crypto";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

import { TokenCredential, Credential } from "../../src";
import { SharedKeyCredential } from "../../src/credentials/SharedKeyCredential";
import { ServiceURL } from "../../src/ServiceURL";
import { StorageURL } from "../../src/StorageURL";
import { getUniqueName } from "./testutils.common";

dotenv.config({ path: "../.env" });

export * from "./testutils.common";

export function getGenericCredential(accountType: string): Credential {
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

  return new SharedKeyCredential(accountName, accountKey);
}

export function getGenericBSU(accountType: string, accountNameSuffix: string = ""): ServiceURL {
  const credential = getGenericCredential(accountType) as SharedKeyCredential;

  const pipeline = StorageURL.newPipeline(credential, {
    // Enable logger when debugging
    // logger: new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO)
  });
  const blobPrimaryURL = `https://${credential.accountName}${accountNameSuffix}.blob.core.windows.net/`;
  return new ServiceURL(blobPrimaryURL, pipeline);
}

export function getTokenCredential(): TokenCredential {
  const accountTokenEnvVar = `ACCOUNT_TOKEN`;
  let accountToken: string | undefined;

  accountToken = process.env[accountTokenEnvVar];

  if (!accountToken || accountToken === "") {
    throw new Error(
      `${accountTokenEnvVar} environment variables not specified.`
    );
  }

  return new TokenCredential(accountToken);
}

export function getTokenBSU(): ServiceURL {
  const accountNameEnvVar = `ACCOUNT_NAME`;

  let accountName: string | undefined;

  accountName = process.env[accountNameEnvVar];

  if (!accountName || accountName === "") {
    throw new Error(
      `${accountNameEnvVar} environment variables not specified.`
    );
  }

  const credential = getTokenCredential();
  const pipeline = StorageURL.newPipeline(credential, {
    // Enable logger when debugging
    // logger: new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO)
  });
  const blobPrimaryURL = `https://${accountName}.blob.core.windows.net/`;
  return new ServiceURL(blobPrimaryURL, pipeline);
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

// Returns a Promise which is completed after the file handle is closed.
// If Promise is rejected, the reason will be set to the first error raised by either the
// ReadableStream or the fs.WriteStream.
export async function readStreamToLocalFile(rs: NodeJS.ReadableStream, file: string) {
  return new Promise<void>((resolve, reject) => {
    const ws = fs.createWriteStream(file);

    // Set STREAM_DEBUG env var to log stream events while running tests
    if (process.env.STREAM_DEBUG) {
      rs.on("close", () => console.log("rs.close"));
      rs.on("data", () => console.log("rs.data"));
      rs.on("end", () => console.log("rs.end"));
      rs.on("error", () => console.log("rs.error"));

      ws.on("close", () => console.log("ws.close"));
      ws.on("drain", () => console.log("ws.drain"));
      ws.on("error", () => console.log("ws.error"));
      ws.on("finish", () => console.log("ws.finish"));
      ws.on("pipe", () => console.log("ws.pipe"));
      ws.on("unpipe", () => console.log("ws.unpipe"));
    }

    let error: Error;

    rs.on("error", (err: Error) => {
      // First error wins
      if (!error) {
        error = err;
      }

      // When rs.error is raised, rs.end will never be raised automatically, so it must be raised manually
      // to ensure ws.close is eventually raised.
      rs.emit("end");
    });

    ws.on("error", (err: Error) => {
      // First error wins
      if (!error) {
        error = err;
      }
    });

    ws.on("close", () => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });

    rs.pipe(ws);
  });
}
