// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// import { spawn } from "child_process";
import path from "node:path";
import { pathExists, readFile, rename, writeFile } from "fs-extra";
import { createMigration } from "../util/migrations";
import { Project } from "ts-morph";
import * as git from "../util/git";
import semver from "semver";
import { AzureSdkMetadata, METADATA_KEY } from "../util/resolveProject";

type PackageJsonType = {
  version: string;
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
  [METADATA_KEY]?: AzureSdkMetadata;
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

      const packageJson = JSON.parse(
        (await readFile(packageJsonPath)).toString("utf-8")
      ) as PackageJsonType;

      // set "type" to "module"
      if (packageJson.type !== "module") {
        packageJson.type = "module";
      }

      // rename "main" entry to have .cjs extension
      const originalMain = packageJson.main;
      if (!originalMain) {
        throw new Error("Expecting valid main field in  package.json");
      }

      if (originalMain.endsWith(".js")) {
        packageJson.main = originalMain.replace(".js", ".cjs"); // assuming no other occurrences of ".js"
      }

      updateReactNativeMapping(packageJson, originalMain);

      // add export
      const apiExtractorConf = JSON.parse(
        (await readFile(path.join(ctx.project.path, "api-extractor.json"))).toString("utf-8")
      ) as {
        dtsRollup: {
          publicTrimmedFilePath?: string;
        };
      };
      const rollupDts =
        apiExtractorConf["dtsRollup"]["publicTrimmedFilePath"] ?? "./types/src/index.d.ts";
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
      updateMocha(packageJson);

      // bump package minor version and update constant occurrances based on config in package.json
      bumpMinorVersion(packageJson, ctx.project.path);

      // rename karma.conf.js to karma.conf.cjs
      const karmaConf = path.join(ctx.project.path, "karma.conf.");
      if (await pathExists(`${karmaConf}js`)) {
        await rename(`${karmaConf}js`, `${karmaConf}cjs`);
        await git.add("karma.conf.cjs");
      }

      // update browser test script to use the cjs config file
      packageJson["scripts"]["unit-test:browser"] = updateKarmaScript(
        packageJson["scripts"]["unit-test:browser"]
      );

      await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

      // go through all code files and update relative imports/exports to have ".js" extension
      await addJsExtensionToRelativeModules(ctx.project.path);
    },
  }
);

function updateReactNativeMapping(packageJson: PackageJsonType, originalMain: string): void {
  const relativePath = originalMain.startsWith("./") ? originalMain : `./${originalMain}`;
  if (packageJson["react-native"] && packageJson["react-native"][relativePath]) {
    const value = packageJson["react-native"][relativePath];
    delete packageJson["react-native"][relativePath];
    packageJson["react-native"][
      packageJson.main!.startsWith("./") ? packageJson.main! : `./${packageJson.main!}`
    ] = value;
  }
}

function updateMocha(packageJson: PackageJsonType) {
  const unittestScript = packageJson["scripts"]["unit-test:node"];
  const integrationTestScript = packageJson["scripts"]["integration-test:node"];
  if (
    unittestScript.includes("ts-node/register") ||
    unittestScript.includes("test:node-ts-input") ||
    integrationTestScript.includes("ts-node/register") ||
    integrationTestScript.includes("test:node-ts-input")
  ) {
    packageJson.mocha = {
      loader: "ts-node/esm",
    };
  }
  // update node test script to remove "-r esm" and "--register ts-node/register"
  packageJson["scripts"]["unit-test:node"] = updateMochaScript(
    packageJson["scripts"]["unit-test:node"]
  );
  packageJson["scripts"]["integration-test:node"] = updateMochaScript(
    packageJson["scripts"]["integration-test:node"]
  );
}

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

async function addJsExtensionToRelativeModules(projectPath: string): Promise<void> {
  const project = new Project({
    tsConfigFilePath: path.join(projectPath, "tsconfig.json"),
    libFolderPath: path.join(projectPath, "node_modules", "typescript", "lib"),
  });
  const files = project.getSourceFiles();
  for (const f of files) {
    if (f.getBaseName().endsWith(".d.ts")) continue;
    const imports = f.getImportDeclarations();
    for (const i of imports) {
      const specifierValue = i.getModuleSpecifierValue();
      const specifierSource = i.getModuleSpecifierSourceFile();
      if (specifierValue.startsWith(".")) {
        const parts = specifierValue.split("/");
        const lastPart = parts[parts.length - 1];
        if (specifierSource?.compilerNode?.fileName.endsWith(`${lastPart}.ts`)) {
          i.getModuleSpecifier()?.replaceWithText(`"${specifierValue}.js"`);
        } else {
          i.getModuleSpecifier()?.replaceWithText(`"${specifierValue}/index.js"`);
        }
      }
    }
    const exports = f.getExportDeclarations();
    for (const e of exports) {
      const specifierValue = e.getModuleSpecifierValue();
      const specifierSource = e.getModuleSpecifierSourceFile();
      if (specifierValue?.startsWith(".")) {
        const parts = specifierValue.split("/");
        const lastPart = parts[parts.length - 1];
        if (specifierSource?.compilerNode?.fileName.endsWith(`${lastPart}.ts`)) {
          e.getModuleSpecifier()?.replaceWithText(`"${specifierValue}.js"`);
        } else {
          e.getModuleSpecifier()?.replaceWithText(`"${specifierValue}/index.js"`);
        }
      }
    }
  }
  await project.save();
}

// This regex is taken from # https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
// and adapted to exclude beginning of line (^) and end of line ($) anchors.
const semverRegex = `(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?`;

async function bumpMinorVersion(packageJson: PackageJsonType, projectPath: string): Promise<void> {
  const currentVersion = packageJson.version;
  if (!semver.prerelease(currentVersion)) {
    const newVersion = semver.inc(currentVersion, "minor");
    if (newVersion) {
      packageJson.version = newVersion;
      for (const pathSpec of packageJson["//metadata"]?.constantPaths ?? []) {
        const target = path.join(projectPath, pathSpec.path);
        const content = (await readFile(target)).toString("utf-8");
        const regex = new RegExp(`(${pathSpec.prefix}.*?)(${semverRegex.toString()})`, "g");
        const updated = content.replace(regex, `$1${newVersion}`);
        if (updated !== content) {
          await writeFile(target, updated);
        }
      }
      // update CHANGELOG
      const changelogPath = path.join(projectPath, "CHANGELOG.md");
      if (await pathExists(changelogPath)) {
        const content = (await readFile(changelogPath)).toString("utf-8");
        const updated = content
          .replace(`${currentVersion} (Unreleased)`, `${newVersion} (Unreleased)`)
          .replace(
            "### Other Changes",
            `### Other Changes

- Migrate package to ESM and add conditional exports.
`
          );
        await writeFile(changelogPath, updated);
      }
    }
  }
}
