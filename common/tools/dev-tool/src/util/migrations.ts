// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import type { Stats } from "node:fs";
import { userInfo } from "node:os";
import path from "node:path";
import { panic } from "./assert";
import { findMatchingFiles } from "./findMatchingFiles";
import { createPrinter, Printer } from "./printer";
import { METADATA_KEY, ProjectInfo } from "./resolveProject";
import { format } from "./prettier";

const { debug } = createPrinter("util/migrations");

/**
 * The context in which a migration runs.
 */
export interface MigrationContext {
  project: ProjectInfo;
  logger: Printer;
}

/**
 * A migration within the Azure SDK for JS migration system.
 */
export interface Migration {
  /**
   * The unique identifier of this migration.
   */
  id: string;

  /**
   * The effective date of this migration.
   */
  date: Date;

  /**
   * A short description of this migration's purpose.
   */
  description: string;

  /**
   * An (optional) URL to a page that explains the migration in more detail, such as an RFC or ADR in the Azure SDK for
   * JS repo.
   */
  url?: string;

  /**
   * An (optional) method that fully or partially executes this migration.
   *
   * This function throws an error if it cannot complete successfully. Automatic migrations are assumed to be best-effort
   * and must be manually or automatically validated.
   *
   * Note: If the migration adds untracked files to the project, it should also use the "utils/git" module to add those
   * changes to the git index.
   *
   * @param ctx - the migration's context
   */
  execute?: (ctx: MigrationContext) => Promise<void>;

  /**
   * An (optional) method that validates this migration. If this function does not throw an error, then the migration is
   * assumed to have been successful.
   *
   * If this function is not defined, the user will be asked to validate the migration manually.
   *
   * @param ctx - the migration's context
   */
  validate?: (ctx: MigrationContext) => Promise<void>;

  /**
   * An (optional) method that determines whether or not a project is eligible for this migration.
   *
   * If this function is not defined, the migration will be assumed to be applicable to all projects.
   *
   * This function is run before the preconditions are checked, so it MUST NOT assume that the preconditions are valid.
   *
   * @param ctx - the migration's context
   * @returns true if the migration is applicable to the project, false otherwise.
   */
  isApplicable?: (ctx: MigrationContext) => Promise<boolean>;

  /**
   * An (optional) method that determines whether or not a migration's preconditions are satisfied.
   *
   * If this function is not defined, the migration will be assumed to be ready to run.
   *
   * This function is run after the applicability check, so it may assume that the migration is applicable to the project.
   *
   * @param ctx - the migration's context
   * @returns true if the migration is ready to run, false otherwise.
   */
  checkPreconditions?: (ctx: MigrationContext) => Promise<boolean>;
}

let SORTED = true;
const MIGRATIONS: Migration[] = [];
const MIGRATIONS_BY_ID = new Map<string, Migration>();

/**
 * Adds a migration to the migration tracking system.
 *
 * @param id - the unique id of the migration
 * @param date
 * @param description
 * @param options
 */
export function createMigration(
  id: string,
  date: string,
  description: string,
  options: Omit<Migration, "id" | "date" | "description"> = {},
): Migration {
  if (MIGRATIONS_BY_ID.has(id)) throw new Error(`A migration with id '${id}' already exists.`);
  let migration: Migration;
  MIGRATIONS.push(
    (migration = Object.freeze({
      id,
      date: new Date(date),
      description,
      ...options,
    })),
  );

  // If the date is invalid, we'll throw an error
  if (isNaN(migration.date.getTime())) {
    throw new Error(`Invalid date string '${date}' for migration '${id}'.`);
  }

  SORTED = false;

  MIGRATIONS_BY_ID.set(id, migration);

  return migration;
}

/**
 * Sorts and returns the migrations. If the migrations are already sorted, this function won't sort them again.
 * @internal
 */
function getSortedMigrations(): readonly Migration[] {
  if (!SORTED) {
    MIGRATIONS.sort((m1, m2) => (m1.date < m2.date ? -1 : 1));
    SORTED = true;
  }

  return MIGRATIONS;
}

