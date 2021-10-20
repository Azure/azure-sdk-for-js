// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { spawn } from "child_process";
import fs from "fs";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";

const log = createPrinter("info");

export const commandInfo = makeCommandInfo(
  "resolve",
  "display information about the project that owns a directory",
  {
    directory: {
      shortName: "d",
      kind: "string",
      description: "base directory for resolution (uses CWD if unset)",
      allowMultiple: true
    },
    quiet: {
      shortName: "q",
      kind: "boolean",
      default: false,
      description: "output only the directory name with no extra formatting"
    }
  }
);

export default leafCommand(commandInfo, async (_options) => {
  // Allow providing port
  // Volume will be hard-coded - will be evalated to be the root of the repo
  // Runnign this script will create a background process which would end when called "docker stop"
  // dev-tool command will be used in the respective SDKs to run this script before the tests are run for both node and browser
  // Create a script to docker stop which will be run after the test scripts
  // Should not start the container in live mode, this is only meant for record and playback modes
  //  - We should load the .env and check the TEST_MODE variable before starting
  // Check http://localhost:5000 & https://localhost:5001
  // - Only start docker run if they are not active
  // After starting http://localhost:5000 & https://localhost:5001
  // - Make sure http://localhost:5000 & https://localhost:5001 are active
  // Helpful commands
  // - dev-tool test-proxy start
  // - dev-tool test-proxy stop // figure out how to do
  // - dev-tool test-proxy isRunning // logs true

  // docker run command should run in background
  // - allow putting logs into a file if a flag --debug is specified
  // If docker run fails, throw the error
  const outFileName = "test-proxy-output.log";
  const out = fs.openSync(`./${outFileName}`, "a");
  const err = fs.openSync(`./${outFileName}`, "a");
  log.info(`Attempting to start test proxy at http://localhost:5000 & https://localhost:5001. 
  
            Check the output file ${outFileName} for test-proxy logs.
  `);
  const subprocess = spawn(
    "docker run -v /workspaces/azure-sdk-for-js/:/etc/testproxy -p 5001:5001 -p 5000:5000 --add-host host.docker.internal:host-gateway azsdkengsys.azurecr.io/engsys/testproxy-lin:latest",
    [],
    {
      shell: true,
      detached: true,
      stdio: ["ignore", out, err]
    }
  );
  subprocess.unref();
  return true;
});
