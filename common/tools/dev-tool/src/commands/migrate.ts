// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { METADATA_KEY, ProjectInfo, resolveProject, resolveRoot } from "../util/resolveProject";
import { createPrinter } from "../util/printer";
import { leafCommand } from "../framework/command";
import { makeCommandInfo } from "../framework/command";
import { cwd } from "process";
import {
  listAppliedMigrations,
  getMigrationById,
  listPendingMigrations,
  getSuspendedMigration,
  loadMigrations,
  removeMigrationStateFile,
  runMigration,
  SuspendedMigrationState,
  updateMigrationDate,
  validateResumedMigration,
  Migration,
  MigrationSuspendedExitState,
  MigrationErrorExitState,
} from "../util/migrations";
import * as git from "../util/git";

const log = createPrinter("migrate");

export const commandInfo = makeCommandInfo("migrate", "manage and run code migrations", {
  list: {
    shortName: "l",
    kind: "boolean",
    description: "list pending migrations for the current package",
    default: false,
  },
  "list-applied": {
    kind: "boolean",
    description: "list applied migrations for the current package",
    default: false,
  },
  continue: {
    kind: "boolean",
    default: false,
    description: "continue a suspended migration",
  },
  abort: {
    kind: "boolean",
    default: false,
    description: "abort a suspended migration",
  },
  has: {
    kind: "string",
    description:
      "returns true (exit 0) if the current package has applied the given migration (or all given migrations if specified multiple times)",
    allowMultiple: true,
  },
});

export default leafCommand(commandInfo, async (options) => {
  let subModes = [
    options.abort,
    options.continue,
    options["list-applied"],
    options.list,
    options.has,
  ];

  const project = await resolveProject(cwd());

  // Initialize the migration system. We do this here to avoid loading potentially large amounts of modules when not
  // interacting with migrations.
  await loadMigrations();

  // We'll just default the date to Jan 1, 1970 because it's convenient to work with an always-defined date.
  const migrationDate = new Date(
    project.packageJson[METADATA_KEY].migrationDate ?? "1970-01-01T00:00:00Z"
  );

  // Bare command with no sub-mode arguments.
  if (subModes.every((m) => !m)) {
    return await startMigrationPass(project, migrationDate);
  }
  // Too many modes
  else if ((subModes = subModes.filter((m) => !!m)).length > 1) {
    log.error("Only one of `--list`, `--abort`, `--continue`, and `--has` may be specified.");
    return false;
  } else {
    // Handle submodes
    if (!!options.list) {
      for (const m of listPendingMigrations(migrationDate)) {
        // TODO: create a migration formatter that displays good info.
        log.info(m.id);
      }

      return true;
    } else if (!!options["list-applied"]) {
      for (const m of listAppliedMigrations(migrationDate)) {
        // TODO: create a migration formatter that displays good info.
        log.info(m.id);
      }

      return true;
    } else if (!!options.has) {
      try {
        process.exit(areMigrationsApplied(options.has, migrationDate) ? 0 : 1);
      } catch ({ message }) {
        log.error(message);
        return false;
      }
    } else if (!!options.abort) {
      return await abortMigration(project);
    } else if (!!options.continue) {
      return await continueMigration(project);
    } else {
      throw new Error("Unreachable state: no migration submode reached.");
    }
  }
});

/**
 * Checks if a list of migrations are considered applied relative to a given date.
 *
 * Throws an error lazily if any migration IDs are unknown.
 *
 * @param migrationIds - the migration IDs to check
 * @param migrationDate - the date to check against
 * @returns true if all the migrations have been applied, false otherwise
 */
function areMigrationsApplied(migrationIds: string[], migrationDate: Date): boolean {
  // Resolve each of the migrations listed and return true if all of them are applied.
  let result = true;
  const unknownMigrations: string[] = [];

  for (const id of migrationIds) {
    const migration = getMigrationById(id);

    if (!migration) {
      unknownMigrations.push(id);
    } else {
      result &&= migration.date <= migrationDate;
    }
  }

  if (unknownMigrations.length) {
    throw new Error(
      `Unknown migration ID(s): ${unknownMigrations.map((id) => `'${id}'`).join(", ")}`
    );
  }

  return result;
}

async function startMigrationPass(project: ProjectInfo, migrationDate: Date): Promise<boolean> {
  const suspended = await getSuspendedMigration();
  if (suspended) {
    if (suspended.path !== project.path) {
      const otherPackage = await resolveProject(suspended.path);
      log.error(`A migration is suspended in package '${otherPackage.name}'.`);
    } else {
      log.error(`Migration '${suspended.id}' is currently suspended.`);
      log.error(
        "Run `dev-tool migrate --continue` to resume it if you have resolved its outstanding issues."
      );
    }
    return false;
  }

  // Check fof a git diff. We refuse to start a new pass if there is a diff.
  if (!process.env.DEV_TOOL_UNSAFE_FORCE && (await git.hasDiff(await resolveRoot()))) {
    log.error("Refusing to run a migration on a dirty work tree.");
    log.error("Commit or stash your changes, then run `dev-tool migrate` again.");
    return false;
  }

  const pending = [...listPendingMigrations(migrationDate)];

  if (pending.length === 0) {
    log.info("Package is up to date. Nothing to do!");
    return true;
  }

  log.info(`Starting migration pass for '${project.name}'.`);
  log.info(`Last migration: ${project.packageJson[METADATA_KEY].migrationDate ?? "never"}`);

  return runMigrations(pending, project);
}

