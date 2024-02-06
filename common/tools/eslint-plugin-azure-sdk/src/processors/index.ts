// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Definition of processors
 * @author Arpan Laha
 */

import { Linter } from "eslint";

/**
 * An object containing processors used by the plugin
 */
export = {
  /**
   * The processor for JSON files
   * Ignores the no-unused-expressions ESLint rule
   */
  ".json": {
    preprocess: (text: string): string[] => [text],
    postprocess: (messages: Linter.LintMessage[][]): Linter.LintMessage[] =>
      messages[0].filter(
        (message: Linter.LintMessage): boolean => message.ruleId !== "no-unused-expressions"
      ),
    supportsAutofix: true,
  },
};
