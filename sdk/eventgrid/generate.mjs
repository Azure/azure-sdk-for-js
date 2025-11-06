#!/usr/bin/env node

// NOTE: this requires Node.js v22 or higher for fs.rmSync with recursive option

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

// Helper to execute shell commands and log output
function execCommand(command) {
  try {
    execSync(command, { stdio: "inherit" });
  } catch {
    console.error(`Command failed: ${command}`);
    process.exit(1);
  }
}

console.log("Setting up the environment...");

// Workaround for src-folder support in emitter, tracked in:
// - https://github.com/microsoft/typespec/issues/5605
// - https://github.com/Azure/autorest.typescript/issues/3011
// End state: src/generated/* contains generated code

console.log("Creating src/generated-tmp directory and copying tsp-location.yaml there...");
const generatedTmpDir = path.join(process.cwd(), "src", "generated-tmp");
if (!fs.existsSync(generatedTmpDir)) {
  fs.mkdirSync(generatedTmpDir);
}
fs.copyFileSync(
  path.join(process.cwd(), "tsp-location.yaml"),
  path.join(process.cwd(), "src", "generated-tmp", "tsp-location.yaml"),
);

// emitter-option as a workaround for https://github.com/Azure/azure-rest-api-specs/issues/31610
try {
  console.log("Running tsp-client to generate code...");
  execCommand(
    `tsp-client update -d -o src/generated-tmp --emitter-options="generate-metadata=false;generate-test=false"`,
  );
} catch (error) {
  console.error("tsp-client command failed. Make sure tsp-client is installed and accessible.");
  console.error(error);
}

console.log("Moving metadata.json from ./ to src/generated-tmp/...");
fs.renameSync(
  path.join(process.cwd(), "metadata.json"),
  path.join(process.cwd(), "src", "generated", "metadata.json"),
);

console.log("Removing from src/generated-tmp/...");
fs.rmSync(path.join(process.cwd(), "src", "generated-tmp"), { force: true, recursive: true });
