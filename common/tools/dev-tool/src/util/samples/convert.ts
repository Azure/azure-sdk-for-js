// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EOL } from "os";

import * as prettier from "prettier";
import ts from "typescript";

import { createPrinter } from "../printer";

const log = createPrinter("ts-to-js");

const prettierOptions: prettier.Options = {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ...(require("../../../../eslint-plugin-azure-sdk/prettier.json") as prettier.Options),
  parser: "typescript",
};

const compilerOptions: ts.CompilerOptions = {
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.ES2015,
};

const NEWLINE_SIGIL = `${EOL}//@@TS-MAGIC-NEWLINE@@${EOL}`;
const NEWLINE_SIGIL_SEARCH = /\r?\n\s*\/\/@@TS-MAGIC-NEWLINE@@\r?\n/;

/**
 * A set of replacements to perform. Structured as an array of doubles:
 *
 * [<matching regex>, <replacement string>]
 *
 * Given as arguments to string.replace. Called in this order.
 */
const REGEX_STACK: Array<[RegExp | (() => RegExp), string]> = [
  // `require("dotenv").config()` is just a little cleaner for CJS
  [
    () =>
      /^const\s+dotenv\s*=\s*require\s*\(\s*"dotenv"\s*\)\s*;\s*(\r?\n)*\s*dotenv\s*\.\s*config/gm,
    'require("dotenv").config',
  ],
  // Remove exports. We would have to recreate all nodes to do this with the API.
  [() => /^export(\s+default)?\s/gm, ""],
  // Give `module.exports =` some breathing room
  [() => /([^\n])\r?\nmodule\.exports/g, `$1${EOL + EOL}module.exports`],
];

/**
 * Handles the formatting of the resulting JS text.
 */
function postTransform(outText: string): string {
  // Replace the sigils that we inserted
  let text = outText.split(NEWLINE_SIGIL_SEARCH).join("\n\n");

  // Format first so that we can write matching regexps
  // that are humanly comprehensible
  text = prettier.format(text, prettierOptions);

  for (const [rx, replacement] of REGEX_STACK) {
    const match = typeof rx === "function" ? rx() : rx;
    text = text.replace(match, replacement);
  }

  // Format once more for the final output.
  return prettier.format(text, prettierOptions);
}

/**
 * A worker function that converts TypeScript source text to our standard
 * JavaScript, preserving the newline structure of the input module.
 *
 * @param srcText - contents of a TypeScript module source to convert
 * @param transpileOptions - optiona transpileOptions overrides (compilerOptions will be merged)
 * @returns - an equivalent JavaScript module source
 */
export function convert(srcText: string, transpileOptions?: ts.TranspileOptions): string {
  // TypeScript doesn't preserve newlines in compiled JS output,
  // but we can pre-process each blank line by replacing it with a special
  // sigil (in a comment, since TS preserves comments
  const processedSrcText = srcText.split(/\n\s*\n/).join(NEWLINE_SIGIL);

  const extraCompilerOptions = transpileOptions?.compilerOptions;

  delete transpileOptions?.compilerOptions;

  const output = ts.transpileModule(processedSrcText, {
    compilerOptions: {
      ...compilerOptions,
      ...extraCompilerOptions,
      removeComments: false,
    },
    ...transpileOptions,
  });

  if (output.diagnostics?.length) {
    log.error("TypeScript to JavaScript transpilation emitted errors:");

    const host: ts.FormatDiagnosticsHost = {
      getNewLine: () => EOL,
      getCanonicalFileName: (path) => path,
      getCurrentDirectory: () => process.cwd(),
    };

    for (const diagnostic of output.diagnostics) {
      log(ts.formatDiagnostic(diagnostic, host));
    }

    log.warn("Continuing anyway.");
  }

  return postTransform(output.outputText);
}
