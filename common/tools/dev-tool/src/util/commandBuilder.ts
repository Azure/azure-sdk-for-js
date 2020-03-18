// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import getArgs from "minimist";

import { CommandLoader, CommandOptions, CommandInfo } from "./commandModule";
import { createPrinter } from "./printer";
import { printCommandUsage, commandStack } from "./printCommandUsage";

const { debug: parseDebug, error: parseError } = createPrinter("parseOptions");

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
export type ParsedOptions<Opts extends CommandOptions | undefined> = {
  /**
   * If the argument "--" was encountered when parsing, this property
   * holds all arguments that occurred after the "--"
   */
  "--": string[] | undefined;
  /**
   * Array of arguments to the command
   */
  args: string[];
} & (Opts extends CommandOptions
  ? {
      // This heinous type signature here just takes the options structure
      // and folds it into a map from long-key to resulting type.
      // If no default is specified, then the type will be implicitly or'd
      // with undefined
      [K in Exclude<
        keyof Opts,
        "--" | "args" | "help"
      >]: undefined extends Opts[K]["default"]
        ?
            | (Opts[K]["kind"] extends "string"
                ? string
                : Opts[K]["kind"] extends "boolean"
                ? boolean
                : Opts[K]["kind"] extends "multistring"
                ? string[]
                : string[] | string | boolean)
            | undefined
        : Opts[K]["kind"] extends "string"
        ? string
        : Opts[K]["kind"] extends "boolean"
        ? boolean
        : Opts[K]["kind"] extends "multistring"
        ? string[]
        : string[] | string | boolean;
    }
  : {});

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
): ParsedOptions<Opts> {
  // If options are not provided, use an empty set
  const options: CommandOptions = opts ?? {};

  const keys = Object.keys(options).filter(k => options.hasOwnProperty(k));
  const argMap = getArgs(args, {
    // Once an unidentified argument is encountered, stop parsing
    stopEarly: true,
    // Use type information for hinting to minimist about how arguments should
    // be handled
    boolean: ["help", ...keys.filter(k => options[k].kind === "boolean")],
    string: keys.filter(k => options[k].kind === "string"),
    // Roll up the optional short-names into aliases
    alias: keys.reduce(
      (o, key) =>
        options[key].shortName !== undefined
          ? { ...o, [options[key].shortName!]: key }
          : o,
      {}
    ),
    // Roll up the default values into the arg parser
    default: {
      ...keys.reduce(
        (o, key) =>
          options[key].default !== undefined
            ? { ...o, [key]: options[key].default }
            : o,
        {}
      ),
      help: false
    }
  });

  parseDebug(JSON.stringify(argMap));

  const result: any = { ...argMap, help: argMap.help, args: argMap._ };

  delete result._;

  function expectType(key: string, value : any, expected: string) : void {
    if (Array.isArray(value)) {
      parseError(`Too many arguments for "${key}"`);
      throw new Error(`More than one value for "${key}" was given, but only one was expected`);
    } else if (typeof value !== expected && typeof value !== "undefined") {
      parseError(`Bad argument: "${key}" = ${value}`);
      throw new Error(`Value of argument "${key}" was a ${typeof value} but a ${expected} was expected.`)
    }
  }

  // Validate that multi-strings were passed correctly
  // no boolean values, and single-strings get wrapped into arrays
  for (const multiKey of keys.filter(k => options[k].kind === "multistring" && result[k] !== undefined)) {
    if (!Array.isArray(result[multiKey])) {
      expectType(multiKey, result[multiKey], "string");
      // Wrap in an array to preserve types
      result[multiKey] = [result[multiKey]];
    } else {
      for (const val of result[multiKey]) {
        expectType(multiKey, val, "string");
      }
    }
  }

  // Check that single-strings were not passed more than once
  for (const stringKey of keys.filter(k => options[k].kind === "string")) {
    expectType(stringKey, result[stringKey], "string");
  }

  // Check that booleans were passed correctly
  for (const boolKey of keys.filter(k => options[k].kind === "boolean")) {
    expectType(boolKey, result[boolKey], "boolean");
  }

  return result as any;
}

/**
 * Create a subcommand handler that will delegate handling
 * to a set of lower-order subcommands.
 *
 * @param name name of this command (used in printed output)
 * @param commands map from subcommand name to module implementing that command
 */
export function subCommand(
  info: CommandInfo,
  commands: CommandLoader
): (...args: string[]) => Promise<boolean> {
  const log = createPrinter(info.name);
  return async (...rawArgs: string[]) => {
    commandStack.push(info.name);

    const options = parseOptions(rawArgs, info.options);

    log.debug("Parsed command line:", JSON.stringify(options));

    if (options.help) {
      await printCommandUsage(info, commands);
      return true;
    }

    const commandName = options.args[0];
    const commandArgs = options.args.slice(1);

    if (commandName === undefined) {
      log.error("No sub-command provided.");
      await printCommandUsage(info, commands, console.error);
      process.exit(1);
    }

    log.debug(`$ ${commandName} ${commandArgs?.join(" ") ?? ""}`);

    if (commands.hasOwnProperty(commandName)) {
      const commandModule = await commands[commandName]();

      const status = await commandModule.default(...commandArgs);

      if (!status) {
        log.error("Errors occurred. See the output above.");
      }
      return status;
    } else {
      log.error("No such sub-command:", commandName);
      await printCommandUsage(info, commands, console.error);
      process.exit(1);
    }
  };
}

export function leafCommand<Info extends CommandInfo>(
  info: Info,
  handler: (options: ParsedOptions<Info["options"]>) => Promise<boolean>
): (...args: string[]) => Promise<boolean> {
  return async (...args: string[]) => {
    const options = parseOptions(args, info.options);

    commandStack.push(info.name);

    // --help is treated specially
    if (options.help) {
      await printCommandUsage(info);
      return true;
    }

    return handler(options as any);
  };
}
