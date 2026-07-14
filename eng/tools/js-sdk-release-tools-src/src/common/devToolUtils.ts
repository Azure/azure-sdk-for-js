import { logger } from '../utils/logger.js';
import { runCommand, runCommandOptions } from './utils.js';
import fs from 'fs';
import path from 'path';

export async function formatSdk(packageDirectory: string) {
  logger.info(`Start to format code in '${packageDirectory}'.`);
  const cwd = packageDirectory;
  const options = { ...runCommandOptions, cwd };

  try {
    await runCommand(`npm`, ['run', 'format'], options, true, 300, true);
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
    const updateCommand = 'run update-snippets';
    await runCommand('npm', ['exec', '--', 'dev-tool', updateCommand], options, true, 300, true);
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
    const packageJsonPath = path.join(packageDirectory, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: 'utf-8' }));
    const lintFixScript: string = packageJson.scripts?.['lint:fix'] ?? '';

    if (lintFixScript.trimStart().startsWith('echo')) {
      // lint:fix is a no-op for this package (e.g. mgmt packages set it to "echo skipped").
      // Run eslint directly via `pnpm exec` so that pnpm resolves the binary from the
      // workspace-hoisted node_modules/.bin without mutating package.json.

      // Ensure @azure/eslint-plugin-azure-sdk is built first; pnpm install only symlinks it.
      logger.info(`Building @azure/eslint-plugin-azure-sdk to ensure its dist files are available.`);
      await runCommand(
        'pnpm',
        ['build', '--filter', '@azure/eslint-plugin-azure-sdk'],
        runCommandOptions,
        true,
        300,
        true
      );
      logger.info(`@azure/eslint-plugin-azure-sdk build step completed.`);

      // Lint only TypeScript source directories; exclude JSON files to avoid a crash in the
      // ts-package-json-repo rule of @azure/eslint-plugin-azure-sdk under ESLint 9.
      const lintPaths = ['src'];
      if (fs.existsSync(path.join(packageDirectory, 'test'))) {
        lintPaths.push('test');
        logger.info(`'test' directory found, including in lint paths.`);
      }
      if (fs.existsSync(path.join(packageDirectory, 'samples-dev'))) {
        lintPaths.push('samples-dev');
        logger.info(`'samples-dev' directory found, including in lint paths.`);
      }
      logger.info(`Lint paths: ${lintPaths.join(', ')}`);

      await runCommand(
        'pnpm',
        ['exec', 'eslint', ...lintPaths, '--fix', '--fix-type', '[problem,suggestion]'],
        options,
        true,
        3600,
        true
      );
    } else {
      logger.info(`lint:fix script found ('${lintFixScript}'), running 'npm run lint:fix'.`);
      await runCommand('npm', ['run', 'lint:fix'], options, true, 300, true);
    }
    logger.info(`Fix the automatically repairable lint errors successfully.`);
  } catch (error) {
    logger.warn(`Failed to fix lint errors due to: ${(error as Error)?.stack ?? error}`);
  }
}

export async function customizeCodes(packageDirectory: string) {
  logger.info(`Start to customize codes in '${packageDirectory}'.`);
  const cwd = packageDirectory;
  const options = { ...runCommandOptions, cwd };

  try {
    //TODO: support ./src/generated cases in future
    const customizeCommand = `customization apply-v2 -s ./generated -c ./src`;
    await runCommand('npm', ['exec', '--', 'dev-tool', customizeCommand], options, true, 600, true);
    logger.info(`Customize codes successfully.`);
  } catch (error) {
    logger.warn(`Failed to customize codes due to: ${(error as Error)?.stack ?? error}`);
  }
}
