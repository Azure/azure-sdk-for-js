// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { makeCommandInfo } from "../../framework/command.ts";
import { createPrinter } from "../../util/printer.ts";
import { commandInfo as applyCommandInfo } from "./apply.ts";

const log = createPrinter("apply-v2");

export const commandInfo = makeCommandInfo(
  "apply-v2",
  "applies existing customizations to new generated code (deprecated, use 'apply' instead)",
  applyCommandInfo.options,
);

const command = async (...args: string[]): Promise<boolean> => {
  log(
    "⚠️  'dev-tool customization apply-v2' is deprecated and will be removed soon. Use 'dev-tool customization apply' instead.",
  );
  const applyCommand = (await import("./apply.ts")).default;
  return applyCommand(...args);
};

export default command;
