// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { spawn } from "child_process";
import path from "path";
import { IncomingMessage, request, RequestOptions } from "http";
import fs from "fs-extra";
import { createPrinter } from "./printer";

const log = createPrinter("test-proxy");
export async function startProxyTool(): Promise<void> {
  log.info(
    `Attempting to start test proxy at http://localhost:5000 & https://localhost:5001.\n`
  );

  const subprocess = spawn(await getDockerRunCommand(), [], {
    shell: true
  });

  const outFileName = "test-proxy-output.log";
  const out = fs.createWriteStream(`./${outFileName}`, { flags: 'a' });
  subprocess.stdout.pipe(out);
  subprocess.stderr.pipe(out);

  log.info(`Check the output file "${outFileName}" for test-proxy logs.`);
}

async function getRootLocation(start?: string): Promise<string> {
  start ??= process.cwd();
  if (await fs.pathExists(path.join(start, "rush.json"))) {
    return start;
  } else {
    const nextPath = path.resolve(start, "..");
    if (nextPath === start) {
      throw new Error("Reached filesystem root, but no rush.json was found.");
    } else {
      return getRootLocation(nextPath);
    }
  }
}

async function getDockerRunCommand() {
  const repoRoot = await getRootLocation(); // /workspaces/azure-sdk-for-js/
  const testProxyRecordingsLocation = "/srv/testproxy";
  const allowLocalhostAccess = "--add-host host.docker.internal:host-gateway";
  const imageToLoad = `azsdkengsys.azurecr.io/engsys/testproxy-lin:${await getImageTag()}`;
  return `docker run -v ${repoRoot}:${testProxyRecordingsLocation} -p 5001:5001 -p 5000:5000 ${allowLocalhostAccess} ${imageToLoad}`;
}

export async function isProxyToolActive(): Promise<boolean> {
  try {
    await makeRequest("http://localhost:5000/info/available", {});
    log.info(`Proxy tool seems to be active at http://localhost:5000\n`);
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

async function getImageTag() {
  // Grab the tag from the `/eng/common/testproxy/docker-start-proxy.ps1` file [..is used to run the proxy-tool in the CI]
  //
  // $SELECTED_IMAGE_TAG = "1147815";
  // (Bot regularly updates the tag in the file above.)
  try {
    const contentInPWSHScript = await fs.readFile(
      `${path.join(await getRootLocation(), "eng/common/testproxy/docker-start-proxy.ps1")}`,
      "utf-8"
    );

    const tag = contentInPWSHScript.match(/\$SELECTED_IMAGE_TAG = "(.*)"/)?.[1];
    if (tag === undefined) {
      throw new Error();
    }

    log.info(`Image tag obtained from the powershell script => ${tag}\n`);
    return tag;
  } catch (_) {
    log.warn(
      `Unable to get the image tag from the powershell script, trying "latest" tag instead\n`
    );
    return "latest";
  }
}
