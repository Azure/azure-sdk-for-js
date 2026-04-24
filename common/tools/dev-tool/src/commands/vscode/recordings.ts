// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { subCommand, makeCommandInfo } from "../../framework/command";

export const commandInfo = makeCommandInfo(
  "recordings",
  "manage test recording visibility in the VS Code Source Control panel",
);

export default subCommand(commandInfo, {
  show: () => import("./showRecordings"),
  hide: () => import("./hideRecordings"),
});
