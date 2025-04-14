// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import path from "node:path";
import { resolveProject } from "../../util/resolveProject";
import { createPrinter } from "../../util/printer";
import { leafCommand } from "../../framework/command";
import { makeCommandInfo } from "../../framework/command";
import { customize } from "../../util/customization/customize";

const log = createPrinter("apply-customization");

export const commandInfo = makeCommandInfo("apply", "applies customizations to the SDK", {
  sourceDirectory: {
    shortName: "s",
    kind: "string",
    default: "sources/generated",
    description: "directory containing the files to be customized. Relative to project root",
  },
  customDirectory: {
    shortName: "c",
    kind: "string",
    default: "sources/customizations",
    description:
      "directory containing the customization files to be applied. Relative to project root.",
  },
  targetDirectory: {
    shortName: "t",
    kind: "string",
    default: "src",
    description:
      "directory to which the customized output will be written. Relative to project root",
  },
});

export default leafCommand(commandInfo, async (options) => {
  const info = await resolveProject(process.cwd());
  const sourceDirectory = path.join(info.path, options.sourceDirectory);
  const customDirectory = path.join(info.path, options.customDirectory);
  const targetDirectory = path.join(info.path, options.targetDirectory);
  log(`Applying customizations:
            from '${customDirectory}' 
            to '${sourceDirectory}'
            writing to ${targetDirectory}.`);
  await customize(sourceDirectory, customDirectory, targetDirectory);
  return true;
});
