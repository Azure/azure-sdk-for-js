// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../../framework/command";
import path from "node:path";
import { resolveRoot } from "../../../util/resolveProject";
import { readFile } from "node:fs/promises";
import stripJsonComments from "strip-json-comments";

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

  // use --task option to provide code file to be excuted for each package. For example,
  // the following code adds missing "tsx" dev dependency whereever it is used.
  /*
import * as path from "node:path";
import { writeFile } from "node:fs/promises";
import { resolveProject } from "../../../../util/resolveProject";
import { RushJsonProject } from "../packages";

export default async function IdentifyPackage(
  project: RushJsonProject,
  _paths: boolean,
  _cwd: string,
  root: string,
) {
  const { projectFolder, packageName } = project;
  const fullProjectPath = path.join(root, projectFolder);
  const { packageJson } = await resolveProject(fullProjectPath);

  const unitTestNodeScript = packageJson.scripts["unit-test:node"];
  const integrationTestNodeScript = packageJson.scripts["integration-test:node"];

  if (unitTestNodeScript.includes("dev-tool run test:node-js-input") ||
    integrationTestNodeScript.includes("dev-tool run test:node-js-input") ||
    unitTestNodeScript.includes("dev-tool run test:node-tsx-ts") ||
    integrationTestNodeScript.includes("dev-tool run test:node-tsx-ts")) {
    if (!packageJson.devDependencies["tsx"]) {
      console.log(`    updating ${packageName} ${fullProjectPath} testing scripts`);
      packageJson.devDependencies["tsx"] = "^4.7.1";
      await writeFile(
        path.join(fullProjectPath, "package.json"),
        JSON.stringify(packageJson, undefined, 2) + "\n",
      );
    }
  }
}
*/
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

  const rushJsonText = await readFile(
    path.resolve(__dirname, "../../../../../../../rush.json"),
    "utf-8",
  );

  return (_rushJson = JSON.parse(stripJsonComments(rushJsonText)));
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
