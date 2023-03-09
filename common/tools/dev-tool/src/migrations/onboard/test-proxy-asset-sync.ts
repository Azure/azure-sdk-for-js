// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { readFile, pathExists } from "fs-extra";
import path from "path";
import { createMigration } from "../../util/migrations";
import { runMigrationScript } from "../../util/testProxyUtils";

interface AssetsJson {
  AssetsRepo: "Azure/azure-sdk-assets";
  AssetsRepoPrefixPath: "js";
  TagPrefix: string;
  Tag: string;
}

// The migration itself should be default-exported so that other tools can reference it easily.
export default createMigration(
  "onboard/test_proxy_asset_sync", // unique ID
  "2023-03-08T18:36:03Z", // ISO timestamp that the migration becomes effective
  "enables the `dev-tool check` command (for example)", // short description of the migration
  {
    // Optional URL to more information
    url: "https://github.com/azure/azure-sdk-for-js/tree/main/sdk/test-utils/recorder/ASSET_SYNC_MIGRATION.md",

    // Optional validation
    async validate(project) {
      const assetsJson = JSON.parse(
        (await readFile(path.join(project.path, "assets.json"))).toString("utf-8")
      ) as AssetsJson;

      if (
        !assetsJson.AssetsRepo ||
        !assetsJson.AssetsRepoPrefixPath ||
        !assetsJson.TagPrefix ||
        !assetsJson.Tag ||
        assetsJson.Tag === "" ||
        assetsJson.TagPrefix === ""
      ) {
        throw new Error("assets.json is missing required fields.");
      }
    },

    // Optional automated execution
    async execute(project) {
      // If the `assets.json` file exists, this package is already migrated.
      if (await pathExists(path.join(project.path, "assets.json"))) return;

      await runMigrationScript(project, true);
    },
  }
);
