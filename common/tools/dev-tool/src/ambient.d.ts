// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

/**
 * Some delcarations for plugins that have missing/old declarations in
 * NPM.
 */

// #region rollup

type Plugin = import("rollup").Plugin;

/**
 * An input defined by a set of files to be included and a set of
 * files to exclude, where exclusion has priority. The final set
 * of inputs will be the files matched by includes that are not
 * also matched by excludes.
 */
interface ExtendedInput {
  include: string[];
  exclude: string[];
}

/**
 * Rollup Options, extended to support multi-entry
 */
type RollupOptions = Omit<import("rollup").RollupOptions, "input"> & {
  input: string | string[] | ExtendedInput;
}

declare module "rollup-plugin-sourcemaps" {
  export default function(): Plugin;
}

declare module "rollup-plugin-node-globals" {
  export default function(): Plugin;
}

declare module "rollup-plugin-node-builtins" {
  export default function(): Plugin;
}

declare module "@rollup/plugin-multi-entry" {
  interface MultiEntryOptions {
    exports: boolean;
  }
  export default function(opts: MultiEntryOptions): Plugin;
}

// #endregion

