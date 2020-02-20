// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chalk from "chalk";

export type StringConsumer<T> = (...values: string[]) => T;
export type PrintFn = StringConsumer<void>;

export type PrintMode = ["info", "warn", "error", "success", "debug"];
export type ModeMap<T> = { [k in PrintMode[number]]: T };

export interface Printer extends ModeMap<PrintFn> {
  (...values: string[]): void;
}

const printModes: PrintMode = ["info", "warn", "error", "success", "debug"];

const colors: ModeMap<StringConsumer<string>> = {
  info: chalk.blueBright,
  warn: chalk.yellow,
  error: chalk.red,
  debug: chalk.magenta,
  success: chalk.green
};

const finalLogger: ModeMap<PrintFn> = {
  info: console.info,
  warn: console.warn,
  error: console.error,
  debug: (...values: string[]) => {
    if (process.env.DEBUG) {
      console.log(values);
    }
  },
  success: console.info
};

export const createPrinter = (name: string): Printer => {
  const prefix = "[" + name + "]";
  const base = (...values: string[]) =>
    console.log(chalk.reset(prefix, ...values));

  for (const mode of printModes) {
    (base as any)[mode] = (...values: string[]) =>
      finalLogger[mode](colors[mode](prefix, ...values));
  }
  return base as Printer;
};
