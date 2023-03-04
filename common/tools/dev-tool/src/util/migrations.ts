// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { mkdirp, readFile, rm, stat, Stats, writeFile } from "fs-extra";
import { userInfo } from "os";
import path from "path";
import { findMatchingFiles } from "./findMatchingFiles";
import { createPrinter } from "./printer";
import { ProjectInfo } from "./resolveProject";

const { debug } = createPrinter("util/migrations");

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
   * @param project - the package's ProjectInfo
   */
  execution?: (project: ProjectInfo) => Promise<void>;
  /**
   * An (optional) method that validates this migration. If this function does not throw an error, then the migration is
   * assumed to have been successful.
   *
   * If this function is not defined, the user will be asked to validate the migration manually.
   *
   * @param project - the package's ProjectInfo
   */
  validation?: (project: ProjectInfo) => Promise<void>;
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
  options: Omit<Migration, "id" | "date" | "description"> = {}
): Migration {
  if (MIGRATIONS_BY_ID.has(id)) throw new Error(`A migration with id '${id}' already exists.`);
  let migration: Migration;
  MIGRATIONS.push(
    (migration = Object.freeze({
      id,
      date: new Date(date),
      description,
      ...options,
    }))
  );

  SORTED = false;

  MIGRATIONS_BY_ID.set(id, migration);

  return migration;
}

function getSortedMigrations(): readonly Migration[] {
  if (!SORTED) {
    MIGRATIONS.sort((m1, m2) => (m1.date < m2.date ? -1 : 1));
  }

  return MIGRATIONS;
}

export function* getPendingMigrations(date: Date): Iterable<Migration> {
  // TODO: binary search if this gets large
  for (const m of getSortedMigrations()) {
    if (m.date > date) yield m;
  }
}

export function* getAppliedMigrations(date: Date): Iterable<Migration> {
  const migrations = getSortedMigrations();
  if (migrations.length === 0) return;

  let idx = 0;
  let m: Migration;
  while ((m = migrations[idx]) && m.date <= date) {
    yield m;
    idx += 1;
  }
}

export function getMigrationById(id: string): Migration | undefined {
  return MIGRATIONS_BY_ID.get(id);
}

let LOADED = false;
let _loadJob: Promise<void>;
export function loadMigrations() {
  if (LOADED) return Promise.resolve();

  return (_loadJob ??= (async function () {
    for await (const f of findMatchingFiles(
      path.resolve(__dirname, "..", "migrations"),
      (fn) => fn.endsWith(".ts") && !fn.endsWith(".d.ts")
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
}

const STATE_PATH_SUFFIX = ["azsdk-dev-tool", "state", "migration-suspended"];

let _stateFile: string;
/**
 * @returns the OS-appropriate file path where a migration state file may be stored
 */
function getStateFilePath(): string {
  return (_stateFile ??= _getStateFilePath());
}

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
          ...STATE_PATH_SUFFIX
        );
      }
    }
    case "linux": {
      let base =
        process.env.XDG_STATE_HOME ??
        path.join(
          process.env.HOME ?? `/home/${process.env.USER ?? userInfo().username}/`,
          ".local",
          "state"
        );

      debug("Computed Linux XDG state directory:", base);

      return path.join(base, ...STATE_PATH_SUFFIX);
    }

    case "darwin": {
      const stateFile = path.join(
        process.env.HOME ?? userInfo().homedir,
        "Application Support",
        ...STATE_PATH_SUFFIX
      );

      debug("macOS state file path:", stateFile);

      return stateFile;
    }
    default:
      throw new Error(
        `Unsupported platform '${process.platform}' (don't know where to put the migration state file)`
      );
  }
}

export async function isMigrationSuspended(
  stateFile: string = getStateFilePath()
): Promise<boolean> {
  let stats: Stats;
  try {
    stats = await stat(stateFile);
  } catch {
    return false;
  }

  if (!stats.isFile()) throw new Error("dev-tool migration statefile corrupted: not a file");

  return false;
}

export async function removeMigrationStateFile(): Promise<void> {
  const stateFile = getStateFilePath();
  if (!(await isMigrationSuspended(stateFile)))
    throw new Error("dev-tool migration state file does not exist");

  await rm(stateFile);
}

export async function suspendMigration(id: string, project: ProjectInfo) {
  const stateFile = getStateFilePath();

  if (await isMigrationSuspended(stateFile)) {
    throw new Error(
      "A migration is already suspended. It must be removed before another migration can be suspended."
    );
  }

  await mkdirp(path.dirname(stateFile));

  await writeFile(
    stateFile,
    JSON.stringify({
      id,
      path: project.path,
    } as SuspendedMigrationState)
  );
}

export async function getSuspendedMigration(): Promise<SuspendedMigrationState | undefined> {
  const stateFile = getStateFilePath();
  if (!(await isMigrationSuspended(stateFile))) return undefined;

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
