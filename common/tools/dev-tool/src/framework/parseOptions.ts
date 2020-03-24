// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import getArgs from "minimist";

import { createPrinter } from "../util/printer";
import { CommandOptions, StringOptionDescription, BooleanOptionDescription } from "./CommandInfo";

const { debug: parseDebug, error: parseError } = createPrinter("parseOptions");

/**
 * This helper type implements the logic for determining the
 * type of an option according to its possible multiplicity
 */
export type MaybeMultiple<P, T> = boolean extends P ? T | T[] : true extends P ? T[] : T;

/**
 * The real type of an option parsed from an OptionDescription
 */
export type OptionFor<Opt extends CommandOptions[string]> = MaybeMultiple<
  Opt["allowMultiple"],
  Opt extends StringOptionDescription
    ? string
    : Opt extends BooleanOptionDescription
    ? boolean
    : string | boolean
>;

/**
 * The type of the Options map produced by {@link parseOptions}
 * given a const input type Opts that extends CommandOptions.
 *
 * You should probably not use this type directly. It is designed
 * to be inferred when using {@link leafCommand}.
 *
 * Make sure the input type is declared const, otherwise a
 * fully dynamic map will be produced.
 */
export type ParsedOptions<Opts extends CommandOptions = CommandOptions> = {
  /**
   * If the argument "--" was encountered when parsing, this property
   * holds all arguments that occurred after the "--"
   */
  "--"?: string[] | undefined;
  /**
   * Array of arguments to the command
   */
  args: string[];
} & {
  // If no default is specified, then the type will be implicitly or'd
  // with undefined
  [K in Exclude<keyof Opts, "--" | "args" | "help">]: undefined extends Opts[K]["default"]
    ? OptionFor<Opts[K]> | undefined
    : OptionFor<Opts[K]>;
};

/**
 * Helper function to convert an args array to a parsed argument map.
 *
 * This is a strongly-typed wrapper around `minimist`.
 *
 * You should probably not use this function directly. The
 * options should be parsed and their types should be inferred
 * from {@link leafCommand}.
 *
 * @param args input array of arg strings from argv
 * @param options option map of a command
 */
export function parseOptions<Opts extends CommandOptions>(
  args: string[],
  opts?: Opts
): ParsedOptions<NonNullable<Opts>> {
  // If options are not provided, use an empty set
  const options: CommandOptions = opts ?? {};

  const keys = Object.keys(options);
  const argMap = getArgs(args, {
    // Once an unidentified argument is encountered, stop parsing
    stopEarly: true,
    // Use type information for hinting to minimist about how arguments should
    // be handled
    boolean: ["help", ...keys.filter((k) => options[k].kind === "boolean")],
    string: keys.filter((k) => options[k].kind === "string"),
    // Roll up the optional short-names into aliases
    alias: keys.reduce(
      (o, key) =>
        options[key].shortName !== undefined
          ? { ...o, [options[key].shortName as string]: key }
          : o,
      {}
    ),
    // Roll up the default values into the arg parser
    default: {
      ...keys.reduce(
        (o, key) =>
          options[key].default !== undefined ? { ...o, [key]: options[key].default } : o,
        {}
      ),
      help: false
    }
  });

  parseDebug("Parsed args:", JSON.stringify(argMap));

  const result: ParsedOptions = { help: argMap.help, args: argMap._ };

  function expectType<T>(key: string, value: T, expected: string): void {
    if (Array.isArray(value)) {
      parseError(`Too many arguments for "${key}"`);
      throw new Error(`More than one value for "${key}" was given, but only one was expected`);
    } else if (typeof value !== expected && typeof value !== "undefined") {
      parseError(`Bad argument: "${key}" = ${value}`);
      throw new Error(
        `Value of argument "${key}" was a ${typeof value} but a ${expected} was expected.`
      );
    }
  }

  // Type validation
  for (const k of keys) {
    result[k] = argMap[k];
    const opt = options[k];
    if (!opt.allowMultiple) {
      expectType(k, result[k], opt.kind);
    } else if (Array.isArray(result[k])) {
      // allowMultiple === true, check all
      for (const val of result[k] as (string | boolean)[]) {
        expectType(k, val, opt.kind);
      }
    } else if (result[k] !== undefined) {
      // allowMultiple === true, wrap
      expectType(k, result[k], opt.kind);
      result[k] = [result[k] as string | boolean];
    }
  }

  parseDebug("Final arguments:", JSON.stringify(result));

  return result as ParsedOptions<NonNullable<Opts>>;
}
