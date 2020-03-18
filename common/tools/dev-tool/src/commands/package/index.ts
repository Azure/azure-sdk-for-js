// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { subCommand } from "../../util/commandBuilder";

export const commandInfo = {
  name: "package",
  description: "manage SDK packages in the monorepo"
};

export default subCommand(commandInfo, {
  resolve: () => import("./resolve")
});
