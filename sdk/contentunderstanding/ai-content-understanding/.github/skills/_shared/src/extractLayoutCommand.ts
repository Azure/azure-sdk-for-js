// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Stage 1 of the analyzer-authoring loop: extract document layout into
 * <file>.layout.{json,md} files. Mirrors Python's extract_layout.py, the
 * .NET ExtractLayoutCommand.cs, and the Java ExtractLayoutCommand.java.
 *
 * Defaults to analyzerId = prebuilt-documentSearch (richer markdown than
 * prebuilt-document) so the layout output is useful as Copilot context.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  buildClient,
  capturedAnalyzeBinary,
  enumerateInputs,
  guessContentType,
  readFileBytes,
  stripExtension,
} from "./clientHelpers.js";

interface Options {
  input: string;
  output: string;
  analyzerId: string;
}

export async function runExtractLayout(args: string[]): Promise<number> {
  const opts = parseArgs(args);
  if (!opts) {
    return 2;
  }
  const inputs = enumerateInputs(opts.input);
  if (inputs.length === 0) {
    console.error(`no supported documents found under ${opts.input}`);
    return 2;
  }
  mkdirSync(opts.output, { recursive: true });

  const client = buildClient();
  let ok = 0;
  let fail = 0;
  for (const file of inputs) {
    const stem = stripExtension(file.substring(file.lastIndexOf("/") + 1));
    try {
      console.log(
        `[RUN ] ${file} -> ${opts.output}/${stem}.layout.{json,md}`,
      );
      const bytes = readFileBytes(file);
      const contentType = guessContentType(file);
      const payload = await capturedAnalyzeBinary(
        client,
        opts.analyzerId,
        bytes,
        contentType,
      );

      writeFileSync(
        join(opts.output, `${stem}.layout.json`),
        JSON.stringify(payload, null, 2),
      );

      const markdown = extractMarkdown(payload);
      writeFileSync(join(opts.output, `${stem}.layout.md`), markdown);
      ok++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[FAIL] ${file}: ${msg}`);
      fail++;
    }
  }

  console.log();
  console.log(
    `[DONE] ${ok} ok, ${fail} failed; output -> ${opts.output}`,
  );
  return fail === 0 ? 0 : 1;
}

function extractMarkdown(payload: Record<string, unknown>): string {
  const contents = payload["contents"];
  if (!Array.isArray(contents)) {
    return "";
  }
  for (const c of contents) {
    if (c && typeof c === "object" && !Array.isArray(c)) {
      const md = (c as Record<string, unknown>)["markdown"];
      if (typeof md === "string" && md.length > 0) {
        return md;
      }
    }
  }
  return "";
}

function parseArgs(args: string[]): Options | null {
  let input: string | undefined;
  let output: string | undefined;
  let analyzerId = "prebuilt-documentSearch";
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--input":
        input = args[++i];
        break;
      case "--output":
        output = args[++i];
        break;
      case "--analyzer-id":
        analyzerId = args[++i];
        break;
      case "-h":
      case "--help":
        printUsage();
        return null;
      default:
        console.error(`unknown argument: ${args[i]}`);
        printUsage();
        return null;
    }
  }
  if (!input || !output) {
    console.error("--input and --output are required");
    printUsage();
    return null;
  }
  return { input, output, analyzerId };
}

function printUsage(): void {
  console.error("Usage:");
  console.error(
    "  cu-skill extract-layout --input <file-or-folder> --output <dir> [--analyzer-id <id>]",
  );
  console.error();
  console.error("Stage 1: extract layout JSON + markdown for each input document.");
}
