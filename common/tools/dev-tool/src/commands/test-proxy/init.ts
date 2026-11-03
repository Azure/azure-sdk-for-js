// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { cwd } from "node:process";
import { leafCommand, makeCommandInfo } from "../../framework/command.ts";
import { resolveProject } from "../../util/resolveProject.ts";
import { createAssetsJson } from "../../util/testProxyUtils.ts";

export const commandInfo = makeCommandInfo(
  "test-proxy",
  "initialize the assets.json file required for the assets-sync mechanism to store recordings",
  {},
);

export default leafCommand(commandInfo, async () => {
  const project = await resolveProject(cwd());

  await createAssetsJson(project);

  return true;
});