async function runMigrations(pending: Migration[], project: ProjectInfo) {
  for (const migration of pending) {
    log.info(`Applying migration '${migration.id}' (${migration.date.toLocaleDateString()})`);
    log.info(`  - Description: ${migration.description}`);

    const status = await runMigration(project, migration);

    switch (status.kind) {
      case "success": {
        await onMigrationSuccess(project, migration);
        continue;
      }
      case "suspended": {
        printMigrationSuspendedWarning(migration, status);
        return true;
      }
      case "error": {
        printMigrationError(migration, status);
        return false;
      }
    }
  }

  log.success("All migrations applied successfully.");

  return true;
}

async function onMigrationSuccess(project: ProjectInfo, migration: Migration) {
  await updateMigrationDate(project, migration);

  git.commitAll(`dev-tool: applied migration '${migration.id}'`);

  log.success(`Migration '${migration.id}' applied successfully.`);
}

function printMigrationError(migration: Migration, status: MigrationErrorExitState) {
  log.error(`Encountered an error running migration: '${migration.id}'.`);
  log.error("Stack trace:", status.error.stack);
  log.error(
    "The migration pass has been suspended. The failed migration terminated in an unexpected way and may have damaged the working tree."
  );
  log.error(
    "Errors must be fixed and the migration must be performed _MANUALLY_. To abort the migration, run `dev-tool migrate --abort`."
  );
  log.error(
    "If you have migrated the package manually, and you are sure that the migration is correct, you can continue using `dev-tool migrate --continue`."
  );
}

function printMigrationSuspendedWarning(migration: Migration, status: MigrationSuspendedExitState) {
  log.warn(`'${migration.id}' suspended during ${status.phase}.`);
  log.warn("  Description: ", migration.description);

  if (status.phase === "execution") {
    log.warn("This migration requires manual intervention. It cannot be performed automatically.");
    log.warn(
      "Check the state of the current package and ensure that it has been migrated as appropriate."
    );
    log.warn(
      "When you are sure that the package has been migrated correctly, run `dev-tool migrate --continue`."
    );
  } else if (migration.validation) {
    // Automated validation failed
    log.warn("The automated validation for this migration failed:", status.reason);
    log.warn(
      "Manually correct the migration results and then run `dev-tool migrate --continue` to run the validation again."
    );
  } else {
    // No validation
    log.warn("This migration was automatically executed, but cannot be automatically validated.");
    log.warn(
      "Manually check the migration results and then run `dev-tool migrate --continue` when you are sure they are correct to continue."
    );
  }

  if (migration.url) {
    log.warn(
      "You will find helpful information for this migration at the following URL:",
      migration.url
    );
  }
}

/**
 * Aborts a suspended migration.
 *
 * @param project - the working project
 * @returns true on success, otherwise false
 */
async function abortMigration(project: ProjectInfo): Promise<boolean> {
  const suspendedMigration = await validateSuspendedState(project);
  if (!suspendedMigration) return false;

  await removeMigrationStateFile();

  log.warn(
    `Suspended migration '${suspendedMigration.id}' was aborted. The working tree may be dirty.`
  );

  return true;
}

/**
 * Continues a suspended migration, resuming the migration pass afterwords.
 * @param project - the working project
 * @returns true on success, otherwise false
 */
async function continueMigration(project: ProjectInfo): Promise<boolean> {
  const suspendedMigration = await validateSuspendedState(project);
  if (!suspendedMigration) return false;

  // TODO: load migration, and if successful resume migration
  const migration = getMigrationById(suspendedMigration.id);

  if (!migration)
    throw new Error(`unreachable: suspended migration '${suspendedMigration.id}' is unknown`);

  const state = await validateResumedMigration(project, migration);

  log.info(`Resuming migration from '${migration.id}' (${migration.date.toLocaleDateString()})`);

  switch (state.kind) {
    case "success": {
      await onMigrationSuccess(project, migration);

      const pending = [...listPendingMigrations(migration.date)];

      if (pending.length === 0) {
        log.info("No more migrations to apply. Migration pass complete.");
        return true;
      } else {
        log.info(`Continuing migration pass for '${project.name}'.`);
      }

      return runMigrations(pending, project);
    }
    case "suspended": {
      printMigrationSuspendedWarning(migration, state);

      return true;
    }
    case "error": {
      printMigrationError(migration, state);
      return false;
    }
    default:
      const __exhaust: never = state;
      throw new Error(`unreachable: ${__exhaust}`);
  }
}

async function validateSuspendedState(
  project: ProjectInfo
): Promise<SuspendedMigrationState | undefined> {
  const suspended = await getSuspendedMigration();
  if (!suspended) {
    log.error("No migration is currently suspended");
    return undefined;
  } else if (suspended.path !== project.path) {
    const otherProject = await resolveProject(suspended.path);
    log.error(
      `A migration is suspended for package '${otherProject.name}', but this command is running in '${project.name}'.`
    );
    return undefined;
  }

  return suspended;
}
