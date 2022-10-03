// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { spawn } from "child_process";
import path from "path";
import { IncomingMessage, request, RequestOptions } from "http";
import fs from "fs-extra";
import os from "os";
import { createPrinter } from "./printer";
import { resolveRoot } from "./resolveProject";

const log = createPrinter("test-proxy");

const CONTAINER_NAME = "js-azsdk-test-proxy";

export async function startProxyTool(): Promise<void> {
  log.info(`Attempting to start test proxy at http://localhost:${process.env.TEST_PROXY_HTTP_PORT ?? 5000} & https://localhost:${process.env.TEST_PROXY_HTTPS_PORT ?? 5001}.\n`);

  const subprocess = spawn(await getDockerRunCommand(), [], {
    shell: true,
  });

  const outFileName = "test-proxy-output.log";
  const out = fs.createWriteStream(`./${outFileName}`, { flags: "a" });
  subprocess.stdout.pipe(out);
  subprocess.stderr.pipe(out);

  log.info(`Check the output file "${outFileName}" for test-proxy logs.`);

  await new Promise<void>((resolve, reject) => {
    subprocess.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        fs.readFile(`./${outFileName}`, (_err, data) => {
          const lines = data.toString().split(os.EOL);
          reject(
            new Error(
              `Could not start test proxy. Below is the last 10 lines of output. See ${outFileName} for the full output.\n${lines
                .slice(-10)
                .join("\n")}`
            )
          );
        });
      }
    });
  });
}

export async function stopProxyTool(): Promise<void> {
  log.info("Attempting to stop the test proxy if it is running");

  const stopProcess = spawn(`docker stop ${CONTAINER_NAME}`, [], { shell: true });
  return new Promise((resolve) => stopProcess.on("close", resolve));
}

async function getDockerRunCommand() {
  const repoRoot = await resolveRoot(); // /workspaces/azure-sdk-for-js/
  const testProxyRecordingsLocation = "/srv/testproxy";
  const allowLocalhostAccess = "--add-host host.docker.internal:host-gateway";
  const imageToLoad = `azsdkengsys.azurecr.io/engsys/testproxy-lin:${await getImageTag()}`;
  return `docker run --rm --name ${CONTAINER_NAME} -v ${repoRoot}:${testProxyRecordingsLocation} -p ${process.env.TEST_PROXY_HTTPS_PORT ?? 5001}:5001 -p ${process.env.TEST_PROXY_HTTP_PORT ?? 5000}:5000 ${allowLocalhostAccess} ${imageToLoad}`;
}

export async function isProxyToolActive(): Promise<boolean> {
  try {
    await makeRequest(`http://localhost:${process.env.TEST_PROXY_HTTP_PORT ?? 5000}/info/available`, {});
    log.info(`Proxy tool seems to be active at http://localhost:${process.env.TEST_PROXY_HTTP_PORT ?? 5000}\n`);
    return true;
  } catch (error: any) {
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

async function getImageTag() {
  // Grab the tag from the `/eng/common/testproxy/target_version.txt` file [..is used to control the default version]
  // Example content:
  //
  // 1.0.0-dev.20220224.2
  // (Bot regularly updates the tag in the file above.)
  try {
    const contentInVersionFile = await fs.readFile(
      `${path.join(await resolveRoot(), "eng/common/testproxy/target_version.txt")}`,
      "utf-8"
    );

    const tag = contentInVersionFile.trim();
    if (tag === undefined) {
      throw new Error();
    }

    log.info(`Image tag obtained from the powershell script => ${tag}\n`);
    return tag;
  } catch (_: any) {
    log.warn(
      `Unable to get the image tag from the powershell script, trying "latest" tag instead\n`
    );
    return "latest";
  }
}
