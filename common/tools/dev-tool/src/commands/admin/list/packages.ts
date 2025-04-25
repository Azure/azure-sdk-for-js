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
