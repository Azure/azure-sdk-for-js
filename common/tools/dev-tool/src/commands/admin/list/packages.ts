// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { leafCommand, makeCommandInfo } from "../../../framework/command";

export const commandInfo = makeCommandInfo("packages", "list packages defined in the monorepo", {
  paths: {
    description: "list relative paths instead of package names",
    kind: "boolean",
    default: false,
    shortName: "p"
  },
});

import path from "path";
import { resolveRoot } from "../../../util/resolveProject";

import { readFile } from "fs/promises";

import stripJsonComments from "strip-json-comments";

export default leafCommand(commandInfo, async ({ paths }) => {
  const rushJsonText = await readFile(path.resolve(__dirname, "../../../../../../../rush.json"), "utf-8");

  const rushJson = JSON.parse(stripJsonComments(rushJsonText));

  for (const project of rushJson.projects) {
    if (paths) {
      const root = await resolveRoot();
      console.log(path.resolve(root, project.projectFolder))
    } else {
      console.log(project.packageName);
    }
  }

  return true;
});
