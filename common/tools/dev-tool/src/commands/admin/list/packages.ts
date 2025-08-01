// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../../framework/command";
import path from "node:path";
import { resolveRoot } from "../../../util/resolveProject";
import { getRushJson, type RushJsonProject } from "../../../util/synthesizedRushJson";

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

// use --task option to provide code file to be executed for each package. For example,
// the following code adds missing "tsx" dev dependency whereever it is used.
/*
```ts
import path from "node:path";
import { writeFile } from "node:fs/promises";
import { resolveProject } from "../../../../util/resolveProject";
import { RushJsonProject } from "../../../../util/synthesizedRushJson";

export default async function listPackageCallback(
  project: RushJsonProject,
  _paths: boolean,
  _cwd: string,
  root: string,
) {
  const { projectFolder, packageName } = project;
  const fullProjectPath = path.join(root, projectFolder);
  const { packageJson } = await resolveProject(fullProjectPath);

  const testNodeScript = packageJson.scripts["test:node"];

  if (testNodeScript.includes("dev-tool run test:node-js-input") ||
    testNodeScript.includes("dev-tool run test:node-tsx-ts")) {
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
```
  */
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
