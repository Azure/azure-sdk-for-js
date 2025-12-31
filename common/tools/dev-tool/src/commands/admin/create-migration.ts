// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import readline from "node:readline";
import { spawnSync } from "node:child_process";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import migrationTemplate, { MigrationTemplate } from "../../templates/migration";
import { createPrinter } from "../../util/printer";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { format } from "../../util/prettier";

const log = createPrinter("create-migration");

export const commandInfo = makeCommandInfo("create-migration", "scaffolds a new migration", {
  name: {
    kind: "string",
    description: "The name of the migration",
    shortName: "n",
  },
  "override-date": {
    kind: "string",
    description: "The date the migration becomes effective (ISO format)",
  },
  description: {
    kind: "string",
    description: "The description of the migration",
    shortName: "d",
  },
  url: {
    kind: "string",
    description: "A URL to more information about the migration",
    shortName: "u",
  },
  open: {
    kind: "boolean",
    description: "Open the migration in VS Code after creation",
    default: false,
  },
});

/**
 * Prompt a user for input.
 *
 * @param prompt - The prompt to display to the user.
 * @returns The user's input.
 */
async function prompt(prompt: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

export default leafCommand(commandInfo, async (options) => {
  log.info("Creating a new migration...");

  // If the user provided an override-date, we need to ensure it's a valid ISO timestamp.
  const date = options["override-date"] ? new Date(options["override-date"]) : new Date();
  if (isNaN(date.getTime())) {
    log.error(`Invalid date: ${options["override-date"]}`);
    return false;
  }

  let id = options.name ?? (await prompt("Migration Id: "));
  let migrationFile = path.resolve(__dirname, "..", "..", "migrations", ...id.split("/")) + ".ts";
  // Need to check that the id is a simple identifier that only contains alphanumeric characters, underscores, dashes, and slashes.
  while (true) {
    let failed = false;
    if (!/^[a-zA-Z0-9_\-/]+$/.test(id)) {
      failed = true;

      log.error(
        "Migration ids must only contain alphanumeric characters, underscores, dashes, and forward slashes.",
      );
    }

    if (existsSync(migrationFile)) {
      failed = true;
      log.error(`Migration '${id}' already exists.`);
    }

    if (failed && options.name) return false;
    if (!failed) break;

    id = await prompt("Migration Id: ");
    migrationFile = path.resolve(__dirname, "..", "..", "migrations", ...id.split("/")) + ".ts";
  }

  let description = options.description ?? (await prompt("Migration description: "));

  while (description === "") {
    log.error("Migration description cannot be empty.");

    if (options.description) {
      return false;
    }

    description = await prompt("Migration description: ");
  }

  let url = options.url ?? (await prompt("Migration URL (optional): "));

  // Prompt for URL until the user enters a valid URL or an empty string.
  while (url !== "") {
    try {
      new URL(url);
      break;
    } catch {
      log.error("Invalid URL. Please enter a valid URL or an empty string (to skip).");
    }

    if (options.url) {
      return false;
    }

    url = await prompt("Migration URL (optional): ");
  }

  const template: MigrationTemplate = {
    id,
    date: date.toISOString(),
    description,
  };

  if (url !== "") {
    template.url = url;
  }

  // Get the instantiated template and write it to the migrations folder.
  const result = migrationTemplate(template);

  const formattedResult = await format(result, "typescript");

  await mkdir(path.dirname(migrationFile), { recursive: true });
  await writeFile(migrationFile, formattedResult);

  log.success(`Migration '${id}' created successfully!`);

  // If the command was created within a VS Code terminal, offer to open the file in the editor.

  if (process.env.TERM_PROGRAM === "vscode") {
    let open = options.open
      ? "y"
      : (await prompt("Open migration in editor? (Y/n): ")).toLowerCase();

    while (open !== "y" && open !== "n" && open !== "") {
      open = await prompt("Unrecognized input. Open migration in editor (Y/n): ");
    }

    if (open === "y" || open === "") {
      const commands = ["code", "code-insiders"];
      for (const command of commands) {
        try {
          const { status } = spawnSync(command, [migrationFile], {
            shell: true,
          });

          if (status === 0) {
            log.info(`Migration opened in '${command}'.`);
            return true;
          } else {
            continue;
          }
        } catch {
          continue;
        }
      }

      log.warn(
        `Failed to open migration using one of the following commands: ${commands.join(", ")}`,
      );
    }
  } else if (options.open) {
    log.warn(
      "Cannot detect VS Code. Skipping opening migration even though '--open' was specified.",
    );
  }

  return true;
});
