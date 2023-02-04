// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { runMigrationScript } from "../../util/testProxyUtils";

export const commandInfo = makeCommandInfo(
  "test-proxy",
  "migrate the recordings in the current directory to the asset sync tool",
  {
    "initial-push": {
      kind: "boolean",
      description:
        "whether to push the recordings to the assets repo immediately. Used when initially migrating a package to asset sync.",
      default: false,
      shortName: "i",
    },
  }
);

export default leafCommand(commandInfo, async (options) => {
  await runMigrationScript(options["initial-push"]);
  return true;
});
