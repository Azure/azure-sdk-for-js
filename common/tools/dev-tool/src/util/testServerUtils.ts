// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { spawn } from "child_process";
import { IncomingMessage, request, RequestOptions } from "http";
import fs from "fs-extra";
import { createPrinter } from "./printer";

const log = createPrinter("test-proxy");
export async function startTestServer(): Promise<void> {
  const log = createPrinter("test-server");
  log.info(`Attempting to start Autorest test server at http://localhost:3000`);

  const subprocess = spawn(await getTestServerRunCommand(), [], {
    shell: true,
  });

  const outFileName = "test-server-output.log";
  const out = fs.createWriteStream(`./${outFileName}`, { flags: "a" });
  subprocess.stdout.pipe(out);
  subprocess.stderr.pipe(out);

  log.info(`Check the output file "${outFileName}" for test-proxy logs.`);
}

async function getTestServerRunCommand() {
  return `node ./node_modules/@microsoft.azure/autorest.testserver/dist/cli/cli.js`;
}

export async function isTestServerActive(): Promise<boolean> {
  try {
    await makeRequest("http://localhost:3000/string/empty", {});
    log.info(`Test Server seems to be active at http://localhost:3000\n`);
    return true;
  } catch (error) {
    return false;
  }
}

async function makeRequest(uri: string, requestOptions: RequestOptions): Promise<IncomingMessage> {
  return new Promise<IncomingMessage>((resolve, reject) => {
    const req = request(uri, requestOptions, resolve);
    req.once("error", reject);
    req.end();
  });
}
