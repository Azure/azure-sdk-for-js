// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import path from "path";

import { resolveProject } from "../../util/resolveProject";
import { createPrinter } from "../../util/printer";
import { leafCommand } from "../../framework/command";
import { makeCommandInfo } from "../../framework/command";

import { ensureDir, copy, readdir, stat as fsStat, rm, unlink } from "fs-extra";
import { prompt } from "../../util/prompt";

const log = createPrinter("initialize-customization");

export const commandInfo = makeCommandInfo(
  "init",
  "prepares the project for the customization tool",
  {
    generatedDirectory: {
      shortName: "i",
      kind: "string",
      default: "generated",
      description: "directory containing the generated files. Relative to project root",
    },
    srcDirectory: {
      shortName: "src",
      kind: "string",
      default: "src/",
      description: "directory containing the customized files. Relative to project root.",
    },
  },
);

export default leafCommand(commandInfo, async (options) => {
  const info = await resolveProject(process.cwd());
  const srcDirectory = path.join(info.path, options.srcDirectory);
  const generatedDirectory = path.join(info.path, options.generatedDirectory);
  log(`Initializing project for customizations`);

  await ensureDir(srcDirectory);

  const srcContents = await readdir(srcDirectory);

  if (srcContents.length > 0) {
    const answer = await prompt(
      `Warning: src directory is not empty. This command will overwrite all files in the src directory. Continue? (Y/n) [default: N]`,
    );

    // Assuming the default to 'N' if no input is provided
    const input = answer.trim().toUpperCase() || "N";

    if (input === "Y") {
      log.info("Proceeding with overwrite...");
      await deleteDirectoryContents(srcDirectory);
    } else {
      log.info("Operation cancelled.");
      return true;
    }
  }

  log.info("Copying everything from generated into the source folder.");
  await copy(generatedDirectory, srcDirectory);
  return true;
});

async function deleteDirectoryContents(directoryPath: string): void {
  try {
    // Read all the files in the directory
    const files = await readdir(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stat = await fsStat(filePath);

      if (stat.isDirectory()) {
        // Recursively delete directory and its contents
        await rm(filePath, { recursive: true, force: true });
      } else {
        // Delete file
        await unlink(filePath);
      }
    }

    log.info("Directory contents deleted successfully.");
  } catch (err) {
    log.error("Failed to delete the directory contents:", err);
  }
}
