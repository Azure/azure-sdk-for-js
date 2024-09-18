// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @fileoverview This module contains control-flow helpers.
 */

import chalk from "chalk";

/**
 * Asserts that this expression is unreachable. This function will panic if it is called.
 *
 * You can pass values to this function that should be exhausted at runtime. This is useful for exhaustiveness checking
 * in switch statements, for example.
 *
 * @param values - optional values that will be printed in the message
 */
export function unreachable(...values: never[]): never {
  panic(`Unreachable: ${values.map((v) => JSON.stringify(v)).join(", ")}`);
}

/**
 * An error class for an unimplemented feature.
 */
export class UnimplementedError extends Error {
  /**
   * Creates a new UnimplementedError.
   *
   * @param message - a description of the unimplemented feature
   */
  constructor(message: string) {
    super(message);
    this.name = "UnimplementedError";
  }
}

/**
 * Declares that a code path is unimplemented. This function throws an Error.
 *
 * @param message - a description of the unimplemented feature
 */
export function unimplemented(message: string): never {
  throw new UnimplementedError(message);
}

/**
 * Triggers an unrecoverable error that exits the process.
 *
 * @param message - the error message to print
 */
export function panic(message: string): never {
  console.error(chalk.red("[PANIC] " + message));

  console.trace(
    chalk.red(
      "This is a bug in the tool. Please file an issue at https://github.com/azure/azure-sdk-for-js/issues.",
      "Include the stack trace below.",
    ),
  );

  console.error(
    chalk.red(
      "The package state may be damaged or corrupted. Please reset your working directory to a known-good state.",
    ),
  );

  process.exit(255);
}
