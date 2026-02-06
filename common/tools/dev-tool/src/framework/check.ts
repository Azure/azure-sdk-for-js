// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import path from "node:path";
import { format } from "../util/prettier";
import { ProjectInfo } from "../util/resolveProject";
import { run } from "../util/run";
import fs from "node:fs/promises";

export type CheckTags = "release" | "ci" | "local";
export type CheckSeverity = "warning" | "error";

export type CheckEnableFunction = (project: ProjectInfo) => Promise<boolean>;

export interface CheckOptions {
  /**
   * Name of the check
   *
   * If unspecified a name will be inferred from the export
   */
  name?: string;

  /**
   * Optional extended description of the check
   */
  description?: string;

  /**
   * True if the check can attempt to fix itself
   */
  hasFix?: boolean;

  /**
   * Tags to identify when the check should be run
   *
   * Can have the following values:
   * - "ci": check is intended to be run in CI pipeline
   * - "release": check is intended to be run before releasing the package
   * - "local": check is intended to be run locally before pushing commit
   *
   * If `tags` is set to "*" then the check will be treated as if it has _every_ tag and will be always run.
   *
   * If no tags are specified the check will only be run if no tag is specified
   */
  tags?: CheckTags[] | "*";

  /**
   * Severity of the check. Defaults to "error".
   */
  severity?: CheckSeverity;

  /**
   * Optional function to determine whether this check applies to the given project
   * If this function returns true for the project, the check will be run.
   * If the function returns false, the check will be skipped for the project.
   *
   * If left undefined, the check will be enabled for all projects.
   */
  enable?: CheckEnableFunction;
}

export interface CheckContext {
  /**
   * Whether to attempt to fix
   */
  fix: boolean;

  /**
   * Information about the project
   */
  project: ProjectInfo;

  /**
   * Whether to output verbosely
   */
  verbose: boolean;
}

export type CheckFunction = (ctx: CheckContext) => void | Promise<void>;

export interface Check extends CheckOptions {
  /**
   * Run the check in the given context
   */
  check: CheckFunction;
}

/**
 * Error indicating that a check has failed
 */
export class CheckFailedError extends Error {
  constructor(
    message: string,
    public detail?: string,
  ) {
    super(message);
    this.name = "CheckFailedError";
  }
}

export function isCheckFailedError(e: unknown): e is CheckFailedError {
  return e instanceof Error && e.name === "CheckFailedError";
}

/**
 * Check that condition is true.
 * @param condition - condition to check
 * @param message - short message to display
 * @param detail - more details to display about the failure; can be multiple lines
 */
export function assert(condition: unknown, message: string, detail?: string): asserts condition {
  if (!condition) {
    throw new CheckFailedError(message, detail);
  }
}

export interface ScriptCheckOptions extends Omit<CheckOptions, "hasFix"> {
  /**
   * Command to be ran in order to run the check.
   *
   * If the command exits with a zero status code, that indicates the check is successful.
   * If the command exits with a non-zero status code, the output of the command will be reported
   * to provide details about the failure.
   */
  checkCommand: string;

  /**
   * Command to be ran to attempt to fix the check.
   * If undefined, this check will not be fixable.
   */
  fixCommand?: string;
}

/**
 * Create a check that runs a CLI command.
 *
 * @param options - options for creating the check, including the command to run, and, optionally, a command which can be run to attempt to fix the failing check.
 * @returns - the created check
 */
export function scriptCheck(options: ScriptCheckOptions): Check {
  return {
    ...options,
    hasFix: Boolean(options.fixCommand),
    async check({ fix, project, verbose }) {
      if (fix) {
        assert(options.fixCommand !== undefined, "fix command must be defined");
        const { exitCode, output } = await run(options.fixCommand, {
          cwd: project.path,
          captureExitCode: true,
          stdio: verbose ? "inherit" : undefined,
          captureOutput: true,
        });
        assert(exitCode === 0, `Check output exit code ${exitCode}`, output);
      } else {
        const { exitCode, output } = await run(options.checkCommand, {
          cwd: project.path,
          captureExitCode: true,
          stdio: verbose ? "inherit" : undefined,
          captureOutput: true,
        });
        assert(exitCode === 0, `Check output exit code ${exitCode}`, output);
      }
    },
  };
}

/**
 * Context passed to the check() function of a package.json check.
 */
export interface PackageJsonCheckContext extends CheckContext {
  /**
   * JavaScript object representation of the project's package.json file.
   * This object may be mutated to cause check failures if the mutation results in a change, or to fix the check if in fix mode.
   */
  packageJson: PackageJson;
}

export interface PackageJsonCheckOptions extends Omit<CheckOptions, "hasFix"> {
  /**
   * Run the check. The package.json is provided as a JavaScript object at the top level of the context, `packageJson`.
   * @param context - context the check is running in
   */
  check?: (context: PackageJsonCheckContext) => void | Promise<void>;

