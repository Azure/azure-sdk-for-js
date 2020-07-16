// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { CommandLoader } from "./CommandModule";
import { createPrinter } from "../util/printer";
import { printCommandUsage, commandStack } from "./printCommandUsage";
import { ParsedOptions, parseOptions } from "./parseOptions";
import { CommandInfo, CommandOptions } from "./CommandInfo";

/**
 * Utility type that makes the type of the "allowMultiple" key in
 * any options descriptions strictly "undefined" when it is not
 * specified in the context of a refined extending type
 */
export type StrictAllowMultiple<Opts extends CommandOptions> = {
  [K in keyof Opts]: boolean extends Opts[K]["allowMultiple"]
    ? Opts[K] & { allowMultiple?: undefined }
    : Opts[K];
};

/**
 * Create a CommandInfo object that describes a command and its functionality.
 *
 * For the best type-checking support, please ensure that the `options` parameter
 * is given to this function as a literal.
 *
 * Example:
 *
 * ```typescript
 * export const commandInfo = describe(
 *   "resolve",
 *   "display information about the project that owns a directory",
 *   {
 *     directory: {
 *       shortName: "d",
 *       kind: "string",
 *       description: "base directory for resolution (uses CWD if unset)",
 *       allowMultiple: true
 *     },
 *     quiet: {
 *       shortName: "q",
 *       kind: "boolean",
 *       default: false,
 *       description: "output only the directory name with no extra formatting"
 *     }
 *   }
 * );
 * ```
 *
 * @param name the name of this command
 * @param description a one-line description of this command's functionality
 * @param options the command's command-line options descriptions (see: {@link CommandOptions})
 */
export function makeCommandInfo<Opts extends CommandOptions>(
  name: string,
  description: string,
  options?: Opts
): CommandInfo<StrictAllowMultiple<Opts>> {
  return {
    name,
    description,
    options: options as StrictAllowMultiple<Opts>
  };
}

/**
 * Create a subcommand handler that will delegate handling
 * to a set of lower-order subcommands.
 *
 * @param info a the CommandInfo object that describes this command
 * @param commands map from subcommand name to module implementing that command
 */
export function subCommand<Info extends CommandInfo<CommandOptions>>(
  info: Info,
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

    if (Object.prototype.hasOwnProperty.call(commands, commandName)) {
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

/**
 * Construct a command that runs a handler when invoked.
 *
 * @param info the CommandInfo object that describes this command
 * @param handler a function to handle the execution of the command
 */
export function leafCommand<Info extends CommandInfo<CommandOptions>>(
  info: Info,
  handler: (options: ParsedOptions<NonNullable<Info["options"]>>) => Promise<boolean>
): (...args: string[]) => Promise<boolean> {
  return async (...args: string[]): Promise<boolean> => {
    const options = parseOptions(args, info.options);

    commandStack.push(info.name);

    // --help is treated specially
    if (options.help) {
      await printCommandUsage(info);
      return true;
    }

    return handler(options as ParsedOptions<NonNullable<Info["options"]>>);
  };
}
