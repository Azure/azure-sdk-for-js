// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs-extra";
import path from "path";
import { EOL } from "os";

import * as prettier from "prettier";
import ts from "typescript";

import { leafCommand, makeCommandInfo } from "../../framework/command";

import { createPrinter } from "../../util/printer";

const log = createPrinter("ts-to-js");

export const commandInfo = makeCommandInfo(
  "ts-to-js",
  "convert a TypeScript sample to a JavaScript equivalent using our conventions for samples"
);

const prettierOptions: prettier.Options = {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ...(require("../../../../eslint-plugin-azure-sdk/prettier.json") as prettier.Options),
  parser: "typescript"
};

const compilerOptions: ts.CompilerOptions = {
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.ES2015
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
const REGEX_STACK: Array<[RegExp, string]> = [
  // import * as dotenv ... -> require("dotenv").config()
  [
    /import\s+\*\s+as\s+dotenv\s+from\s*"dotenv"\s*;\s*\n\s*dotenv.config\({[^{]*}\)\s*;\s*/,
    'require("dotenv").config();\n\n'
  ], // Needs some special handling
  // import { ... } from -> const { ... } = require
  [/import\s+({[^}]+})\s+from\s*("[^"]+");/gs, "const $1 = require($2);"],
  [/import\s+([^\s]+)\s+from\s*("[^"]+");/g, "const $1 = require($2);"],
  [/import\s+\*\s+as\s+([^\s]+)\s+from\s*("[^"]+");/g, "const $1 = require($2);"],
  [/export async function main/, "async function main"]
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

  for (const [match, replacement] of REGEX_STACK) {
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

  const extraTranspileOptions = { ...transpileOptions };
  delete transpileOptions?.compilerOptions;

  const output = ts.transpileModule(processedSrcText, {
    compilerOptions: {
      ...compilerOptions,
      ...extraCompilerOptions
    },
    ...extraTranspileOptions
  });

  if (output.diagnostics?.length) {
    log.error("TypeScript to JavaScript transpilation emitted errors:");

    const host: ts.FormatDiagnosticsHost = {
      getNewLine: () => EOL,
      getCanonicalFileName: (path) => path,
      getCurrentDirectory: () => process.cwd()
    };

    for (const diagnostic of output.diagnostics) {
      log(ts.formatDiagnostic(diagnostic, host));
    }

    log.warn("Continuing anyway.");
  }

  return postTransform(output.outputText);
}

export default leafCommand(commandInfo, async (options) => {
  if (options.args.length !== 2) {
    throw new Error("Wrong number of arguments. Got " + options.args.length + " but expected 2.");
  }

  const [src, dest] = options.args.map(path.normalize);

  const srcText = (await fs.readFile(src)).toString("utf-8");

  const outputText = convert(srcText, { fileName: src });

  await fs.ensureDir(path.dirname(dest));
  await fs.writeFile(dest, outputText);

  return true;
});
