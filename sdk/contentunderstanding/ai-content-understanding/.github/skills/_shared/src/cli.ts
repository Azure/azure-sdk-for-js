// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Subcommand dispatcher for the cu-skill tool. Mirrors Python's
 * extract_layout.py / create_and_test.py / create_and_test_router.py
 * entry points, the .NET Program.cs, and the Java Cli.java.
 */

import { runExtractLayout } from "./extractLayoutCommand.js";
import { runCreateAndTest } from "./createAndTestCommand.js";
import { runCreateAndTestRouter } from "./createAndTestRouterCommand.js";

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.length === 0 || isHelp(args[0])) {
    printUsage();
    process.exit(args.length === 0 ? 1 : 0);
  }
  const subcommand = args[0];
  const subArgs = args.slice(1);
  let exit = 0;
  switch (subcommand) {
    case "extract-layout":
      exit = await runExtractLayout(subArgs);
      break;
    case "create-and-test":
      exit = await runCreateAndTest(subArgs);
      break;
    case "create-and-test-router":
      exit = await runCreateAndTestRouter(subArgs);
      break;
    default:
      console.error(`unknown subcommand: ${subcommand}`);
      printUsage();
      exit = 1;
  }
  process.exit(exit);
}

function isHelp(arg: string): boolean {
  return arg === "-h" || arg === "--help" || arg === "help";
}

function printUsage(): void {
  console.log("cu-skill — Content Understanding analyzer-authoring tool.");
  console.log();
  console.log("Subcommands:");
  console.log("  extract-layout              extract document layout (stage 1)");
  console.log("  create-and-test             validate, create, batch-test a single-type analyzer");
  console.log("  create-and-test-router      classify-and-route variant (N inner + 1 outer)");
  console.log();
  console.log("Use '<subcommand> --help' for per-command flags.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
