#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import {
  tryResolveBicepCli,
  validateBicepTargets,
} from "./lib/bicep-validator.js";

function printUsage() {
  console.error(
    "Usage: node scripts/validate-bicep.js [--probe] <file-or-directory> [...more targets]",
  );
}

function isMain() {
  return process.argv[1] === fileURLToPath(import.meta.url);
}

function main(argv) {
  if (argv.includes("--probe")) {
    process.exit(tryResolveBicepCli() ? 0 : 1);
  }

  if (argv.length === 0) {
    printUsage();
    process.exit(1);
  }

  validateBicepTargets(argv);
}

if (isMain()) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
