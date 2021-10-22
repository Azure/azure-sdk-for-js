// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { spawn } from "child_process";
import fs from "fs";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";
import path from "path";

const log = createPrinter("info");

export const commandInfo = makeCommandInfo(
  "test-proxy",
  "runs the proxy-tool with the `docker run ...` command",
  {
    // "log-in-file": {
    //   kind: "boolean",
    //   description:
    //     "Boolean to indicate whether to save the the stdout and sterr for npm commands to the log.txt log file",
    //   default: true
    // }
  }
);

export default leafCommand(commandInfo, async (_options) => {
  const outFileName = "test-proxy-output.log";
  const out = fs.openSync(`./${outFileName}`, "a");
  const err = fs.openSync(`./${outFileName}`, "a");
  log.info(`Attempting to start test proxy at http://localhost:5000 & https://localhost:5001. 
  
            Check the output file ${outFileName} for test-proxy logs.
  `);
  const subprocess = spawn(getDockerRunCommand(), [], {
    shell: true,
    detached: true,
    stdio: ["ignore", out, err]
  });
  subprocess.unref();
  log.info("Test proxy is running at http://localhost:5000 & https://localhost:5001");
  return true;
});

function getRootLocation() {
  let currentPath = process.cwd(); // Gives the current working directory
  log.info(currentPath);
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

function getDockerRunCommand() {
  const repoRoot = getRootLocation(); // /workspaces/azure-sdk-for-js/``
  const testProxyRecordingsLocation = "/etc/testproxy";
  const allowLocalhostAccess = "--add-host host.docker.internal:host-gateway";
  const imageToLoad = "azsdkengsys.azurecr.io/engsys/testproxy-lin:latest";
  return `docker run -v ${repoRoot}:${testProxyRecordingsLocation} -p 5001:5001 -p 5000:5000 ${allowLocalhostAccess} ${imageToLoad}`;
}
