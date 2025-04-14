// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../../framework/command";
import path from "node:path";
import { resolveRoot } from "../../../util/resolveProject";
import { readdir } from "node:fs/promises";

export const commandInfo = makeCommandInfo("packages", "list service folders in the monorepo", {
  relative: {
    description: "list relative paths instead of project root paths",
    kind: "boolean",
    default: false,
    shortName: "r",
  },
});

export async function getServiceFolders(root?: string): Promise<string[]> {
  root ??= await resolveRoot();
  return (
    await readdir(path.resolve(root, "sdk"), {
      withFileTypes: true,
      encoding: "utf-8",
    })
  )
    .filter((ent) => ent.isDirectory())
    .map((ent) => ent.name);
}

export default leafCommand(commandInfo, async ({ relative }) => {
  const cwd = process.cwd();
  const root = await resolveRoot();

  const sdkRelativePath = path.relative(cwd, path.resolve(root, "sdk"));

  // Just read all the directories in the SDK folder
  const sdkDirs = await getServiceFolders(root);

  for (const dir of sdkDirs) {
    if (relative) {
      console.log(path.join(sdkRelativePath, dir) || ".");
    } else {
      console.log(`sdk/${dir}`);
    }
  }

  return true;
});
