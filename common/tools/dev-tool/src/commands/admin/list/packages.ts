// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../../framework/command";
import path from "node:path";
import { resolveRoot } from "../../../util/resolveProject";
import { readFile } from "node:fs/promises";
import { run } from "../../../util/run";

export const commandInfo = makeCommandInfo("packages", "list packages defined in the monorepo", {
  paths: {
    description: "list relative paths instead of package names",
    kind: "boolean",
    default: false,
    shortName: "p",
  },
  service: {
    description:
      "list the packages within a given service folder (e.g. 'textanalytics', 'identity')",
    kind: "string",
    shortName: "s",
  },
  task: {
    description: "a .js/.ts file default-exporting a function to run on each listed package",
    kind: "string",
    shortName: "t",
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _rushJson: any = undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getRushJson(): Promise<any> {
  if (_rushJson) return _rushJson;

  const workspaceRootFile = path.resolve(__dirname, "../../../../../../../pnpm-workspace.yaml");
  const workspaceRoot = path.dirname(workspaceRootFile);

  const listPackagesCommand = await run(["pnpm", "list", "--recursive", "--json", "--depth=1"], {
    captureOutput: true,
    cwd: workspaceRoot,
  });

  // console.log(listPackagesCommand.output);
  if (listPackagesCommand.exitCode !== 0) {
    throw new Error("Failed to list packages");
  }

  const pnpmPackages = JSON.parse(listPackagesCommand.output);
  const results = {
    projects: [] as RushJsonProject[],
  };

  for (const pkg of pnpmPackages) {
    if (pkg.path.startsWith(workspaceRoot)) {
      const projectFolder = pkg.path.slice(workspaceRoot.length + 1);
      const packageJsonPath = path.join(pkg.path, "package.json");
      const packageJson = JSON.parse(await readFile(packageJsonPath, "utf-8"));
      results.projects.push({
        packageName: pkg.name,
        projectFolder,
        versionPolicyName: packageJson["sdk-type"] || "unknown",
      });
    }
  }

  return (_rushJson = results);
}

/**
 * The shape of a rush.json `projects` entry.
 */
export interface RushJsonProject {
  /**
   * The name of the package.
   */
  packageName: string;
  /**
   * The path to the project, relative to the monorepo root.
   */
  projectFolder: string;
  /**
   * The version policy name.
   */
  versionPolicyName: string;
}

export async function getProjects(service?: string): Promise<RushJsonProject[]> {
  const rushJson = await getRushJson();

  return service
    ? rushJson.projects.filter((p: RushJsonProject) =>
        p.projectFolder.startsWith(`sdk/${service}/`),
      )
    : rushJson.projects;
}

async function echoPackage(project: RushJsonProject, paths: boolean, cwd: string, root: string) {
  if (paths) {
    console.log(path.relative(cwd, path.resolve(root, project.projectFolder)) || ".");
  } else {
    console.log(project.packageName);
  }
}

export default leafCommand(commandInfo, async ({ paths, service, task }) => {
  const cwd = process.cwd();
  const root = await resolveRoot();

  const projects = await getProjects(service);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let func: any;
  if (task) {
    func = (await import(task)).default;
  } else {
    func = echoPackage;
  }
  for (const project of projects) {
    await func(project, paths, cwd, root);
  }

  return true;
});
