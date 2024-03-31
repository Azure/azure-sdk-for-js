// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { METADATA_KEY, ProjectInfo, resolveProject, resolveRoot } from "../util/resolveProject";
import { createPrinter } from "../util/printer";
import { leafCommand } from "../framework/command";
import { makeCommandInfo } from "../framework/command";
import { cwd } from "node:process";
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
  isApplied,
  MigrationExitState,
} from "../util/migrations";
import * as git from "../util/git";
import { panic, unreachable } from "../util/assert";

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
  quiet: {
    kind: "boolean",
    description: "reduce output verbosity",
    default: false,
    alias: "q",
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
    project.packageJson[METADATA_KEY]?.migrationDate ?? "1970-01-01T00:00:00Z",
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
    if (options.list) {
      printMigrations(listPendingMigrations(migrationDate), options.quiet);

      return true;
    } else if (options["list-applied"]) {
      printMigrations(listAppliedMigrations(migrationDate), options.quiet);

      return true;
    } else if (options.has) {
      try {
        process.exit(areMigrationsApplied(options.has, migrationDate, options.quiet) ? 0 : 1);
      } catch (e) {
        log.error((e as Error).message);
        return false;
      }
    } else if (options.abort) {
      return await abortMigration(project);
    } else if (options.continue) {
      return await continueMigration(project);
    } else {
      throw new Error("Unreachable state: no migration submode reached.");
    }
  }
});

/**
 * Prints a list of migrations to the console.
 * @param migrations - the migrations to print
 * @param quiet - whether to print the full migration information or just the IDs
 */
function printMigrations(migrations: Iterable<Migration>, quiet: boolean): void {
  if (quiet) {
    for (const m of migrations) {
      log.info(m.id);
    }
  } else {
    for (const m of migrations) {
      const automation =
        m.execute && m.validate
          ? "both"
          : m.execute
            ? "execution"
            : m.validate
              ? "validation"
              : "none";

      log.info(`${m.id} - ${m.description}`);
      log.info(`  Date: ${m.date.toLocaleDateString()}`);

      if (m.url) log.info(`  URL: ${m.url}`);

      log.info(`  Automation: ${automation}`);
    }
  }
}

/**
 * Checks if a list of migrations are considered applied relative to a given date.
 *
 * Throws an error lazily if any migration IDs are unknown.
 *
 * @param migrationIds - the migration IDs to check
 * @param migrationDate - the date to check against
 * @param quiet - whether to print migration information
 * @returns true if all the migrations have been applied, false otherwise
 */
function areMigrationsApplied(
  migrationIds: string[],
  migrationDate: Date,
  quiet: boolean,
): boolean {
  // Resolve each of the migrations listed and return true if all of them are applied.
  let result = true;
  const unknownMigrations: string[] = [];

  for (const id of migrationIds) {
    const migration = getMigrationById(id);

    if (!migration) {
      unknownMigrations.push(id);
    } else {
      const applied = isApplied(migration, migrationDate);
      if (!quiet) {
        log.info(`${id} - ${applied ? "applied" : "not applied"}`);
      }
      result &&= applied;
    }
  }

  if (unknownMigrations.length) {
    throw new Error(
      `Unknown migration ID(s): ${unknownMigrations.map((id) => `'${id}'`).join(", ")}`,
    );
  }

  return result;
}

/**
 * A record containing information about an attempted migration.
 */
export interface MigrationReport {
  /**
   * The migration that was attempted.
   */
  migration: Migration;
  /**
   * The exit state of the migration.
   */
  exitState: MigrationExitState;
}

/**
 * Begins an unattended migration pass.
 *
 * This will run all pending migrations without user interaction. If any migration fails, the migration state will be aborted and the last
 * exit state will be returned. Otherwise a successful state will be returned indicating that the whole pass completed successfully.
 *
 * @param projectPath - the path to the project to run the migrations on
 * @returns a migration exit state indicating the state of the last attempted migration
 */
