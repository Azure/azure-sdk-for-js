#!/usr/bin/env node
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { parseArgs } from "node:util";
import { build } from "./build.ts";
import { setLogLevel, setJsonMode } from "./logger.ts";
import { WarpError } from "./types.ts";

async function main(): Promise<void> {
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    options: {
      config: { type: "string" },
      "dry-run": { type: "boolean", default: false },
      "no-clean": { type: "boolean", default: false },
      parallel: { type: "boolean", default: false },
      target: { type: "string", multiple: true },
      stats: { type: "boolean", default: false },
      json: { type: "boolean", default: false },
      verbose: { type: "boolean", default: false },
      quiet: { type: "boolean", default: false },
      help: { type: "boolean", default: false },
    },
    allowPositionals: true,
    strict: true,
  });

  const command = positionals[0];

  if (!command || command === "help" || values.help) {
    printUsage();
    process.exit(0);
  }

  // Set log level (#7)
  if (values.json) {
    setJsonMode(true);
    setLogLevel("quiet");
  } else if (values.quiet) {
    setLogLevel("quiet");
  } else if (values.verbose) {
    setLogLevel("verbose");
  }

  const useParallel = values.parallel ?? false;

  if (command === "init") {
    const { init } = await import("./init.js");
    await init({ cwd: process.cwd() });
    return;
  }

  if (command === "watch") {
    // Watch mode (#6)
    const { watch } = await import("./watch.js");
    const ac = await watch({
      configPath: values.config,
      clean: !values["no-clean"],
      parallel: useParallel,
      target: values.target,
    });

    // Graceful shutdown
    process.on("SIGINT", () => {
      ac.abort();
      process.exit(0);
    });
    return;
  }

  if (command !== "build") {
    console.error(`[warp] Unknown command: ${command}`);
    printUsage();
    process.exit(1);
  }

  const result = await build({
    dryRun: values["dry-run"],
    clean: !values["no-clean"],
    parallel: useParallel,
    target: values.target,
    stats: values.stats,
    json: values.json,
    configPath: values.config,
  });

  if (values.json) {
    const jsonOutput: Record<string, unknown> = {
      success: result.success,
      totalTimeMs: result.totalTimeMs,
    };
    if (result.compileResults) {
      jsonOutput.targets = result.compileResults.map((r) => ({
        name: r.target.name,
        condition: r.target.condition,
        success: r.success,
        compileTimeMs: r.compileTimeMs,
        deduped: r.deduped,
        outDir: r.outDir,
      }));
    }
    if (result.sizeReport) {
      jsonOutput.sizeReport = result.sizeReport;
    }
    console.log(JSON.stringify(jsonOutput, null, 2));
  }

  if (!result.success) {
    process.exit(1);
  }
}

function printUsage(): void {
  const docsUrl = "https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/warp/README.md";
  // ANSI OSC 8 hyperlink: clickable in supported terminals
  const supportsLink = process.env.TERM_PROGRAM !== undefined || (process.stderr.isTTY ?? false);
  const docsLink = supportsLink ? `\x1b]8;;${docsUrl}\x1b\\${docsUrl}\x1b]8;;\x1b\\` : docsUrl;

  console.log(`
Usage: warp <command> [options]

Commands:
  build             Compile all targets
  watch             Build then watch for source changes and rebuild
  init              Scaffold a new warp.config.yml in the current directory

Options:
  --config <path>   Path to warp config file (resolved relative to cwd)
  --dry-run         Validate config and show exports diff without compiling
  --no-clean        Skip cleaning outDirs before compilation
  --parallel        Compile in parallel using worker threads (default: off)
  --target <name>   Only build targets matching the given name(s) (repeatable)
  --stats           Compute and display size and API surface report
  --json            Output machine-readable JSON (implies --quiet)
  --verbose         Print debug-level detail (cache hits, file lists)
  --quiet           Suppress all output except errors
  --help            Show this help message

See the docs for more information: ${docsLink}
`);
}

main().catch((err) => {
  const error = err as unknown;

  if (err instanceof WarpError) {
    console.error(err.message);
    if (err.cause) {
      const causeText =
        err.cause instanceof Error
          ? err.cause.message
          : typeof err.cause === "string"
            ? err.cause
            : JSON.stringify(err.cause);
      console.error(`  cause: ${causeText}`);
    }
    process.exit(1);
  }

  // Node.js parseArgs errors (e.g. unknown flags)
  if (
    error instanceof Error &&
    (error as { code?: string }).code === "ERR_PARSE_ARGS_UNKNOWN_OPTION"
  ) {
    console.error(`[warp] ${error.message}`);
    console.error(`[warp] Run "warp --help" for usage information.`);
    process.exit(1);
  }

  if (
    error instanceof Error &&
    (error as { code?: string }).code === "ERR_PARSE_ARGS_INVALID_OPTION_VALUE"
  ) {
    console.error(`[warp] ${error.message}`);
    console.error(`[warp] Run "warp --help" for usage information.`);
    process.exit(1);
  }

  // Unexpected errors — show full stack for debugging
  console.error(error);
  process.exit(2);
});