/**
 * @param migration - the migration in question
 * @param date - a `migrationDate` to compare to
 * @returns true if the migration is considered 'applied'
 */
export function isPending(migration: Migration, date: Date): boolean {
  return migration.date > date;
}

/**
 * Finds the index of the first migration in a sorted list that is `pending` relative to a `date` using a binary search.
 *
 * @param date - the `migrationDate` to compare against
 * @returns the index of the first pending migration, or the length of the list if all migrations are applied.
 */
function findFirstPendingMigrationIndex(migrations: readonly Migration[], date: Date): number {
  let low = 0;
  let high = migrations.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const m = migrations[mid];

    if (isPending(m, date)) {
      if (mid === 0 || !isPending(migrations[mid - 1], date)) return mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return migrations.length;
}

/**
 * Get an iterable of all migrations that are pending relative to a `date`.
 *
 * @param date - a `migrationDate` to compare against
 */
export function* listPendingMigrations(date: Date): Iterable<Migration> {
  const migrations = getSortedMigrations();
  const firstIndex = findFirstPendingMigrationIndex(migrations, date);

  for (const m of migrations.slice(firstIndex)) {
    if (isPending(m, date)) yield m;
  }
}

/**
 * @param migration - the migration in question
 * @param date - a `migrationDate` to compare to
 * @returns true if the migration is considered 'applied'
 */
export function isApplied(migration: Migration, date: Date): boolean {
  return !isPending(migration, date);
}

/**
 * Get an iterable of all migrations that have been applied relative to a `date`.
 *
 * @param date - a `migrationDate` to compare against
 */
export function* listAppliedMigrations(date: Date): Iterable<Migration> {
  const migrations = getSortedMigrations();

  for (const migration of migrations) {
    if (isApplied(migration, date)) {
      yield migration;
    } else break;
  }
}

/**
 * Gets a migration by its ID. This requires that the migration be registered using `createMigration`.
 *
 * @param id - the ID of the migration to search for.
 * @returns
 */
export function getMigrationById(id: string): Migration | undefined {
  return MIGRATIONS_BY_ID.get(id);
}

let LOADED = false;
let _loadJob: Promise<void> | undefined;
export function loadMigrations() {
  if (LOADED) return Promise.resolve();

  return (_loadJob ??= (async function () {
    for await (const f of findMatchingFiles(
      path.resolve(__dirname, "..", "migrations"),
      (fn) => fn.endsWith(".ts") && !fn.endsWith(".d.ts"),
    )) {
      await import(f);
    }
  })().then(() => {
    LOADED = true;
  }));
}

// #region suspensions

export interface SuspendedMigrationState {
  id: string;
  path: string;
  phase: "execute" | "validate";
}

const STATE_PATH_SUFFIX = ["azsdk-dev-tool", "state", "migration-suspended"];

let _stateFile: string | undefined;

/**
 * Gets the path to the state file. This function is cached and the result will only be computed once.
 *
 * @returns the OS-appropriate file path where a migration state file may be stored
 */
function getStateFilePath(): string {
  return (_stateFile ??= _getStateFilePath());
}

/**
 * Helper for computing the stateFile path.
 * @internal
 */
function _getStateFilePath(): string {
  switch (process.platform) {
    case "win32": {
      if (process.env.LOCALAPPDATA) {
        debug("Windows state file defined by %LOCALAPPDATA%");
        return path.join(process.env.LOCALAPPDATA, ...STATE_PATH_SUFFIX);
      } else {
        debug("LOCALAPPDATA unset, computing it from username");
        return path.join(
          "C:\\Users\\",
          process.env.USERNAME ?? userInfo().username,
          "AppData",
          "Local",
          ...STATE_PATH_SUFFIX,
        );
      }
    }
    case "linux": {
      const base =
        process.env.XDG_STATE_HOME ??
        path.join(
          process.env.HOME ?? `/home/${process.env.USER ?? userInfo().username}/`,
          ".local",
          "state",
        );

      debug("Computed Linux XDG state directory:", base);

      return path.join(base, ...STATE_PATH_SUFFIX);
    }

    case "darwin": {
      const stateFile = path.join(
        process.env.HOME ?? userInfo().homedir,
        "Application Support",
        ...STATE_PATH_SUFFIX,
      );

      debug("macOS state file path:", stateFile);

      return stateFile;
    }
    default:
      throw new Error(
        `Unsupported platform '${process.platform}' (don't know where to put the migration state file)`,
      );
  }
}

/**
 * Determines whether or not any migration is currently suspended.
 *
 * @returns - true if the state file exists, false otherwise
 */
export async function isMigrationSuspended(): Promise<boolean> {
  let stats: Stats;
  try {
    stats = await stat(getStateFilePath());
  } catch {
    return false;
  }

  if (!stats.isFile()) panic("dev-tool migration statefile corrupted: not a file");

  return true;
}

/**
 * Unconditionally deletes the migration state file.
 */
export async function removeMigrationStateFile(): Promise<void> {
  if (!(await isMigrationSuspended()))
    throw new Error("dev-tool migration state file does not exist");

  await rm(getStateFilePath());
}

/**
 * Writes a migration state to the state file.
 * @param migration - the migration to suspend
 * @param project - the project the migration is running in
 */
export async function suspendMigration(
  migration: Migration,
  project: ProjectInfo,
  phase: SuspendedMigrationState["phase"],
) {
  const stateFile = getStateFilePath();

  if (await isMigrationSuspended()) {
    throw new Error(
      "A migration is already suspended. It must be removed before another migration can be suspended.",
    );
  }

  await mkdir(path.dirname(stateFile), { recursive: true });

  await writeFile(
    stateFile,
    JSON.stringify({
      id: migration.id,
      path: project.path,
      phase,
    } as SuspendedMigrationState),
  );
}

/**
 * Reads the migration state file and parses its contents.
 *
 * @returns - the suspended migration state or undefined if none exists
 */
export async function getSuspendedMigration(): Promise<SuspendedMigrationState | undefined> {
  const stateFile = getStateFilePath();
  if (!(await isMigrationSuspended())) return undefined;

  const result = JSON.parse((await readFile(stateFile)).toString("utf-8"));

  if (
    typeof result !== "object" ||
    typeof result.id !== "string" ||
    typeof result.path !== "string"
  ) {
    throw new Error("dev-tool migration statefile corrupted: incorrect structure");
  }

  return result as SuspendedMigrationState;
}

// #endregion

// #region execution

export type MigrationExitState =
  | MigrationSuspendedExitState
  | MigrationErrorExitState
  | MigrationSuccessExitState
  | MigrationSkippedExitState;

/**
 * The state of a migration that suspends normally. This can happen because:
 *
 * - The migration has no `execution`, so it is suspended to allow the user to manually migrate the package.
 * - The migration DOES have an `execution`, but no `validation`, so it is suspended to allow the user to manually
 *   validate an automated migration.
 * - The migration has no `execution`, was already suspended, and was continued but the automated `validation` failed.
 *   The migration is then suspended to allow the user to correct the migration.
 * - The migration has both an execution and a validation, but the validation simply fails.
 */
export interface MigrationSuspendedExitState {
  kind: "suspended";
  phase: "execution" | "validation";
  reason: string;
}

/**
 * The state of a migration that exited due to an unrecoverable error. For example, if the `execution` function of a
 * migration throws an error. Such failures may leave the working tree in a dirty or corrupt state. The migration is
 * ultimately suspended, and the user is expected to either abort the migration or clean it up.
 */
export interface MigrationErrorExitState {
  kind: "error";
  error: Error;
}

/**
 * The state of a migration that exited successfully.
 */
export interface MigrationSuccessExitState {
  kind: "success";
}

/**
 * The state of a migration that was skipped.
 */
export interface MigrationSkippedExitState {
  kind: "skipped";
}

/**
 * Executes a pending migration.
 *
 * @param project - the working project
 * @param migration - the migration object
 * @returns the state of the migration at exit
 */
export async function runMigration(
  project: ProjectInfo,
  migration: Migration,
): Promise<MigrationExitState> {
  const context: MigrationContext = {
    project,
    logger: createPrinter(`migration:${migration.id}`),
  };

  // First, check if the migration is applicable to the project. If not, we return a skipped status.
  if (migration.isApplicable && !(await migration.isApplicable(context))) {
    return {
      kind: "skipped",
    };
  }

  // Next, check the preconditions. If this function returns false, we suspend the migration.
  try {
    if (migration.checkPreconditions && !(await migration.checkPreconditions(context))) {
      await suspendMigration(migration, project, "execute");
      return {
        kind: "suspended",
        phase: "execution",
        reason: "preconditions not met",
      };
    }
  } catch (e) {
    await suspendMigration(migration, project, "execute");
    return {
      kind: "error",
      error: e as Error,
    };
  }

  if (migration.execute) {
    // Migration has automation.
    try {
      await migration.execute(context);
    } catch (e) {
      // Execution failed, need to suspend to allow the user to correct it.
      await suspendMigration(migration, project, "validate");
      return {
        kind: "error",
        error: e as Error,
      };
    }
  } else {
    // No automated execution, so suspend and return to the user.
    await suspendMigration(migration, project, "validate");
    return {
      kind: "suspended",
      phase: "execution",
      reason: "requires manual intervention",
    };
  }

  if (migration.validate) {
    try {
      await migration.validate(context);
      // Migration validated
      return {
        kind: "success",
      };
    } catch (e) {
      // Migration failed. We pass this back up the chain as an error rather than a suspension because if we made it here,
      // then the migration was automated. An automated migration is not expected to fail validation.
      await suspendMigration(migration, project, "validate");
      return {
        kind: "suspended",
        phase: "validation",
        reason: `validation of automated migration failed: ${(e as Error).message}`,
      };
    }
  } else {
    // If we made it here, we know the `execution` was automated. Otherwise We would have resumed from `validateResumed`.
    // We need to suspend and allow the user to validate the automated validation.
    await suspendMigration(migration, project, "validate");
    return {
      kind: "suspended",
      phase: "validation",
      reason: "requires manual validation",
    };
  }
}

/**
 * Validates a resumed migration, returning an exit status.
 *
 * @param project - the working project
 * @param migration - the migration to run
 * @returns the exit state
 */
export async function validateResumedMigration(
  project: ProjectInfo,
  migration: Migration,
): Promise<MigrationExitState> {
  const context: MigrationContext = {
    project,
    logger: createPrinter(`migration:${migration.id}`),
  };

  if (!migration.validate) {
    // We assume that if a migration with no `--continue` is resumed, the user has ensured it is done correctly.
    await removeMigrationStateFile();
    return {
      kind: "success",
    };
  } else {
    try {
      await migration.validate(context);
      await removeMigrationStateFile();
      return {
        kind: "success",
      };
    } catch (e) {
      return {
        kind: "suspended",
        phase: "validation",
        reason: `validation failed: ${(e as Error).message}`,
      };
    }
  }
}

/**
 * Updates the migration date of a Project so that it will consider `migration` to be applied.
 *
 * @param project - the project to update
 * @param migration - the applied migration
 */
export async function updateMigrationDate(
  project: ProjectInfo,
  migration: Migration,
): Promise<void> {
  const packageJsonPath = path.join(project.path, "package.json");

  const packageJson = JSON.parse((await readFile(packageJsonPath)).toString("utf-8"));

  // Defensively check that the current date in package.json is undefined or older than the new date.
  if (!packageJson[METADATA_KEY]) {
    packageJson[METADATA_KEY] = {};
  }
  if (
    packageJson[METADATA_KEY].migrationDate &&
    new Date(packageJson[METADATA_KEY].migrationDate) >= migration.date
  ) {
    panic(`${project.name} is being migrated to an older version than the current version.`);
  }

  (packageJson[METADATA_KEY] ??= {}).migrationDate = migration.date.toISOString();

  // Format the file with prettier
  const contents = await format(JSON.stringify(packageJson, null, 2), "json");

  await writeFile(packageJsonPath, contents);
}

// #endregion
