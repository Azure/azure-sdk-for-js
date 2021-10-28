// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { leafCommand, makeCommandInfo } from "../framework/command";
import concurrently from "concurrently";
import { isProxyToolActive } from "../util/testProxyUtils";

export const commandInfo = makeCommandInfo(
  "test:browser",
  "runs the browser tests using karma with the default and the provided options; starts the proxy-tool in record and playback modes",
  {
    karma: {
      kind: "string",
      description: "Karma options (such as --single-run)",
      default: ""
    }
  }
);

export default leafCommand(commandInfo, async (_) => {
  if (process.argv[3] !== "--karma" && !process.argv[4]) {
    throw new Error(
      "unexpected command provided; expected = `dev-tool test:browser --karma '<options>'`"
    );
  }

  const testProxyStart = "dev-tool test-proxy start";
  const karmaCMD = `karma start ${process.argv[4]}`;

  let runOnlyKarmaCommand = false; // Boolean to figure out if we need to run just the karma command or the test-proxy too

  const mode = process.env.TEST_MODE;
  if (mode === "live") {
    runOnlyKarmaCommand = true; // No need to start the proxy tool in the live mode
  } else {
    try {
      await isProxyToolActive();
      // No need to run a new one if it is already active
      // Especially, CI uses this path
      console.log(
        `Proxy tool seems to be active, not attempting to start the test proxy at http://localhost:5000 & https://localhost:5001.\n`
      );
      runOnlyKarmaCommand = true;
    } catch (error) {
      if ((error as { code: string }).code === "ECONNREFUSED") {
        // Proxy tool is not active, attempt to start the proxy tool now
        runOnlyKarmaCommand = false;
      } else {
        throw error;
      }
    }
  }

  const karmaCommandObj: concurrently.CommandObj = {
    command: karmaCMD,
    name: "browser-tests"
  };

  if (runOnlyKarmaCommand) {
    await concurrently([karmaCommandObj]);
  } else {
    await concurrently([{ command: testProxyStart, name: "test-proxy" }, karmaCommandObj], {
      killOthers: ["failure", "success"],
      successCondition: "first"
    });
  }
  return true;
});
