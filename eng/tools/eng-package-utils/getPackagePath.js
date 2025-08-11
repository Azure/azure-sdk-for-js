// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import process from "node:process";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { findPackages } from "@pnpm/fs.find-packages";

const argv = yargs(hideBin(process.argv))
  .options({
    "package-name": {
      type: "string",
      describe:
        "name of the artifact to be set (e.g. azure-keyvault-secrets), will be translated to @azure/(package) format",
      demandOption: true,
    },
    "repo-root": {
      type: "string",
      default: "../../../",
      describe: "root of the repository (e.g. ../../../)",
      demandOption: true,
    },
  })
  .help().argv;

async function main(argv) {
  const packageName = argv["package-name"];
  const repoRoot = argv["repo-root"];

  const pkgs = (
    await findPackages(repoRoot, {
      patterns: ["sdk/*/*", "common/tools/*"],
    })
  ).filter((pkg) => pkg.manifest.name === packageName);

  const targetPackagePath = pkgs[0].rootDirRealPath;

  console.log(`##vso[task.setvariable variable=PackagePath]${targetPackagePath}`);
  console.log(`Emitted variable "PackagePath" with content: ${targetPackagePath}`);
}

main(argv);
