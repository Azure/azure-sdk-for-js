// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chalk from "chalk";

/**
 * Thrown when an unreachable code path is reached.
 */
class UnreachableError extends Error {
  /**
   *
   * @param values - a value that should have been unreachable, or a record of values that should have been unreachable
   */
  constructor(values: never[]) {
    super(`Unreachable: ${values.map((v) => JSON.stringify(v)).join(", ")}`);
  }
}

/**
 * Asserts that this expression is unreachable
 */
export function unreachable(...values: never[]): never {
  throw new UnreachableError(values);
}

/**
 * Throws an unrecoverable error.
 *
 * @param message - the error message to print
 */
export function panic(message: string): never {
  console.error(chalk.red("[PANIC] " + message));

  console.trace(
    chalk.red(
      "This is a bug in the tool. Please file an issue at https://github.com/azure/azure-sdk-for-js/. Include the stack trace below."
    )
  );

  console.error(
    chalk.red(
      "The package state may be damaged or corrupted. Please reset your working directory to a clean state."
    )
  );

  process.exit(255);
}
