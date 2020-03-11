// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chalk from "chalk";

const printModes = ["info", "warn", "error", "success", "debug"] as const;

export type Fn<T = void> = (...values: any[]) => T;
export type ModeMap<T> = { [k in typeof printModes[number]]: T };

/**
 * The interface that describes the Printer produced by {@link createPrinter}
 */
export interface Printer extends ModeMap<Fn> {
  (...values: any[]): void;
}

const colors: ModeMap<Fn<string>> = {
  info: chalk.blueBright,
  warn: chalk.yellow,
  error: chalk.red,
  debug: chalk.magenta,
  success: chalk.green
};

const finalLogger: ModeMap<Fn> = {
  info: console.info,
  warn: console.warn,
  error: console.error,
  debug(...values: string[]) {
    if (process.env.DEBUG) {
      console.log(...values);
    }
  },
  success: console.info
};

/**
 * Create a pre-configured console printer for a given namespace.
 *
 * ```javascript
 * const log = createPrinter("my-command");
 * ```
 *
 * The printer can be called directly (`log("A message")`), or a
 * log level can be specified (`log.error("An error message")`).
 *
 * The printer outputs `[<name>]` before each message and colorizes terminal
 * output as appropriate using `chalk` according to the log level. The colors are:
 *
 * - no log level (called directly): white
 * - info: bright blue (ANSI #12)
 * - warn: yellow (ANSI #3)
 * - error: red (ANSI #1)
 * - debug: magenta (ANSI #5)
 * - success: green (ANSI #2)
 *
 * @param name the namespace to format log messages with
 */
export function createPrinter(name: string): Printer {
  const prefix = "[" + name + "]";
  const base = (...values: string[]) =>
    console.log(chalk.reset(prefix, ...values));

  for (const mode of printModes) {
    (base as any)[mode] = (...values: string[]) =>
      finalLogger[mode](colors[mode](prefix, ...values));
  }
  return base as Printer;
}
