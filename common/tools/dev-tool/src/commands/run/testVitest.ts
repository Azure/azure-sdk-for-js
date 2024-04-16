// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import concurrently from "concurrently";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { runTestsWithProxyTool } from "../../util/testUtils";
import { createPrinter } from "../../util/printer";

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
  if (
    options["browser"] &&
    updatedArgs?.indexOf("-c") !== -1 &&
    updatedArgs?.indexOf("--config") !== -1
  ) {
    args = "-c vitest.browser.config.ts";
  }

  const vitestArgs = updatedArgs?.length ? updatedArgs.join(" ") : "";
  const command = {
    command: `vitest ${args} ${vitestArgs}`,
    name: "vitest",
  };

  if (options["test-proxy"]) {
    return runTestsWithProxyTool(command);
  }

  log.info("Running vitest without test-proxy");
  await concurrently([command]).result;
  return true;
});
