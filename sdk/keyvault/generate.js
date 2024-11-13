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

// Step 1: Remove all files in src/generated/*
execCommand("rm -rf src/generated/*");

// Step 2: Copy tsp-location.yaml to src/generated
execCommand("cp tsp-location.yaml src/generated");

// Step 3: Run tsp-client command
execCommand("tsp-client update -d -o src/generated");

// Step 4: Move generated/src/* files to generated
execCommand("mv src/generated/src/* src/generated/");

// Step 5: Remove generated/src
execCommand("rm -rf src/generated/src");

// Step 6: Remove tsp-location.yaml from generated folder
execCommand("rm src/generated/tsp-location.yaml");

// Step 7: Read and update package.json
console.log("Updating package.json dependencies...");
const packageJsonPath = path.resolve("./package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

// Remove dependency on @azure/core-client and add @azure-rest/core-client
delete packageJson.dependencies["@azure/core-client"];
packageJson.dependencies["@azure-rest/core-client"] = "^2.0.0";

// Update @azure/core-lro to version 3.0.0
packageJson.dependencies["@azure/core-lro"] = "^3.0.0";

// Write updated package.json back to disk
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), "utf8");

console.log("Environment setup completed successfully.");

// Codemod tasks can be implemented here...
console.log("Running codemods...");

/*
    1. Replace imports from "@azure/core-client" to "@azure-rest/core-client"
    2. Remove this.vaultUrl from calls to client
    3. Add mapper for paging
    4. Pass credential to generated client constructor
    5. Remove all paging helpers and use the mapper
  */
