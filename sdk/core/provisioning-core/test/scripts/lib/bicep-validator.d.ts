// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type BicepCli = {
  command: string;
  versionArgs: string[];
  buildArgs: (filePath: string) => string[];
  buildPatternArgs: (pattern: string) => string[];
};

/**
 * Resolve the first working Bicep entrypoint, preferring standalone binaries
 * and falling back to `az bicep` when necessary.
 */
export function resolveBicepCli(): BicepCli;

/**
 * Probe for a usable Bicep CLI without throwing, so callers can decide whether
 * validation should be required or skipped.
 */
export function tryResolveBicepCli(): BicepCli | undefined;

/**
 * Validate one or more concrete Bicep entry files with the real Bicep CLI and
 * surface compiler stderr directly when compilation fails.
 */
export function validateBicepEntryFiles(filePaths: readonly string[]): void;

/**
 * Validate a mixed set of files and directories by first normalizing them into
 * concrete `.bicep` entry files.
 */
export function validateBicepTargets(targets: readonly string[]): void;

/**
 * Materialize rendered Bicep files into a temporary directory and validate the
 * generated output in one compiler process, including nested module files.
 */
export function validateRenderedBicepFiles(
  renderedFiles: readonly { path: string; contents: string }[],
): void;
