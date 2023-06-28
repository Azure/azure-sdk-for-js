// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { leafCommand, makeCommandInfo } from "../../../framework/command";

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

import path from "path";
import { resolveRoot } from "../../../util/resolveProject";

import { readFile } from "fs/promises";

import stripJsonComments from "strip-json-comments";

let _rushJson: any = undefined;

async function getRushJson(): Promise<any> {
  if (_rushJson) return _rushJson;

  const rushJsonText = await readFile(
    path.resolve(__dirname, "../../../../../../../rush.json"),
    "utf-8"
  );

  return (_rushJson = JSON.parse(stripJsonComments(rushJsonText)));
}

export async function getProjects(service?: string) {
  const rushJson = await getRushJson();

  return service
    ? rushJson.projects.filter((p: { projectFolder: string }) =>
        p.projectFolder.startsWith(`sdk/${service}`)
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
