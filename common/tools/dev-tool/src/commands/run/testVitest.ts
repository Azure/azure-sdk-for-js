// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import concurrently from "concurrently";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { runTestsWithProxyTool } from "../../util/testUtils";
import { createPrinter } from "../../util/printer";
import { shouldStartRelay, startRelayServer } from "../../util/browserRelayServer";
import { runTestProxyCommandWithRetry } from "../../util/testProxyUtils";
import fs from "fs";

const log = createPrinter("test:vitest");

export const commandInfo = makeCommandInfo(
  "test:vitest",
  "runs tests using vitest with the default and the provided options; starts the proxy-tool in record and playback modes",
  {
    "test-proxy": {
      shortName: "tp",
      kind: "boolean",
      default: true,
      description: "whether to enable launching test-proxy",
    },
    browser: {
      shortName: "br",
      kind: "boolean",
      default: false,
      description: "whether to use browser to run tests",
    },
    esm: {
      kind: "boolean",
      default: false,
      description: "whether to use esm to run tests",
    },
    "relay-server": {
      shortName: "rs",
      description:
        "Start the relay server for browser credentials. Only takes effect if using browser to test.",
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

async function playwrightInstall(): Promise<void> {
  const { result } = concurrently([
    {
      command: "npx playwright install",
      name: "playwright install",
    },
  ]);

  await result;
  log.info("playwright browsers installed");
}

export default leafCommand(commandInfo, async (options) => {
  if (options["browser"]) {
    await playwrightInstall();
  }

  const updatedArgs = options["--"]?.map((opt) =>
    opt.includes("**") && !opt.startsWith("'") && !opt.startsWith('"') ? `"${opt}"` : opt,
  );

  let args = "";
  // Only set if we didn't provide a config file path
  const providedConfig = updatedArgs?.find((arg) => arg === "-c" || arg === "--config");
  if (options["browser"] && !providedConfig) {
    args = "-c vitest.browser.config.ts";
  } else if (options["esm"] && !providedConfig) {
    args = "-c vitest.esm.config.ts";
  }

  const vitestArgs = updatedArgs?.length ? updatedArgs.join(" ") : "";
  const command = {
    command: `vitest ${args} ${vitestArgs}`,
    name: "vitest",
  };

  const stopRelayServer =
    options.browser && options["relay-server"] && (await shouldStartRelay())
      ? startRelayServer()
      : undefined;

  try {
    if (options["test-proxy"]) {
      if (options["test-proxy-debug"]) process.env["Logging__LogLevel__Default"] = "Debug";

      // restore recordings first in CI to avoid impacting the first playback test
      if (process.env["BUILD_BUILDNUMBER"] && fs.existsSync("assets.json")) {
        log.info(`restoring recordings before testing`);
        // This line runs the 'restore' command with retries.
        // Introduced retries for the 'restore' command to mitigate EBUSY errors, which occur due to resource locking by simultaneous pipeline processes.
        // The CI pipeline fails flakily for any of the packages in the run without the retries.
        // Best solution would probably be to get rid of this code in favour of downloading the assets as part of a dedicated pipeline step that would be common for all languages.
        await runTestProxyCommandWithRetry(["restore", "-a", "assets.json"], 1000, 10000);
      }

      return await runTestsWithProxyTool(command);
    }

    log.info("Running vitest without test-proxy");
    await concurrently([command]).result;
    return true;
  } finally {
    stopRelayServer?.();
  }
});
