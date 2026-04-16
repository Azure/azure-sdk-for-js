// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { resolveRoot } from "./resolveProject";
import { run } from "./run";

/**
 * The shape of a rush.json `projects` entry.
 */
export interface RushJsonProject {
  /**
   * The name of the package.
   */
  packageName: string;
  /**
   * The name of the package.
   */
  version: string;
  /**
   * The path to the project, relative to the monorepo root.
   */
  projectFolder: string;
  /**
   * The version policy name.
   */
  versionPolicyName: string;
}

function getVersionPolicyName(packageName: string, packageDir: string) {
  if (packageName.startsWith("@azure-tests/")) {
    return "test";
  } else if (
    packageName.startsWith("@azure-tools/") ||
    packageName === "@azure/dev-tool" ||
    packageName === "@azure/eslint-plugin-azure-sdk" ||
    packageName === "@azure/storage-internal-avro"
  ) {
    return "utility";
  } else if (packageName.includes("/arm-")) {
    return "management";
  } else if (packageDir.includes("sdk/core/") || packageDir.includes("sdk\\core\\")) {
    return "core";
  } else if (packageDir.includes("sdk/") || packageDir.includes("sdk\\")) {
    return "client";
  }

  return "unknown";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _rushJson: any = undefined;
let _workspaceRoot: string | undefined = undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getRushJson(): Promise<any> {
  if (_rushJson) return _rushJson;

  _workspaceRoot = await resolveRoot();

  const listPackagesCommand = await run(["pnpm", "list", "--recursive", "--json", "--depth=-1"], {
    captureOutput: true,
    cwd: _workspaceRoot,
  });

  // console.log(listPackagesCommand.output);
  if (listPackagesCommand.exitCode !== 0) {
    throw new Error("Failed to list packages");
  }

  const pnpmPackages = JSON.parse(listPackagesCommand.output);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const results: any = {
    projects: [] as RushJsonProject[],
  };

  for (const pkg of pnpmPackages) {
    if (pkg.name !== "@azure/monorepo" && pkg.path.startsWith(_workspaceRoot)) {
      const projectFolder = pkg.path.slice(_workspaceRoot.length + 1);
      const pkgInfo = {
        packageName: pkg.name,
        version: pkg.version,
        projectFolder,
        versionPolicyName: getVersionPolicyName(pkg.name, pkg.path),
      };
      results.projects.push(pkgInfo);
      results[pkg.name] = pkgInfo;
    }
  }

  return (_rushJson = results);
}
