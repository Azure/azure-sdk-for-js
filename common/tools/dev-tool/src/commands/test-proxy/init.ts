// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { cwd } from "node:process";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { resolveProject } from "../../util/resolveProject";
import { createAssetsJson } from "../../util/testProxyUtils";

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
