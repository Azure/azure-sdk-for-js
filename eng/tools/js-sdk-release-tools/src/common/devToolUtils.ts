import { logger } from "../utils/logger.js";
import { runCommand, runCommandOptions } from "./utils.js";
import fs from "fs";
import path from "path";

const CUSTOMIZATION_HELP_URL =
  "https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/modular-customization.md";

export async function formatSdk(packageDirectory: string) {
  logger.info(`Start to format code in '${packageDirectory}'.`);
  const cwd = packageDirectory;
  const options = { ...runCommandOptions, cwd };

  try {
    await runCommand(`npm`, ["run", "format"], options, true, 300, true);
    logger.info(`format sdk successfully.`);
  } catch (error) {
    logger.warn(`Failed to format code due to: ${(error as Error)?.stack ?? error}`);
  }
}

export async function updateSnippets(packageDirectory: string) {
  logger.info(`Start to update snippets in '${packageDirectory}'.`);
  const cwd = packageDirectory;
  const options = { ...runCommandOptions, cwd };

  try {
    const updateCommand = "run update-snippets";
    await runCommand("npm", ["exec", "--", "dev-tool", updateCommand], options, true, 300, true);
    logger.info(`Snippets updated successfully.`);
  } catch (error) {
    logger.warn(`Failed to update snippets due to: ${(error as Error)?.stack ?? error}`);
  }
}

export async function lintFix(packageDirectory: string) {
  logger.info(`Start to fix lint errors in '${packageDirectory}'.`);
  const cwd = packageDirectory;
  const options = { ...runCommandOptions, cwd };

  try {
    const packageJsonPath = path.join(packageDirectory, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: "utf-8" }));
    const lintFixScript: string = packageJson.scripts?.["lint:fix"] ?? "";

    if (lintFixScript.trimStart().startsWith("echo")) {
      // lint:fix is a no-op for this package (e.g. mgmt packages set it to "echo skipped").
      // Run eslint directly via `pnpm exec` so that pnpm resolves the binary from the
      // workspace-hoisted node_modules/.bin without mutating package.json.

      // Ensure @azure/eslint-plugin-azure-sdk is built first; pnpm install only symlinks it.
      logger.info(
        `Building @azure/eslint-plugin-azure-sdk to ensure its dist files are available.`,
      );
      await runCommand(
        "pnpm",
        ["build", "--filter", "@azure/eslint-plugin-azure-sdk"],
        runCommandOptions,
        true,
        300,
        true,
      );
      logger.info(`@azure/eslint-plugin-azure-sdk build step completed.`);

      // Lint only TypeScript source directories; exclude JSON files to avoid a crash in the
      // ts-package-json-repo rule of @azure/eslint-plugin-azure-sdk under ESLint 9.
      const lintPaths = ["src"];
      if (fs.existsSync(path.join(packageDirectory, "test"))) {
        lintPaths.push("test");
        logger.info(`'test' directory found, including in lint paths.`);
      }
      if (fs.existsSync(path.join(packageDirectory, "samples-dev"))) {
        lintPaths.push("samples-dev");
        logger.info(`'samples-dev' directory found, including in lint paths.`);
      }
      logger.info(`Lint paths: ${lintPaths.join(", ")}`);

      await runCommand(
        "pnpm",
        ["exec", "eslint", ...lintPaths, "--fix", "--fix-type", "[problem,suggestion]"],
        options,
        true,
        3600,
        true,
      );
    } else {
      logger.info(`lint:fix script found ('${lintFixScript}'), running 'npm run lint:fix'.`);
      await runCommand("npm", ["run", "lint:fix"], options, true, 300, true);
    }
    logger.info(`Fix the automatically repairable lint errors successfully.`);
  } catch (error) {
    logger.warn(`Failed to fix lint errors due to: ${(error as Error)?.stack ?? error}`);
  }
}

export async function customizeCodes(packageDirectory: string): Promise<void> {
  const cwd = packageDirectory;
  const options = { ...runCommandOptions, cwd };

  try {
    // `--if-present` runs the package's `customize` script when it exists and is a
    // no-op otherwise, so packages without customization are silently skipped.
    await runCommand("npm", ["run", "--if-present", "customize"], options, true, 600);
  } catch (error) {
    logger.warn(`Failed to customize codes due to: ${(error as Error)?.stack ?? error}`);
  }
}

/**
 * Emits the shared warning telling the package owner that automatic customization
 * failed and must be re-applied manually on the generated SDK pull request.
 */
export function warnCustomizationFallback(packageName?: string): void {
  const pkg = packageName ? ` for '${packageName}'` : "";
  logger.warn(
    `Automatic customization could not be applied${pkg}, so the SDK was generated WITHOUT ` +
      `customization to keep validation and API view generation unblocked. The package owner ` +
      `must apply customization manually on the generated SDK pull request. See ${CUSTOMIZATION_HELP_URL}.`,
  );
}

/**
 * Wholesale fallback used by the automated pipelines when a package fails to build
 * after customization: replace the customized `src` tree with a clean copy of the
 * freshly generated output, dropping *all* customizations.
 *
 * This mirrors the Java generator's `disable_customization` clean regeneration
 * (eng/automation/generate_data.py). Resetting only the conflicting files is not
 * safe because customizations are cross-file coupled (a kept file may import a
 * symbol from a reset file), so the result would not be guaranteed to compile.
 * The emitter output in `generated/` is self-contained and builds on its own.
 *
 * Only packages that use the merge-based customization layout (a root `generated/`
 * directory) are reset; other packages are left untouched.
 *
 * @returns true if a clean generated tree was materialized, false otherwise.
 */
export async function resetToGeneratedOutput(packageDirectory: string): Promise<boolean> {
  const generatedDirectory = path.join(packageDirectory, "generated");
  const sourceDirectory = path.join(packageDirectory, "src");

  if (!fs.existsSync(generatedDirectory)) {
    // Not a merge-based customization package; nothing to reset to.
    return false;
  }

  logger.info(
    `Resetting '${sourceDirectory}' to the clean generated output from '${generatedDirectory}'.`,
  );
  await fs.promises.rm(sourceDirectory, { force: true, recursive: true });
  await fs.promises.mkdir(path.dirname(sourceDirectory), { recursive: true });
  await fs.promises.cp(generatedDirectory, sourceDirectory, { recursive: true });
  return true;
}
