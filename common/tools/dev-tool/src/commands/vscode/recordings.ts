// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { subCommand, makeCommandInfo } from "../../framework/command.ts";

export const commandInfo = makeCommandInfo(
  "recordings",
  "manage test recording visibility in the VS Code Source Control panel",
);

export default subCommand(commandInfo, {
  show: () => import("./showRecordings.ts"),
  hide: () => import("./hideRecordings.ts"),
});
