// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

/**
 * Information about this command
 */
export interface CommandInfo<Options> {
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
  options?: Options;
}

/**
 * Structure for definining options of a command, represented as
 * a map from option name to a description, argument kind (string or boolean),
 * optional default value, and optional short name (one-letter alias)
 */
export interface CommandOptions {
  [k: string]: {
    /**
     * Optional one-letter alias
     */
    shortName?: string;
    /**
     * Help text for this option
     */
    description: string;
    /**
     * Whether or not the option may be specified multiple times
     *
     * Default: false
     */
    allowMultiple?: boolean;
  } & OptionDescription;
}

export type OptionDescription = StringOptionDescription | BooleanOptionDescription;

/**
 * Option description for a string argument
 */
export interface StringOptionDescription {
  kind: "string";
  default?: string;
}

/**
 * Option description for a boolean argument
 */
export interface BooleanOptionDescription {
  kind: "boolean";
  default?: boolean;
  // minimist seemingly cannot handle booleans specified multiple times
  allowMultiple?: false;
}
