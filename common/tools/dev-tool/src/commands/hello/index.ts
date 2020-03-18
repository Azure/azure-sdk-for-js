// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { subCommand } from "../../util/commandBuilder";

export const commandInfo = {
  name: "hello",
  description: "commands for printing some lovely messages"
};

export default subCommand(commandInfo, {
  world: () => import("./world")
});
