// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";

import { readFile, writeFile } from "node:fs/promises";

import { createMigration } from "../util/migrations";
import { AzureSdkMetadata, METADATA_KEY } from "../util/resolveProject";
import { SampleConfiguration } from "../util/samples/configuration";

import { format } from "../util/prettier";

export default createMigration(
  "sample_configuration_metadata",
  "2023-03-03T23:11:30Z",
  "moves the `//sampleConfiguration` package.json field to the '//metadata' field",
  {
    isApplicable(ctx) {
      // This migration is only applicable to client packages that have an existing sample configuration
      return new Promise((resolve) => {
        resolve(
          ctx.project.packageJson["sdk-type"] === "client" &&
            ctx.project.packageJson["//sampleConfiguration"] !== undefined,
        );
      });
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
        [METADATA_KEY]?: AzureSdkMetadata;
      };

      if (packageJson["//sampleConfiguration"]) {
        (packageJson[METADATA_KEY] ??= {} as AzureSdkMetadata).sampleConfiguration =
          packageJson["//sampleConfiguration"];

        delete packageJson["//sampleConfiguration"];
        await format(JSON.stringify(packageJson, null, 2), "json").then((formattedPackageJson) =>
          writeFile(packageJsonPath, formattedPackageJson),
        );
      }
    },
  },
);
