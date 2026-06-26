// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Loading and validation of the central third-party dependency allow-list.
 *
 * The allow-list is a YAML file at the root of the monorepo
 * (`eng/approved-third-party-dependencies.yml`) describing which third-party
 * runtime dependencies `sdk/**` packages are permitted to take. See that file
 * for the schema documentation.
 */

import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

/**
 * Name prefixes that are considered first-party and are always allowed as
 * runtime dependencies without being listed in the allow-list.
 */
export const FIRST_PARTY_PREFIXES = [
  "@azure/",
  "@azure-rest/",
  "@azure-tools/",
  "@microsoft/",
  "@typespec/",
] as const;

/**
 * The path, relative to the monorepo root, of the allow-list file.
 */
export const APPROVED_DEPENDENCIES_RELATIVE_PATH = path.join(
  "eng",
  "approved-third-party-dependencies.yml",
);

/**
 * The parsed and normalized allow-list.
 */
export interface ApprovedDependenciesConfig {
  /** Dependencies any sdk package may take. */
  allowed: Set<string>;
  /** Dependency name -> set of package names permitted to take it. */
  exceptions: Map<string, Set<string>>;
}

interface CacheEntry {
  mtimeMs: number;
  config: ApprovedDependenciesConfig;
}

const cache = new Map<string, CacheEntry>();

/**
 * Determines whether a dependency name belongs to a first-party scope and is
 * therefore implicitly approved.
 * @param dependencyName - the npm package name of the dependency
 * @returns true if the dependency is first-party
 */
export function isFirstPartyDependency(dependencyName: string): boolean {
  return FIRST_PARTY_PREFIXES.some((prefix) => dependencyName.startsWith(prefix));
}

/**
 * Determines whether an allow-list entry is a scope wildcard of the form
 * `@scope/*`, which matches every package published under that npm scope.
 * @param pattern - an `allowed` entry or an exception `dependency` value
 * @returns true if the entry is a scope wildcard
 */
export function isScopeWildcard(pattern: string): boolean {
  return pattern.endsWith("/*");
}

/**
 * Determines whether a dependency name is matched by an allow-list entry. An
 * entry either names a dependency exactly (`@opentelemetry/api`) or is a scope
 * wildcard (`@opentelemetry/*`) that matches any package in that npm scope.
 * @param pattern - an `allowed` entry or an exception `dependency` value
 * @param dependencyName - the npm package name of the dependency
 * @returns true if the pattern matches the dependency name
 */
export function dependencyMatchesPattern(pattern: string, dependencyName: string): boolean {
  if (isScopeWildcard(pattern)) {
    // Drop the trailing "*", keeping the trailing slash, so that
    // "@opentelemetry/*" matches "@opentelemetry/api" but not
    // "@opentelemetry-foo/api".
    return dependencyName.startsWith(pattern.slice(0, -1));
  }
  return pattern === dependencyName;
}

/**
 * Walks up the directory tree from `fromDirectory` to find the monorepo root,
 * identified by the presence of a `pnpm-workspace.yaml` file.
 * @param fromDirectory - the directory to start searching from
 * @returns the absolute path to the monorepo root, or undefined if not found
 */
export function findMonorepoRoot(fromDirectory: string): string | undefined {
  let current = path.resolve(fromDirectory);
  for (;;) {
    if (existsSync(path.join(current, "pnpm-workspace.yaml"))) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) {
      return undefined;
    }
    current = parent;
  }
}

/**
 * Resolves the absolute path to the allow-list file for the repository that
 * contains `fromDirectory`.
 * @param fromDirectory - a directory within the monorepo
 * @returns the absolute path to the allow-list file, or undefined if the
 *          monorepo root cannot be located
 */
export function resolveApprovedDependenciesPath(fromDirectory: string): string | undefined {
  const root = findMonorepoRoot(fromDirectory);
  return root === undefined ? undefined : path.join(root, APPROVED_DEPENDENCIES_RELATIVE_PATH);
}

function fail(filePath: string, detail: string): never {
  throw new Error(`Invalid approved-dependencies allow-list at ${filePath}: ${detail}`);
}

/**
 * Validates that a dependency pattern is either an exact name or a well-formed
 * scope wildcard (`@scope/*`). A bare `*` or an embedded `*` is rejected so that
 * a typo does not silently match nothing.
 */
function validatePattern(filePath: string, field: string, value: string): void {
  if (value.includes("*") && !(value.startsWith("@") && value.endsWith("/*"))) {
    fail(
      filePath,
      `${field} entry "${value}" is not a valid pattern; use an exact name or a scope wildcard like "@scope/*"`,
    );
  }
}

