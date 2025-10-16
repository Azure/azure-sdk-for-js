// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { createMigration } from "../../util/migrations";
import { runMigrationScript } from "../../util/testProxyUtils";
import * as git from "../../util/git";
import * as pwsh from "../../util/pwsh";

/**
 * Utility interface for assets.json.
 * @internal
 */
interface AssetsJson {
  AssetsRepo: "Azure/azure-sdk-assets";
  AssetsRepoPrefixPath: "js";
  TagPrefix: string;
  Tag: string;
}

// This migration calls the test-proxy's asset sync migration, ensuring that all packages using the recorder are
// onboarded to the asset sync tool.
export default createMigration(
  "onboard/test_proxy_asset_sync", // unique ID
  "2023-03-08T18:36:03Z", // ISO timestamp that the migration becomes effective
  "onboards a package to use the test-proxy asset sync tool", // short description of the migration
  {
    // Optional URL to more information
    url: "https://github.com/azure/azure-sdk-for-js/tree/main/sdk/test-utils/recorder/ASSET_SYNC_MIGRATION.md",

    // Optional validation
    async validate(ctx) {
      const assetsJson: Partial<AssetsJson> = await readFile(
        path.join(ctx.project.path, "assets.json"),
      ).then((buf) => JSON.parse(buf.toString("utf-8")));

      // Check that the assets.json file is well formed and that we didn't get a bad generation.
      if (
        !assetsJson.AssetsRepo ||
        !assetsJson.AssetsRepoPrefixPath ||
        !assetsJson.TagPrefix ||
        !assetsJson.Tag
      ) {
        throw new Error("assets.json is missing required fields.");
      }
    },

    async execute(ctx) {
      const assetsJsonPath = path.join(ctx.project.path, "assets.json");

      // Run the asset sync script directly.
      await runMigrationScript(ctx.project, true);

      await git.add(assetsJsonPath);
    },

    async isApplicable(ctx) {
      const assetsJsonPath = path.join(ctx.project.path, "assets.json");

      // If the `assets.json` file exists, this package is already migrated.
      if (existsSync(assetsJsonPath)) return false;

      // If the package doesn't have a dependency on `@azure-tools/test-recorder`, it doesn't use the recorder.
      const allDependencies = {
        ...ctx.project.packageJson.dependencies,
        ...ctx.project.packageJson.devDependencies,
      };

      if (!allDependencies["@azure-tools/test-recorder"]) return false;

      // Finally, if there is no "recordings" folder, there are no recordings to migrate.
      return existsSync(path.join(ctx.project.path, "recordings"));
    },

    async checkPreconditions(ctx) {
      // Check that PowerShell is available on the system
      if (!(await pwsh.hasPowerShell())) {
        ctx.logger.error(
          "PowerShell is required to run this migration. Ensure it is installed and available on your PATH.",
        );
        return false;
      }

      const allDependencies = {
        ...ctx.project.packageJson.dependencies,
        ...ctx.project.packageJson.devDependencies,
      };

      const currentRecorder = allDependencies["@azure-tools/test-recorder"];

      // Fail if we are using a recorder that isn't ^3.0.0
      if (currentRecorder && currentRecorder !== "^3.0.0") {
        ctx.logger.error(
          `This migration only supports packages using the test-recorder '^3.0.0'. This package is using ${currentRecorder}.`,
        );
        return false;
      }

      // The asset sync script assumes that the user has their git identity set up globally.
      if (
        !(await git.getConfig("user.name", { global: true })) ||
        !(await git.getConfig("user.email", { global: true }))
      ) {
        ctx.logger.error(
          'Your git identity is not set up globally. Ensure that "git config --global user.name" and "git config --global user.email" return a value.',
        );
        return false;
      }

      return true;
    },
  },
);
