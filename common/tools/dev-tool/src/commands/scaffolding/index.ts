// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { subCommand, makeCommandInfo } from "../../framework/command";

export const commandInfo = makeCommandInfo(
  "scaffolding",
  "Creates a new library in the repository"
);

export default subCommand(commandInfo, {
  "template-clone": () => import("./clone-template"),
  "rest-library": () => {
    throw new Error("NYI");
  },
  "convenience-client": () => {
    throw new Error("NYI");
  },
});
