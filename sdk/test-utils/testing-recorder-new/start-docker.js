// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { spawn } = require("child_process");
const fs = require("fs");

// Add options to enable/disable logs
// Allow providing port
// Volume will be hard-coded - will be evalated to be the root of the repo
// Make it part of the dev-tool
// Runnign this script will create a background process which would end when called "docker stop"
// dev-tool command will be used in the respective SDKs to run this script before the tests are run for both node and browser
// Create a script to docker stop which will be run after the test scripts
const out = fs.openSync("./out.log", "a");
const err = fs.openSync("./out.log", "a");
const subprocess = spawn(
  "docker run -v temp-location:/etc/testproxy -p 5001:5001 -p 5000:5000 azsdkengsys.azurecr.io/engsys/ubuntu_testproxy_server:latest",
  [],
  {
    shell: true,
    detached: true,
    stdio: ["ignore", out, err]
  }
);
subprocess.unref();
