// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";
import { IncomingMessage, request, RequestOptions } from "http";

export async function startProxyTool(mode: string | undefined) {
  const outFileName = "test-proxy-output.log";
  const out = fs.openSync(`./${outFileName}`, "a");
  const err = fs.openSync(`./${outFileName}`, "a");

  console.log(`===TEST_MODE="${mode}"===`);
  console.log(
    `Attempting to start test proxy at http://localhost:5000 & https://localhost:5001.\n`
  );

  const command = await getDockerRunCommand();

  !(os.platform() === "win32") &&
    console.log(`Check the output file ${outFileName} for test-proxy logs.`); // Opens a cmd prompt for windows instead

  // const subprocess =
  spawn(command, [], {
    shell: true,
    // detached: true,
    stdio: ["ignore", out, err]
  });
  // subprocess.unref();
}

function getRootLocation() {
  let currentPath = process.cwd(); // Gives the current working directory
  if (fs.existsSync(path.join(currentPath, "package.json"))) {
    // <root>/sdk/service/project/package.json
    const expectedRootPath = path.join(currentPath, "..", "..", ".."); // <root>/
    if (
      fs.existsSync(path.join(expectedRootPath, "sdk/")) && // <root>/sdk
      fs.existsSync(path.join(expectedRootPath, "rush.json")) // <root>/rush.json
    ) {
      // reached root path
      return expectedRootPath;
    } else {
      throw new Error("rootPath could not be calculated properly from process.cwd()");
    }
  } else {
    throw new Error(`Expected 'package.json' to be found at ${currentPath}`);
  }
}

async function getDockerRunCommand() {
  const repoRoot = getRootLocation(); // /workspaces/azure-sdk-for-js/
  const testProxyRecordingsLocation = "/etc/testproxy";
  const allowLocalhostAccess = "--add-host host.docker.internal:host-gateway";
  const imageToLoad = `azsdkengsys.azurecr.io/engsys/testproxy-lin:${await getImageTag()}`;
  return `docker run -v ${repoRoot}:${testProxyRecordingsLocation} -p 5001:5001 -p 5000:5000 ${allowLocalhostAccess} ${imageToLoad}`;
}

export async function isProxyToolActive() {
  await makeRequest("http://localhost:5000/info/available", {});
  console.log(`Proxy tool seems to be active at http://localhost:5000\n`);
}

async function makeRequest(uri: string, requestOptions: RequestOptions): Promise<IncomingMessage> {
  return new Promise<IncomingMessage>((resolve, reject) => {
    let req = request(uri, requestOptions, resolve);
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
    const contentInPWSHScript = await fs.promises.readFile(
      `${path.join(getRootLocation(), "eng/common/testproxy/docker-start-proxy.ps1")}`,
      "utf-8"
    );
    const tag = contentInPWSHScript.match(/\$SELECTED_IMAGE_TAG \= \"(.*)\"/)![1];
    console.log(`Image tag obtained from the powershell script => ${tag}\n`);
    return tag;
  } catch (_) {
    console.log(
      `Unable to get the image tag from the powershell script, trying "latest" tag instead\n`
    );
    return "latest";
  }
}