function normalize(filePath: string, raw: unknown): ApprovedDependenciesConfig {
  if (typeof raw !== "object" || raw === null) {
    fail(filePath, "expected a top-level mapping with 'allowed' and/or 'exceptions' keys");
  }

  const { allowed: rawAllowed, exceptions: rawExceptions } = raw as Record<string, unknown>;

  const allowed = new Set<string>();
  if (rawAllowed !== undefined) {
    if (!Array.isArray(rawAllowed)) {
      fail(filePath, "'allowed' must be a list of dependency names");
    }
    for (const entry of rawAllowed) {
      if (typeof entry !== "string") {
        fail(filePath, `'allowed' entries must be strings, found ${JSON.stringify(entry)}`);
      }
      validatePattern(filePath, "'allowed'", entry);
      allowed.add(entry);
    }
  }

  const exceptions = new Map<string, Set<string>>();
  if (rawExceptions !== undefined) {
    if (!Array.isArray(rawExceptions)) {
      fail(filePath, "'exceptions' must be a list of { dependency, packages } entries");
    }
    for (const entry of rawExceptions) {
      if (typeof entry !== "object" || entry === null) {
        fail(filePath, "each 'exceptions' entry must be a mapping");
      }
      const { dependency, packages } = entry as Record<string, unknown>;
      if (typeof dependency !== "string") {
        fail(filePath, "each 'exceptions' entry must have a string 'dependency'");
      }
      validatePattern(filePath, "'exceptions' dependency", dependency);
      if (!Array.isArray(packages) || packages.some((p) => typeof p !== "string")) {
        fail(
          filePath,
          `'exceptions' entry for '${dependency}' must have a 'packages' list of strings`,
        );
      }
      const existing = exceptions.get(dependency) ?? new Set<string>();
      for (const p of packages as string[]) {
        existing.add(p);
      }
      exceptions.set(dependency, existing);
    }
  }

  return { allowed, exceptions };
}

/**
 * Loads, validates, and caches the allow-list from the given file path. The
 * result is cached and only re-read when the file's modification time changes.
 *
 * @param filePath - the absolute path to the allow-list YAML file
 * @returns the normalized allow-list
 * @throws if the file is missing, cannot be parsed, or does not match the schema
 */
export function loadApprovedDependencies(filePath: string): ApprovedDependenciesConfig {
  if (!existsSync(filePath)) {
    fail(filePath, "file does not exist");
  }

  const { mtimeMs } = statSync(filePath);
  const cached = cache.get(filePath);
  if (cached && cached.mtimeMs === mtimeMs) {
    return cached.config;
  }

  let raw: unknown;
  try {
    raw = yaml.load(readFileSync(filePath, "utf-8"));
  } catch (e) {
    fail(filePath, `failed to parse YAML (${(e as Error).message})`);
  }

  const config = normalize(filePath, raw);
  cache.set(filePath, { mtimeMs, config });
  return config;
}

/**
 * The result of checking a single dependency against the allow-list.
 */
export type DependencyApprovalResult =
  | { status: "approved" }
  | { status: "unapproved" }
  | { status: "exception-other-packages"; allowedPackages: string[] };

/**
 * Checks whether a given dependency is approved for use by a given package.
 *
 * @param dependencyName - the npm name of the dependency being declared
 * @param packageName - the npm name of the package declaring the dependency
 * @param config - the loaded allow-list
 * @returns the approval result
 */
export function checkDependencyApproval(
  dependencyName: string,
  packageName: string,
  config: ApprovedDependenciesConfig,
): DependencyApprovalResult {
  if (isFirstPartyDependency(dependencyName) || isAllowedDependency(dependencyName, config)) {
    return { status: "approved" };
  }

  const exceptionPackages = collectExceptionPackages(dependencyName, config);
  if (exceptionPackages.size > 0) {
    if (exceptionPackages.has(packageName)) {
      return { status: "approved" };
    }
    return {
      status: "exception-other-packages",
      allowedPackages: [...exceptionPackages].sort(),
    };
  }

  return { status: "unapproved" };
}

/**
 * Determines whether a dependency is globally allowed, matching both exact
 * `allowed` entries and scope wildcards.
 */
function isAllowedDependency(dependencyName: string, config: ApprovedDependenciesConfig): boolean {
  if (config.allowed.has(dependencyName)) {
    return true;
  }
  for (const pattern of config.allowed) {
    if (isScopeWildcard(pattern) && dependencyMatchesPattern(pattern, dependencyName)) {
      return true;
    }
  }
  return false;
}

/**
 * Collects the union of packages permitted to take a dependency via the
 * `exceptions` list, matching both exact entries and scope wildcards.
 */
function collectExceptionPackages(
  dependencyName: string,
  config: ApprovedDependenciesConfig,
): Set<string> {
  const exact = config.exceptions.get(dependencyName);
  const result = new Set<string>(exact ?? []);
  for (const [pattern, packages] of config.exceptions) {
    if (isScopeWildcard(pattern) && dependencyMatchesPattern(pattern, dependencyName)) {
      for (const p of packages) {
        result.add(p);
      }
    }
  }
  return result;
}
