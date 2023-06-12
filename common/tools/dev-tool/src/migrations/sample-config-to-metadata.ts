// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import path from "node:path";

import { readFile, writeFile } from "fs-extra";

import { createMigration } from "../util/migrations";
import { AzureSdkMetadata, METADATA_KEY } from "../util/resolveProject";
import { SampleConfiguration } from "../util/samples/configuration";

export default createMigration(
  "sample_configuration_metadata",
  "2023-03-03T23:11:30Z",
  "moves the `//sampleConfiguration` package.json field to the '//metadata' field",
  {
    async isApplicable(ctx) {
      // This migration is only applicable to client packages.
      return ctx.project.packageJson["sdk-type"] === "client";
    },

    async validate(ctx) {
      const packageJsonPath = path.join(ctx.project.path, "package.json");

      const packageJson = JSON.parse((await readFile(packageJsonPath)).toString("utf-8"));

      if (!packageJson[METADATA_KEY].sampleConfiguration)
        throw new Error("No sample configuration detected after migration.");
    },

    async execute(ctx) {
      const packageJsonPath = path.join(ctx.project.path, "package.json");

      const packageJson = JSON.parse((await readFile(packageJsonPath)).toString("utf-8")) as {
        "//sampleConfiguration"?: SampleConfiguration;
        [METADATA_KEY]: AzureSdkMetadata;
      };

      if (packageJson["//sampleConfiguration"]) {
        packageJson[METADATA_KEY].sampleConfiguration = packageJson["//sampleConfiguration"];

        delete packageJson["//sampleConfiguration"];

        await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
      }
    },
  }
);
