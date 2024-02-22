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
    "no-test-proxy": {
      shortName: "ntp",
      kind: "boolean",
      default: false,
      description: "whether to disable launching test-proxy",
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

  const reporterArgs = `--reporter=verbose --reporter=junit --outputFile=test-results${options["browser"] ? ".browser" : ""}.xml`;
  const args = options["browser"] ? "-c vitest.browser.config.mts" : "";
  const updatedArgs = options["--"]?.map((opt) =>
    opt.includes("**") && !opt.startsWith("'") && !opt.startsWith('"') ? `"${opt}"` : opt,
  );
  const vitestArgs = updatedArgs?.length ? updatedArgs.join(" ") : "";
  const command = {
    command: `vitest ${reporterArgs} ${args} ${vitestArgs}`,
    name: "vitest",
  };

  if (!options["no-test-proxy"]) {
    return runTestsWithProxyTool(command);
  }

  log.info("Running vitest without test-proxy");
  await concurrently([command]).result;
  return true;
});
