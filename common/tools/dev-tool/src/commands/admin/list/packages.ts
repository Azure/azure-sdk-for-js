// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
});

let _rushJson: any = undefined;

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

export default leafCommand(commandInfo, async ({ paths, service }) => {
  const cwd = process.cwd();
  const root = await resolveRoot();

  const projects = await getProjects(service);

  for (const project of projects) {
    if (paths) {
      console.log(path.relative(cwd, path.resolve(root, project.projectFolder)) || ".");
    } else {
      console.log(project.packageName);
    }
  }

  return true;
});