  /**
   * Fix the package.json. The package.json is provided as a JavaScript object at the top level of the context, `packageJson`.
   * The fix function should return the updated package.json as a result of running the fix.
   *
   * If `check` is not specified, the `fix` function will be called also when not in fix mode; the check will fail if the
   * updated package.json is not the same as the existing package.json
   *
   * @param context - context including the current package.json
   * @returns the fixed package.json
   */
  fix?: (context: PackageJsonCheckContext) => PackageJson | Promise<PackageJson>;
}

/**
 * A check which validates properties of the package.json. The check can define a check function, fix function, or both.
 *
 * The fix function may mutate the input packageJson provided in the CheckContext. If it does this, and the check function is undefined,
 * any material changes to the input packageJson will cause the check to fail, except if in fix mode. In
 * that case, the check will be fixed by writing the updated package.json to disk.
 *
 * @param options options - options for the check
 * @returns - the created check
 */
export function packageJsonCheck(options: PackageJsonCheckOptions): Check {
  return {
    ...options,
    hasFix: Boolean(options.fix),
    async check({ fix, project, verbose }) {
      const { packageJson: originalPackageJson } = project;

      if (fix || !options.check) {
        assert(options.fix, "packageJsonCheck must define either `check` or `fix`");
        // The check may mutate the package.json
        const packageJsonClone = structuredClone(originalPackageJson);
        const newPackageJson = await options.fix({
          verbose,
          packageJson: packageJsonClone,
          project: { ...project, packageJson: packageJsonClone },
          fix,
        });

        // Check if the cloned package JSON and original are different
        if (JSON.stringify(originalPackageJson) !== JSON.stringify(newPackageJson)) {
          if (fix) {
            const newPackageJsonContent = await format(JSON.stringify(newPackageJson), "json");
            await fs.writeFile(path.join(project.path, "package.json"), newPackageJsonContent);
          } else {
            assert(false, options.description ?? "package.json changed unexpectedly");
          }
        }
      } else {
        await options.check({ verbose, packageJson: project.packageJson, project, fix: false });
      }
    },
  };
}

/**
 * Check that running the given check command (with fix: true) or the given CLI command results in a clean working tree, i.e. no diff
 * Running this check in fix mode will run the check but will not check if it results in a clean working tree
 */
export function workingTreeUnchangedCheck(
  options: Omit<CheckOptions, "hasFix"> & ({ check: CheckFunction } | { fixCommand: string }),
): Check {
  const checkFunction: CheckFunction =
    "check" in options
      ? (options.check as CheckFunction)
      : async (ctx) => {
          const { output, exitCode } = await run(options.fixCommand, {
            captureOutput: true,
            captureExitCode: true,
            cwd: ctx.project.path,
          });
          assert(exitCode === 0, `Command exited with exit code ${exitCode}`, output);
        };

  return {
    ...options,
    hasFix: true,
    async check({ fix, project, verbose }) {
      if (fix) {
        // Just run the command to fix
        await checkFunction({ fix: true, project, verbose });
        return;
      }

      // 1. Commit staged items (if none commit anyway)
      await run(
        [
          "git",
          "commit",
          "--allow-empty",
          "-m",
          `dev-tool temp commit of your work

If this commit is present in your history, dev-tool didn't
clean up properly after running a check. If this is the
latest commit, you can tidy up the mess by running 
"git reset HEAD^".`,
        ],
        { cwd: project.path },
      );
      // 2. Stage unstaged stuff
      await run("git add .", { cwd: project.path });

      try {
        // 3. Run the command
        await checkFunction({ fix: true, project, verbose });

        // 4. Check working tree is clean
        const { exitCode, output } = await run("git diff --exit-code .", {
          cwd: project.path,
          captureExitCode: true,
          captureOutput: true,
        });

        assert(exitCode === 0, "Check resulted in a diff", output);
      } finally {
        // Undo changes to working tree
        await run("git checkout .", { cwd: project.path });
        // Undo staging of unstaged things
        await run("git reset .", { cwd: project.path });
        // Undo commit of staged things
        await run("git reset --soft HEAD~", { cwd: project.path });
      }
    },
  };
}

export const enableForEsmPackage: CheckEnableFunction = (project) =>
  Promise.resolve(project.packageJson.type === "module");
export const enableForCjsPackage: CheckEnableFunction = (project) =>
  Promise.resolve(project.packageJson.type !== "module");
export const enableForSdkType =
  (sdkType: "client" | "mgmt" | "utility" | "perf-test"): CheckEnableFunction =>
  (project) =>
    Promise.resolve(project.packageJson["sdk-type"] === sdkType);
