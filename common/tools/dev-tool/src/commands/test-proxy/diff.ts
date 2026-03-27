// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { resolveProject } from "../../util/resolveProject";
import { getRecordingsDiff } from "../../util/testProxyUtils";

export const commandInfo = makeCommandInfo(
  "diff",
  "show what test recordings have changed since the last push/restore",
  {
    stat: {
      kind: "boolean",
      description: "show only a summary of changed files instead of full diffs",
      default: false,
      shortName: "s",
    },
  },
);

export default leafCommand(commandInfo, async (options) => {
  const project = await resolveProject();
  await getRecordingsDiff(project, { stat: options.stat });
  return true;
});