export async function runUnattendedMigrationPass(projectPath: string): Promise<MigrationReport[]> {
  const project = await resolveProject(projectPath);

  // Initialize the migration system. We do this here to avoid loading potentially large amounts of modules when not
  // interacting with migrations.

  await loadMigrations();

  // We'll just default the date to Jan 1, 1970 because it's convenient to work with an always-defined date.
  const migrationDate = new Date(
    project.packageJson[METADATA_KEY]?.migrationDate ?? "1970-01-01T00:00:00Z",
  );

  // Check for a suspended migration.
  const suspended = await getSuspendedMigration();
  if (suspended) {
    log.error(`Migration '${suspended.id}' is currently suspended in package '${suspended.path}'.`);
    throw new Error("Cannot run unattended migrations while a migration is currently suspended.");
  }

  const output = [];

  for (const migration of listPendingMigrations(migrationDate)) {
    const exitState = await runMigration(project, migration);

    output.push({ migration, exitState });

    switch (exitState.kind) {
      case "success":
        await onMigrationSuccess(project, migration, /* quiet */ true);
        break;
      case "skipped":
        await onMigrationSkipped(project, migration, /* quiet */ true);
        break;
      default:
        await abortMigration(project, /* quiet */ true);
        return output;
    }
  }

  return output;
}

/**
 * Begins a new migration pass.
 *
 * @param project - the project to run the migrations on
 * @param migrationDate - the date to compare the migrations against (MUST match the date in the package.json)
 * @returns true if the migration pass exited normally, false otherwise
 */
async function startMigrationPass(project: ProjectInfo, migrationDate: Date): Promise<boolean> {
  const suspended = await getSuspendedMigration();
  if (suspended) {
    if (suspended.path !== project.path) {
      const otherPackage = await resolveProject(suspended.path);
      log.error(`A migration is suspended in package '${otherPackage.name}'.`);
    } else {
      log.error(`Migration '${suspended.id}' is currently suspended.`);
      log.error(
        "Run `dev-tool migrate --continue` to resume it if you have resolved its outstanding issues.",
      );
    }
    return false;
  }

  // Check for a git diff. We refuse to start a new pass if there is a diff.
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
  log.info(`Last migration: ${project.packageJson[METADATA_KEY]?.migrationDate ?? "never"}`);

  return runMigrations(pending, project);
}

/**
 * Runs a list of migrations on a project.
 *
 * @param pending - the list of pending migrations to run
 * @param project - the project to run the migrations on
 * @returns true if all migrations succeeded, false otherwise
 */
async function runMigrations(pending: Migration[], project: ProjectInfo): Promise<boolean> {
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
      case "skipped": {
        await onMigrationSkipped(project, migration);
        continue;
      }
      default:
        unreachable(status);
    }
  }

  log.success("All migrations applied successfully.");

  return true;
}

// #region Migration state hooks

/**
 * Updates the repo state after a migration has succeeded. This includes updating the migration date in the package.json
 * and committing the changes.
 *
 * @param project - the project to apply the migration succeeded state to
 * @param migration - the migration that succeeded
 */
async function onMigrationSuccess(
  project: ProjectInfo,
  migration: Migration,
  quiet: boolean = false, // eslint-disable-line @typescript-eslint/no-inferrable-types
): Promise<void> {
  await updateMigrationDate(project, migration);

  await git.commitAll(`${project.name}: applied migration '${migration.id}'`);

  !quiet && log.success(`Migration '${migration.id}' applied successfully.`);
}

/**
 * Updates the repo after a migration was skipped. This includes updating the migration date in the package.json and
 * making a ceremonial commit (even though only the migration date will have changed).
 */
async function onMigrationSkipped(
  project: ProjectInfo,
  migration: Migration,
  quiet: boolean = false, // eslint-disable-line @typescript-eslint/no-inferrable-types
): Promise<void> {
  await updateMigrationDate(project, migration);

  await git.commitAll(`${project.name}: skipped migration '${migration.id}'`);

  !quiet && log.info(`Skipped migration '${migration.id}'. This package is not eligible.`);
}

