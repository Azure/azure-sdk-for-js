#!/usr/bin/env node

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// this script reads a tspconfig.yaml file and synthesize a spec-gen-sdk-artifiact.json
// to pass to eng/common/scripts/Helpers/ApiView-Helpers.ps1 Create-API-Review

const process = require("process");
const path = require("path");
const fs = require("fs");
const yaml = require("yaml");

const tspconfigPath = process.argv[2];
if (!tspconfigPath) {
  console.error("Please provide a path to tspconfig.yaml");
  process.exit(1);
}
// if the path is not full path, resolve it related to current working directory
const resolvedTspconfigPath = path.isAbsolute(tspconfigPath)
  ? tspconfigPath
  : path.normalize(path.join(process.cwd(), tspconfigPath));

if (!fs.existsSync(resolvedTspconfigPath)) {
  console.error(`The file ${resolvedTspconfigPath} does not exist`);
  process.exit(1);
}

const tspconfigContent = fs.readFileSync(tspconfigPath, "utf8");
const tspconfig = yaml.parse(tspconfigContent);

const tsEmitterOutputDir = tspconfig["options"]?.["@azure-tools/typespec-ts"]?.["emitter-output-dir"];
if (!tsEmitterOutputDir) {
  console.error("The tspconfig.yaml does not have @azure-tools/typespec-ts emitter-output-dir option");
  process.exit(1);
}
const paramters = tspconfig.parameters;
const updatedTsEmitterOutputDir = tsEmitterOutputDir
      .replace("{service-dir}", paramters["service-dir"]["default"])
      .replace("{output-dir}/", "");
const jsRepoPath = path.normalize(path.join(process.argv[1], "../../../../"));
const packageJsonPath = path.join(jsRepoPath, updatedTsEmitterOutputDir, "package.json");
if(!fs.existsSync(packageJsonPath)) {
  console.error(`The resolved package directory ${jsRepoPath}/${updatedTsEmitterOutputDir} does not contains a package.json`);
  process.exit(1);
}
const packageJsonContent = fs.readFileSync(packageJsonPath, "utf8");
const packageJson = JSON.parse(packageJsonContent);
const unscopedPackageName = packageJson.name.startsWith("@") ? packageJson.name.split("/")[1] : packageJson.name;
const specGenArtifact = {
  language: "azure-sdk-for-js",
  apiViewRequestData: [
    {
      packageName: packageJson.name,
      filePath: `${packageJson.name}/${unscopedPackageName}-node.api.json`,
    }
  ],
}
console.log(JSON.stringify(specGenArtifact, null, 2));
