// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// import { spawn } from "child_process";
import path from "node:path";
import { readFile, rename, writeFile } from "fs-extra";
import { createMigration } from "../util/migrations";
import * as git from "../util/git";

type PackageJsonType = {
  main?: string;
  type?: string;
  "react-native"?: Record<string, string>;
  scripts: {
    "unit-test:node": string;
    "integration-test:node": string;
    "unit-test:browser": string;
    "integration-test:browser": string;
  };
  export: {
    ".": {
      require: {
        types: string;
        default: string;
      };
      import: {
        types: string;
        default: string;
      };
    };
  };
  files: string[];
  devDependencies: Record<string, string>;
  mocha?: any;
};

export default createMigration(
  "migrate-to-esm", // unique ID
  "2023-05-23T21:35:34.784Z", // ISO timestamp that the migration becomes effective
  "Migrate a package to have type: module in package.json; Add .js extension to imported relative source module; Rename commonjs module to have .cjs extension. etc.", // short description of the migration
  {
    async isApplicable(ctx) {
      // This migration is only applicable to client packages that doesn't have `"type": "module"`.
      return (
        ctx.project.packageJson["sdk-type"] === "client" &&
        ctx.project.packageJson["type"] !== "module"
      );
    },

    async validate(_ctx) {
      /* no-op */
    },

    async execute(ctx) {
      const packageJsonPath = path.join(ctx.project.path, "package.json");

      const packageJson = JSON.parse((await readFile(packageJsonPath)).toString("utf-8")) as PackageJsonType

      // set "type" to "module"
      if (packageJson.type !== "module") {
        packageJson.type = "module";
      }

      // rename "main" entry to have .cjs extension
      const origianlMain = packageJson.main;
      if (!origianlMain) {
        throw new Error("Expecting valid main field in  package.json");
      }

      if (origianlMain.endsWith(".js")) {
        packageJson.main = origianlMain.replace(".js", ".cjs"); // assuming no other occurrences of ".js"
      }

      // replace react-native mapping entry for main
      if (packageJson["react-native"] && packageJson["react-native"][origianlMain]) {
        const value = packageJson["react-native"][origianlMain];
        delete packageJson["react-native"].oldMain;
        packageJson["react-native"][packageJson.main!] = value;
      }

      // add export
      const apiExtractorConf = JSON.parse(((await readFile(path.join(ctx.project.path, "api-extractor.json"))).toString("utf-8"))) as {
        "dtsRollup": {
          "publicTrimmedFilePath"?: string
        }
      };
      const rollupDts = apiExtractorConf["dtsRollup"]["publicTrimmedFilePath"] ?? "./types/src/index.d.ts";
      packageJson.export = {
        ".": {
          require: {
            types: rollupDts,
            default: "./dist/index.cjs",
          },
          import: {
            types: `./types/src/index.d.ts`,
            default: "./dist-esm/src/index.js",
          },
        },
      };

      // add individual type files
      packageJson.files.push("types/latest/src/");
      packageJson.files.push("types/3.1/src/");

      // add mocha option
      packageJson.mocha = {
        loader: "ts-node/esm",
      };

      // update node test script to remove "-r esm" and "--register ts-node/register"
      packageJson["scripts"]["unit-test:node"] = updateMochaScript(packageJson["scripts"]["unit-test:node"]);
      packageJson["scripts"]["integration-test:node"] = updateMochaScript(packageJson["scripts"]["integration-test:node"]);

      // TODO: bump package minor version and update constant occurrances based on config in package.json

      // rename karma.conf.js to karma.conf.cjs
      const karmaConf = path.join(ctx.project.path, "karma.conf.");
      await rename(`${karmaConf}js`, `${karmaConf}cjs`);
      await git.add("karma.conf.cjs");

      // update browser test script to use the cjs config file
      packageJson["scripts"]["unit-test:browser"] = updateKarmaScript(packageJson["scripts"]["unit-test:browser"]);

      // TODO: go through all code files and update relative imports/exports to have ".js" extension

      await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
    },
  }
);

function updateMochaScript(script: string): string {
  return script
    .replace("-r esm ", "")
    .replace("--register esm ", "")
    .replace("-r ts-node/register ", "")
    .replace("--register ts-node/register ", "");
}

function updateKarmaScript(script: string): string {
  return script.replace("karma start", "karma start karma.conf.cjs");
}