/**
 * Prints an error message about a migration that failed.
 *
 * @param migration - the migration that failed
 * @param status - the exit state of the migration
 */
function printMigrationError(migration: Migration, status: MigrationErrorExitState) {
  log.error(`Encountered an error running migration: '${migration.id}'.`);
  log.error("Stack trace:", status.error.stack);
  log.error(
    "The migration pass has been suspended. The failed migration terminated in an unexpected way and may have damaged the working tree.",
  );
  log.error(
    "Errors must be fixed and the migration must be performed _MANUALLY_. To abort the migration, run `dev-tool migrate --abort`.",
  );
  log.error(
    "If you have migrated the package manually, and you are sure that the migration is correct, you can continue using `dev-tool migrate --continue`.",
  );
}

/**
 * Prints a warning about a migration that was suspended.
 *
 * @param migration - the migration that was suspended
 * @param status - the exit state of the migration
 */
function printMigrationSuspendedWarning(migration: Migration, status: MigrationSuspendedExitState) {
  log.warn(`'${migration.id}' suspended during ${status.phase}.`);
  log.warn("  Description: ", migration.description);

  if (status.phase === "execution") {
    log.warn("This migration requires manual intervention. It cannot be performed automatically.");
    log.warn(
      "Check the state of the current package and ensure that it has been migrated as appropriate.",
    );
    log.warn(
      "When you are sure that the package has been migrated correctly, run `dev-tool migrate --continue`.",
    );
  } else if (migration.validate) {
    // Automated validation failed
    log.warn("The automated validation for this migration failed:", status.reason);
    log.warn(
      "Manually correct the migration results and then run `dev-tool migrate --continue` to run the validation again.",
    );
  } else {
    // No validation
    log.warn("This migration was automatically executed, but cannot be automatically validated.");
    log.warn(
      "Manually check the migration results and then run `dev-tool migrate --continue` when you are sure they are correct to continue.",
    );
  }

  if (migration.url) {
    log.warn(
      "You will find helpful information for this migration at the following URL:",
      migration.url,
    );
  }
}

// #endregion

/**
 * Aborts a suspended migration.
 *
 * @param project - the working project
 * @returns true on success, otherwise false
 */
async function abortMigration(
  project: ProjectInfo,
  quiet: boolean = false, // eslint-disable-line @typescript-eslint/no-inferrable-types
): Promise<boolean> {
  const suspendedMigration = await validateSuspendedState(project);
  if (!suspendedMigration) return false;

  await removeMigrationStateFile();

  !quiet &&
    log.warn(
      `Suspended migration '${suspendedMigration.id}' was aborted. The working tree may be dirty.`,
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

  const migration = getMigrationById(suspendedMigration.id);

  if (!migration) panic(`unreachable: suspended migration '${suspendedMigration.id}' is unknown`);

  log.info(`Resuming migration from '${migration.id}' (${migration.date.toLocaleDateString()})`);

  let state: MigrationExitState;
  if (suspendedMigration.phase === "execute") {
    state = await runMigration(project, migration);
  } else {
    state = await validateResumedMigration(project, migration);
  }

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
    case "skipped":
      panic("unreachable: resumed migration should not be skipped");
    // panic() calls process.exit
    // eslint-disable-next-line no-fallthrough
    default:
      unreachable(state);
  }
}

/**
 * Validates that a migration can be resumed in the context of the current project.
 *
 * @param project - the working project
 * @returns the suspended migration state, or undefined if no migration is suspended
 */
async function validateSuspendedState(
  project: ProjectInfo,
): Promise<SuspendedMigrationState | undefined> {
  const suspended = await getSuspendedMigration();
  if (!suspended) {
    log.error("No migration is currently suspended");
    return undefined;
  } else if (suspended.path !== project.path) {
    const otherProject = await resolveProject(suspended.path);
    log.error(
      `A migration is suspended for package '${otherProject.name}', but this command is running in '${project.name}'.`,
    );
    return undefined;
  }

  return suspended;
}
