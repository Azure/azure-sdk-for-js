#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Helper to execute shell commands and log output
function execCommand(command) {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Command failed: ${command}`);
    process.exit(1);
  }
}

console.log("Setting up the environment...");

// Workaround for src-folder support in emitter, tracked in:
// - https://github.com/microsoft/typespec/issues/5605
// - https://github.com/Azure/autorest.typescript/issues/3011
// End state: src/generated/* contains generated code (instead of src/generated/src/*)

// Step 1: Remove all files in src/generated/*
execCommand("rm -rf src/generated/*");

// Step 2: Copy tsp-location.yaml to src/generated
execCommand("cp tsp-location.yaml src/generated");

// Step 3: Run tsp-client command
// emitter-option as a workaround for https://github.com/Azure/azure-rest-api-specs/issues/31610
execCommand(`tsp-client update -d -o src/generated --emitter-options generateMetadata=false`);

// Step 4: Move generated/src/* files to generated until src-folder is supported
execCommand("mv src/generated/src/* src/generated/");

// Step 5: Remove generated/src
execCommand("rm -rf src/generated/src");

// Step 6: Remove tsp-location.yaml from generated folder
execCommand("rm src/generated/tsp-location.yaml");
