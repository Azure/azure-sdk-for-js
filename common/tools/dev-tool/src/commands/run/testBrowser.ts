// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { isModuleProject } from "../../util/resolveProject";
import { shouldStartRelay, startRelayServer } from "../../util/browserRelayServer";
import { runTestsWithProxyTool } from "../../util/testUtils";

export const commandInfo = makeCommandInfo(
  "test:browser",
  "runs the browser tests using karma with the default and the provided options; starts the proxy-tool in record and playback modes",
  {
    "relay-server": {
      description: "Start the relay server for browser credentials",
      kind: "boolean",
      default: true,
    },
    "test-proxy-debug": {
      description:
        "Runs the test-proxy with debug logs enabled (Logging__LogLevel__Default=Debug); generates testProxyOutput.log",
      kind: "boolean",
      default: false,
    },
  },
);

export default leafCommand(commandInfo, async (options) => {
  const karmaArgs = options["--"]?.length
    ? options["--"].join(" ")
    : `${(await isModuleProject()) ? "karma.conf.cjs" : ""} --single-run`;

  const stopRelay =
    options["relay-server"] && (await shouldStartRelay()) ? startRelayServer() : undefined;

  if (options["test-proxy-debug"]) process.env["Logging__LogLevel__Default"] = "Debug";

  try {
    const result = await runTestsWithProxyTool({
      command: `karma start ${karmaArgs}`,
      name: "browser-tests",
    });
    return result;
  } finally {
    stopRelay?.();
  }
});
