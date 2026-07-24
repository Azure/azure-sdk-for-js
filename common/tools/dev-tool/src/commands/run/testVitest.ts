// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import path from "node:path";
import { leafCommand, makeCommandInfo } from "../../framework/command.ts";
import { runTestsWithProxyTool } from "../../util/testUtils.ts";
import { createPrinter } from "../../util/printer.ts";
import { shouldStartRelay, startRelayServer } from "../../util/browserRelayServer.ts";
import { run } from "../../util/run.ts";
import { resolveNodeModuleBin } from "../../util/nodeCli.ts";
import { buildVitestCommand } from "../../util/vitestCommand.ts";

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
  const playwrightCli = resolveNodeModuleBin("playwright", "playwright", process.cwd());
  await run([process.execPath, "--", playwrightCli, "install"], {
    stdio: "inherit",
  });
  log.info("playwright browsers installed");
}

export default leafCommand(commandInfo, async (options) => {
  if (options["browser"]) {
    await playwrightInstall();
  }

  const updatedArgs = options["--"] ?? [];
  const command = buildVitestCommand(updatedArgs, {
    browser: options["browser"],
    esm: options["esm"],
  });

  const stopRelayServer =
    options.browser && options["relay-server"] && (await shouldStartRelay())
      ? startRelayServer()
      : undefined;

  const oldPath = process.env.PATH;
  try {
    // prepend local node_module/.bin to PATH so that vitest can be found in sub-process
    const binPath = path.resolve(path.join(process.cwd(), "node_modules/.bin"));
    const included = (process.env.PATH?.split(path.delimiter) ?? []).includes(binPath);
    if (!included) {
      log.debug(`Adding ${binPath} to process.env.PATH`);
      process.env.PATH = binPath + path.delimiter + process.env.PATH;
    }

    if (options["test-proxy"]) {
      if (options["test-proxy-debug"]) process.env["Logging__LogLevel__Default"] = "Debug";

      return await runTestsWithProxyTool(command);
    }

    log.info("Running vitest without test-proxy");
    try {
      await run(command, { stdio: "inherit" });
      return true;
    } catch (error: unknown) {
      log.error(`vitest failed: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
  } finally {
    stopRelayServer?.();
    if (typeof oldPath === "undefined") {
      delete process.env.PATH;
    } else {
      process.env.PATH = oldPath;
    }
  }
});
