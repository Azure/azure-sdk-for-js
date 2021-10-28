// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { leafCommand, makeCommandInfo } from "../../framework/command";
import concurrently from "concurrently";
import { isProxyToolActive } from "../../util/testProxyUtils";

export const commandInfo = makeCommandInfo(
  "test:node-js-input",
  "runs the node tests using mocha with the default and the provided options; starts the proxy-tool in record and playback modes",
  {
    mocha: {
      kind: "string",
      description:
        "Mocha options along with the bundled test file(JS) with rollup as expected by mocha",
      default: '--timeout 5000000 "dist-esm/test/{,!(browser)/**/}/*.spec.js"'
    }
  }
);

export default leafCommand(commandInfo, async (_) => {
  if (process.argv[4] !== "--mocha" && !process.argv[5]) {
    throw new Error(
      "unexpected command provided; expected = `dev-tool run test:node-js-input --mocha '<options>'`"
    );
  }

  "mocha -r esm -r ts-node/register --reporter ../../../common/tools/mocha-multi-reporter.js --timeout 1200000 --full-trace  --exclude \"test/**/browser/*.spec.ts\" \"test/**/*.spec.ts\"";

  const testProxyStart = "dev-tool test-proxy start";
  const mochaCMDWithDefaults =
    "nyc mocha -r esm --require source-map-support/register --reporter ../../../common/tools/mocha-multi-reporter.js --full-trace";
  const mochaCommand = `${mochaCMDWithDefaults} ${process.argv[5]}`;

  let runOnlyMochaCommand = false; // Boolean to figure out if we need to run just the mocha command or the test-proxy too

  const mode = process.env.TEST_MODE;
  if (mode === "live") {
    runOnlyMochaCommand = true; // No need to start the proxy tool in the live mode
  } else {
    try {
      await isProxyToolActive();
      // No need to run a new one if it is already active
      // Especially, CI uses this path
      console.log(
        `Proxy tool seems to be active, not attempting to start the test proxy at http://localhost:5000 & https://localhost:5001.\n`
      );
      runOnlyMochaCommand = true;
    } catch (error) {
      if ((error as { code: string }).code === "ECONNREFUSED") {
        // Proxy tool is not active, attempt to start the proxy tool now
        runOnlyMochaCommand = false;
      } else {
        throw error;
      }
    }
  }

  const mochaCommandObj: concurrently.CommandObj = {
    command: mochaCommand,
    name: "node-tests"
  };

  if (runOnlyMochaCommand) {
    await concurrently([mochaCommandObj]);
  } else {
    await concurrently([{ command: testProxyStart, name: "test-proxy" }, mochaCommandObj], {
      killOthers: ["failure", "success"],
      successCondition: "first"
    });
  }
  return true;
});
