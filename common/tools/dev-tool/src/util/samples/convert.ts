// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EOL } from "node:os";
import { ScriptTarget, isExternalModule } from "typescript/ast";
import { ModuleDetectionKind } from "typescript/proto";
import { ModuleKind, formatDiagnostics } from "typescript/sync";
import type { API, FormatDiagnosticsHost, RawCompilerOptions } from "typescript/sync";
import { createPrinter } from "../printer.ts";
import { format } from "../prettier.ts";
import { withSourceFile, withTypeScriptApi } from "../typescript/api.ts";
import type { SourceRewriter } from "../typescript/edits.ts";
import { applyTextEdits } from "../typescript/edits.ts";

const log = createPrinter("ts-to-js");

const compilerOptions: RawCompilerOptions = {
  target: ScriptTarget.ESNext,
  module: ModuleKind.ES2015,
};

const NEWLINE_SIGIL = `${EOL}//@@TS-MAGIC-NEWLINE@@${EOL}`;
const NEWLINE_SIGIL_SEARCH = /(\r?\n)?\s*\/\/@@TS-MAGIC-NEWLINE@@\r?\n/;

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
async function postTransform(outText: string): Promise<string> {
  // Replace the sigils that we inserted
  let text = outText.split(NEWLINE_SIGIL_SEARCH).join("\n\n");

  // Format first so that we can write matching regexps
  // that are humanly comprehensible
  text = await format(text, "babel");

  for (const [rx, replacement] of REGEX_STACK) {
    const match = typeof rx === "function" ? rx() : rx;
    text = text.replace(match, replacement);
  }

  // Format once more for the final output.
  return await format(text, "babel");
}

/**
 * Options for {@link convert}.
 */
export interface ConvertOptions {
  /**
   * The name of the module, which determines how it is parsed and appears in diagnostics.
   * Defaults to `module.ts`.
   */
  fileName?: string;
  /**
   * Compiler options to merge over the defaults.
   */
  compilerOptions?: RawCompilerOptions;
  /**
   * Whether to report the transpiler's syntactic diagnostics.
   */
  reportDiagnostics?: boolean;
  /**
   * Rewriters that inspect and change the TypeScript source before it is transpiled to JavaScript.
   * Each one sees the result of the one before it.
   */
  before?: SourceRewriter[];
  /**
   * Rewriters that inspect and change the transpiled JavaScript before it is formatted.
   * Each one sees the result of the one before it.
   */
  after?: SourceRewriter[];
}

/**
 * Parses text, runs rewriters over it one after another, and returns the rewritten text.
 */
function rewrite(
  api: API,
  fileName: string,
  text: string,
  rewriters: readonly SourceRewriter[] = [],
): string {
  return rewriters.reduce(
    (current, rewriter) =>
      withSourceFile(api, fileName, current, (sourceFile) =>
        applyTextEdits(current, rewriter({ api, sourceFile })),
      ),
    text,
  );
}

/**
 * A worker function that converts TypeScript source text to our standard
 * JavaScript, preserving the newline structure of the input module.
 *
 * @param srcText - contents of a TypeScript module source to convert
 * @param options - the module name, compiler options (merged over the defaults) and rewriters
 * @returns - an equivalent JavaScript module source
 */
export async function convert(srcText: string, options: ConvertOptions = {}): Promise<string> {
  // TypeScript doesn't preserve newlines in compiled JS output,
  // but we can pre-process each blank line by replacing it with a special
  // sigil (in a comment, since TS preserves comments
  const processedSrcText = srcText.split(/\n\s*\n/).join(NEWLINE_SIGIL);

  const fileName = options.fileName ?? "module.ts";

  const output = await withTypeScriptApi((api) => {
    // Whether the source is a module is decided by what it has before it is rewritten. A module stays a module when
    // the rewriters leave it without imports or exports (like a sample that only has a default export, which becomes
    // `module.exports`), but the emitter would take the result for a script and add "use strict".
    const isModule = withSourceFile(api, fileName, processedSrcText, isExternalModule);
    const transpiled = api.transpileModule(
      rewrite(api, fileName, processedSrcText, options.before),
      {
        compilerOptions: {
          ...compilerOptions,
          ...(isModule ? { moduleDetection: ModuleDetectionKind.Force } : {}),
          ...options.compilerOptions,
          removeComments: false,
        },
        fileName,
        reportDiagnostics: options.reportDiagnostics,
      },
    );
    return {
      ...transpiled,
      outputText: rewrite(
        api,
        fileName.replace(/\.[cm]?tsx?$/, ".js"),
        transpiled.outputText,
        options.after,
      ),
    };
  });

  if (output.diagnostics?.length) {
    log.error("TypeScript to JavaScript transpilation emitted errors:");

    const host: FormatDiagnosticsHost = {
      getNewLine: () => EOL,
      getCanonicalFileName: (path) => path,
      getCurrentDirectory: () => process.cwd(),
    };

    for (const diagnostic of output.diagnostics) {
      log(formatDiagnostics([diagnostic], host));
    }

    log.warn("Continuing anyway.");
  }

  return postTransform(output.outputText);
}
