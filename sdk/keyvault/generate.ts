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

// Workaround for src-folder support in emitter:
// End state: src/generated/* contains generated code (instead of src/generated/src/*)

// Step 1: Remove all files in src/generated/*
execCommand("rm -rf src/generated/*");

// Step 2: Copy tsp-location.yaml to src/generated
execCommand("cp tsp-location.yaml src/generated");

// Step 3: Run tsp-client command
// emitter-option as a workaround for https://github.com/Azure/azure-rest-api-specs/issues/31610
execCommand(`tsp-client update -d -o src/generated --emitter-options generateMetadata=false`);
// execCommand(
//   "tsp-client update -d -o src/generated --tsp-config ~/workspace/azure-rest-api-specs/specification/keyvault/Security.KeyVault.Keys/tspconfig.yaml --local-spec-repo ~/workspace/azure-rest-api-specs/specification/keyvault/Security.KeyVault.Keys --repo ~/workspace/azure-rest-api-specs --commit 9561bad7d2eed94cc91aa6164d3721b8aa8699fe --emitter-options generateMetadata=false"
// );

// Step 4: Move generated/src/* files to generated until src-folder is supported
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

// Write updated package.json back to disk
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), "utf8");

// Generated code changes
// Workaround for https://github.com/Azure/autorest.typescript/pull/2135/files
const modelsPath = path.resolve("./src/generated/models/models.ts");
let modelsContent = fs.readFileSync(modelsPath, "utf8");
modelsContent = modelsContent
  .replace(
    /created: !item\["created"\] \? item\["created"\] : new Date\(item\["created"\]\),/g,
    'created: !item["created"] ? item["created"] : new Date(item["created"] * 1000),'
  )
  .replace(
    /updated: !item\["updated"\] \? item\["updated"\] : new Date\(item\["updated"\]\),/g,
    'updated: !item["updated"] ? item["updated"] : new Date(item["updated"] * 1000),'
  )
  .replace(
    /notBefore: !item\["nbf"\] \? item\["nbf"\] : new Date\(item\["nbf"\]\),/g,
    'notBefore: !item["nbf"] ? item["nbf"] : new Date(item["nbf"] * 1000),'
  )
  .replace(
    /expires: !item\["exp"\] \? item\["exp"\] : new Date\(item\["exp"\]\),/g,
    'expires: !item["exp"] ? item["exp"] : new Date(item["exp"] * 1000),'
  )
  .replace(
    /nbf: !item\["notBefore"\] \? item\["notBefore"\] : item\["notBefore"\].getTime\(\),/g,
    'nbf: !item["notBefore"] ? item["notBefore"] : item["notBefore"].getTime() / 1000,'
  )
  .replace(
    /exp: !item\["expires"\] \? item\["expires"\] : item\["expires"\].getTime\(\),/g,
    'exp: !item["expires"] ? item["expires"] : item["expires"].getTime() / 1000,'
  );

fs.writeFileSync(modelsPath, modelsContent, "utf8");
