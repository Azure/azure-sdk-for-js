// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

/**
 * A command for use with the dev-tool
 */
export interface CommandModule {
  /**
   * The main async function of the command.
   *
   * @param args the arguments passed to the command
   *
   * @returns a promise resolving to `true` if the command succeeded, `false` otherwise
   */
  default: (...args: string[]) => Promise<boolean>;

  /**
   * Metadata information about this subcommand
   */
  commandInfo: CommandInfo;
}

/**
 * Information about this command
 */
export interface CommandInfo {
    /**
     * Name of this command
    */
    name: string;

    /**
     * One line of help text to be printed by the `dev-tool help` command
     */
    description: string;

    /**
     * Argument configuration for this command
     * 
     * Used for type-checked argument parsing and help text.
     * 
     * The options keys "help", "args", and "--" will be discarded, as they are handled internally.
     */
    options?: CommandOptions;
}

/**
 * Discriminated union representing the description of a command-line options
 */
export type OptionDescription =
  | StringOptionDescription
  | MultiStringOptionDescription
  | BooleanOptionDescription;

/**
 * Option description for a string argument
 */
export interface StringOptionDescription {
  kind: "string";
  default?: string;
}

/**
 * Option description for a string argument that
 * may be specified multiple times
 */
export interface MultiStringOptionDescription {
  kind: "multistring",
  default?: string[]
}

/**
 * Option description for a boolean argument
 */
export interface BooleanOptionDescription {
  kind: "boolean";
  default?: boolean;
}

/**
 * Structure for definining options of a command, represented as
 * a map from option name to a description, argument kind (string or boolean),
 * optional default value, and optional short name (one-letter alias)
 */
export interface CommandOptions {
  [k: string] : {
    /**
     * Optional one-letter alias
     */
    shortName?: string;
    /**
     * Help text for this option
     */
    description: string;
  } & OptionDescription
}

/**
 * A map from command name to an async function that loads its module
 */
export type CommandLoader = { [k: string]: () => Promise<CommandModule> };