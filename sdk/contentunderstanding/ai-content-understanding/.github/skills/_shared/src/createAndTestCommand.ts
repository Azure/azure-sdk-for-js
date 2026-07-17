// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Stage 2 of the analyzer-authoring loop (single-document-type variant):
 * validate the schema locally, create the analyzer, batch-test inputs, dump
 * per-document JSON + LLM-friendly markdown (best-effort), and print a
 * stdout summary with per-field fill-rate + avg-confidence. Mirrors Python's
 * create_and_test.py, .NET's CreateAndTestCommand.cs, and Java's
 * CreateAndTestCommand.java.
 */

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { ContentUnderstandingClient } from "@azure/ai-content-understanding";
import { toLlmInput } from "@azure/ai-content-understanding";
import {
  buildClient,
  capturedAnalyzeBinary,
  createAnalyzerRaw,
  enumerateInputs,
  guessContentType,
  readFileBytes,
  stripExtension,
} from "./clientHelpers.js";
import { validateFile } from "./schemaValidator.js";

export interface CreateAndTestOptions {
  schema: string;
  input: string;
  output: string;
  analyzerId: string;
  iterations: number;
  ephemeral: boolean;
  reuse: boolean;
}

interface NamedDoc {
  name: string;
  doc: Record<string, unknown>;
}

export async function runCreateAndTest(args: string[]): Promise<number> {
  const opts = parseArgs(args);
  if (!opts) {
    return 2;
  }
  return runCore(opts);
}

export async function runCore(opts: CreateAndTestOptions): Promise<number> {
  // 1. Validate schema locally.
  const validation = validateFile(opts.schema);
  if (!validation.ok) {
    for (const e of validation.errors) {
      console.error(`[VALIDATE] ${e}`);
    }
    return 2;
  }

  const rawJson = readFileSync(opts.schema, "utf-8");
  const rawSchema = JSON.parse(rawJson) as Record<string, unknown>;
  const schema = stripComments(rawSchema) as Record<string, unknown>;

  // Pre-flight warning: fieldSchema without models.completion.
  if ("fieldSchema" in schema) {
    const models = schema["models"];
    const completion =
      models && typeof models === "object" && !Array.isArray(models)
        ? (models as Record<string, unknown>)["completion"]
        : undefined;
    if (typeof completion !== "string" || completion.trim() === "") {
      console.error(
        "[WARN]   schema has fieldSchema but no models.completion; " +
          "this will fail unless resource defaults are configured " +
          "(see samples-dev/updateDefaults.ts).",
      );
    }
  }

  const inputs = enumerateInputs(opts.input);
  if (inputs.length === 0) {
    console.error(`no supported documents found under ${opts.input}`);
    return 2;
  }
  mkdirSync(opts.output, { recursive: true });

  let analyzerId = opts.analyzerId;
  if (!analyzerId) {
    const stem = stripExtension(
      opts.schema.substring(opts.schema.lastIndexOf("/") + 1),
    );
    analyzerId = opts.reuse
      ? `${stem}_${schemaHash(schema)}`
      : `${stem}_${Math.floor(Date.now() / 1000)}`;
  }

  const client = buildClient();
  let reused = false;
  let fail = 0;
  const results: NamedDoc[] = [];
  try {
    if (opts.reuse) {
      reused = await ensureAnalyzer(client, analyzerId, schema);
    } else {
      await createAnalyzer(client, analyzerId, schema);
    }
    for (const file of inputs) {
      for (let iter = 1; iter <= opts.iterations; iter++) {
        const suffix =
          opts.iterations > 1 ? `_iter${String(iter).padStart(3, "0")}` : "";
        const stem = stripExtension(
          file.substring(file.lastIndexOf("/") + 1),
        );
        const outPath = join(opts.output, `${stem}${suffix}.json`);
        try {
          console.log(`[ANALYZE] ${file} -> ${outPath}`);
          const r = await analyzeFile(client, analyzerId, file);
          writeFileSync(outPath, JSON.stringify(r.doc, null, 2));
          if (r.llmMarkdown) {
            writeFileSync(
              join(opts.output, `${stem}${suffix}.llm.md`),
              r.llmMarkdown,
            );
          }
          results.push({
            name: stripExtension(outPath.substring(outPath.lastIndexOf("/") + 1)),
            doc: r.doc,
          });
        } catch (ex) {
          const msg = ex instanceof Error ? ex.message : String(ex);
          console.error(`[FAIL]   ${file}: ${msg}`);
          fail++;
        }
      }
    }
  } finally {
    await cleanup(client, analyzerId, opts.ephemeral, reused);
  }

  console.log(summarize(results));
  return fail === 0 ? 0 : 1;
}

// ---------------------------------------------------------------------------
// Service interaction
// ---------------------------------------------------------------------------

export async function ensureAnalyzer(
  client: ContentUnderstandingClient,
  analyzerId: string,
  schema: Record<string, unknown>,
): Promise<boolean> {
  try {
    await client.getAnalyzer(analyzerId);
    console.log(`[REUSE]   analyzer ${analyzerId} already exists`);
    return true;
  } catch {
    // Treat any error as "not found" — the next createAnalyzer call will
    // surface the real reason if it's something else (auth, etc.). Mirrors
    // Python's broad-except in ensure_analyzer.
  }
  await createAnalyzer(client, analyzerId, schema);
  return false;
}

export async function createAnalyzer(
  client: ContentUnderstandingClient,
  analyzerId: string,
  schema: Record<string, unknown>,
): Promise<void> {
  console.log(`[CREATE] analyzer_id=${analyzerId}`);
  await createAnalyzerRaw(client, analyzerId, schema);
  console.log(`[CREATE] ${analyzerId} ready`);
}

export async function analyzeFile(
  client: ContentUnderstandingClient,
  analyzerId: string,
  filePath: string,
): Promise<{ doc: Record<string, unknown>; llmMarkdown: string | null }> {
  const bytes = readFileBytes(filePath);
  const contentType = guessContentType(filePath);
  const doc = await capturedAnalyzeBinary(client, analyzerId, bytes, contentType);

  // Best-effort LLM-friendly markdown. The toLlmInput helper expects the
  // typed model; cast through unknown since our `doc` is the raw shape.
  let llmMarkdown: string | null = null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    llmMarkdown = toLlmInput(doc as any);
  } catch {
    // Raw JSON is always written; LLM text is optional.
  }
  return { doc, llmMarkdown };
}

async function cleanup(
  client: ContentUnderstandingClient,
  analyzerId: string,
  ephemeral: boolean,
  reused: boolean,
): Promise<void> {
  if (ephemeral) {
    try {
      console.log(`[CLEANUP] delete analyzer ${analyzerId}`);
      await client.deleteAnalyzer(analyzerId);
    } catch (ex) {
      const msg = ex instanceof Error ? ex.message : String(ex);
      console.error(`[CLEANUP] delete failed: ${msg}`);
    }
  } else if (reused) {
    console.log(`[KEEP]    reused analyzer ${analyzerId} retained`);
  } else {
    console.log(
      `[KEEP]    analyzer ${analyzerId} retained (use --ephemeral to delete)`,
    );
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Recursively drop any object key whose name starts with `_`. */
export function stripComments(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(stripComments);
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (k.startsWith("_")) {
        continue;
      }
      out[k] = stripComments(v);
    }
    return out;
  }
  return value;
}

/** Stable 8-char sha1 over canonical JSON form. */
export function schemaHash(schema: Record<string, unknown>): string {
  const canonical = canonicalize(schema);
  return createHash("sha1").update(canonical).digest("hex").substring(0, 8);
}

export function canonicalize(value: unknown): string {
  return JSON.stringify(sortKeys(value));
}

function sortKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortKeys);
  }
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(obj).sort()) {
      out[k] = sortKeys(obj[k]);
    }
    return out;
  }
  return value;
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

interface RowEntry {
  docName: string;
  value: unknown;
  confidence: number | null;
}

interface FieldRecord {
  category: string;
  fieldPath: string;
  fieldVal: Record<string, unknown>;
}

export function summarize(results: NamedDoc[]): string {
  // category -> field -> rows
  const table = new Map<string, Map<string, RowEntry[]>>();
  for (const nd of results) {
    for (const f of iterFields(nd.doc)) {
      let perCat = table.get(f.category);
      if (!perCat) {
        perCat = new Map();
        table.set(f.category, perCat);
      }
      let rows = perCat.get(f.fieldPath);
      if (!rows) {
        rows = [];
        perCat.set(f.fieldPath, rows);
      }
      rows.push({
        docName: nd.name,
        value: fieldValue(f.fieldVal),
        confidence: fieldConfidence(f.fieldVal),
      });
    }
  }
  if (table.size === 0) {
    return "[SUMMARY] no fields extracted across any document.";
  }

  const lines: string[] = ["", "=".repeat(72), "[SUMMARY]"];
  for (const [category, perField] of table.entries()) {
    const docNames = new Set<string>();
    for (const rows of perField.values()) {
      for (const r of rows) {
        docNames.add(r.docName);
      }
    }
    const nDocs = docNames.size;
    const catLabel = category === "" ? "(single)" : category;
    const header = `category: ${catLabel}  (${nDocs} document${nDocs === 1 ? "" : "s"})`;
    lines.push("", header, "-".repeat(header.length));
    lines.push(
      `  ${"field".padEnd(40)} fill rate   avg conf`,
    );
    for (const [fname, rows] of perField.entries()) {
      const denom = rows.length;
      const filled = rows.filter((r) => r.value !== null);
      const fillRate = denom === 0 ? 0 : filled.length / denom;
      const confidences = filled
        .map((r) => r.confidence)
        .filter((c): c is number => c !== null);
      const confStr =
        confidences.length === 0
          ? "  n/a"
          : (confidences.reduce((a, b) => a + b, 0) / confidences.length).toFixed(3);
      lines.push(
        `  ${fname.padEnd(40)} ${(fillRate * 100).toFixed(1).padStart(5)}%      ${confStr}`,
      );
    }
  }

  // Lowest-confidence triples across all categories.
  const lows: { conf: number; cat: string; field: string; doc: string }[] = [];
  for (const [category, perField] of table.entries()) {
    for (const [fname, rows] of perField.entries()) {
      for (const r of rows) {
        if (r.value !== null && r.confidence !== null) {
          lows.push({ conf: r.confidence, cat: category, field: fname, doc: r.docName });
        }
      }
    }
  }
  if (lows.length > 0) {
    lows.sort((a, b) => a.conf - b.conf);
    lines.push("", "lowest-confidence fields:");
    for (const row of lows.slice(0, 3)) {
      const catTag = row.cat === "" ? "" : `[${row.cat}] `;
      lines.push(
        `  ${row.conf.toFixed(3)}  ${catTag}${row.field}  (${row.doc})`,
      );
    }
  }
  lines.push("=".repeat(72));
  return lines.join("\n");
}

export function iterFields(doc: Record<string, unknown>): FieldRecord[] {
  const out: FieldRecord[] = [];
  const contents = doc["contents"];
  if (!Array.isArray(contents)) {
    return out;
  }
  for (const content of contents) {
    if (!content || typeof content !== "object" || Array.isArray(content)) {
      continue;
    }
    const cObj = content as Record<string, unknown>;
    const category = typeof cObj["category"] === "string" ? (cObj["category"] as string) : "";
    const fields = cObj["fields"];
    if (!fields || typeof fields !== "object" || Array.isArray(fields)) {
      continue;
    }
    for (const [fname, fval] of Object.entries(fields as Record<string, unknown>)) {
      if (!fval || typeof fval !== "object" || Array.isArray(fval)) {
        continue;
      }
      for (const pl of recurse(fname, fval as Record<string, unknown>)) {
        out.push({ category, fieldPath: pl.path, fieldVal: pl.leaf });
      }
    }
  }
  return out;
}

function recurse(
  prefix: string,
  fieldVal: Record<string, unknown>,
): { path: string; leaf: Record<string, unknown> }[] {
  const out: { path: string; leaf: Record<string, unknown> }[] = [];
  const arr = fieldVal["valueArray"];
  if (Array.isArray(arr)) {
    for (const item of arr) {
      if (
        item &&
        typeof item === "object" &&
        !Array.isArray(item) &&
        (item as Record<string, unknown>)["valueObject"] &&
        typeof (item as Record<string, unknown>)["valueObject"] === "object" &&
        !Array.isArray((item as Record<string, unknown>)["valueObject"])
      ) {
        const vobj = (item as Record<string, unknown>)["valueObject"] as Record<string, unknown>;
        for (const [childName, childVal] of Object.entries(vobj)) {
          if (childVal && typeof childVal === "object" && !Array.isArray(childVal)) {
            out.push(
              ...recurse(`${prefix}[].${childName}`, childVal as Record<string, unknown>),
            );
          }
        }
      } else {
        let wrap: Record<string, unknown>;
        if (typeof item === "string") {
          wrap = { valueString: item };
        } else if (item && typeof item === "object" && !Array.isArray(item)) {
          wrap = { ...(item as Record<string, unknown>) };
        } else {
          wrap = {};
        }
        out.push({ path: prefix, leaf: wrap });
      }
    }
    return out;
  }
  const obj = fieldVal["valueObject"];
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    for (const [childName, childVal] of Object.entries(obj as Record<string, unknown>)) {
      if (childVal && typeof childVal === "object" && !Array.isArray(childVal)) {
        out.push(
          ...recurse(`${prefix}.${childName}`, childVal as Record<string, unknown>),
        );
      }
    }
    return out;
  }
  out.push({ path: prefix, leaf: fieldVal });
  return out;
}

function fieldValue(field: Record<string, unknown>): unknown {
  for (const key of [
    "valueString",
    "valueNumber",
    "valueInteger",
    "valueBoolean",
    "valueDate",
    "valueTime",
  ]) {
    const v = field[key];
    if (v !== undefined && v !== null && !(typeof v === "string" && v === "")) {
      return v;
    }
  }
  const arr = field["valueArray"];
  if (Array.isArray(arr) && arr.length > 0) {
    return arr;
  }
  const obj = field["valueObject"];
  if (obj && typeof obj === "object" && !Array.isArray(obj) && Object.keys(obj).length > 0) {
    return obj;
  }
  return null;
}

function fieldConfidence(field: Record<string, unknown>): number | null {
  const c = field["confidence"];
  return typeof c === "number" ? c : null;
}

// ---------------------------------------------------------------------------
// CLI parsing
// ---------------------------------------------------------------------------

function parseArgs(args: string[]): CreateAndTestOptions | null {
  const opts: CreateAndTestOptions = {
    schema: "",
    input: "",
    output: "",
    analyzerId: "",
    iterations: 1,
    ephemeral: false,
    reuse: false,
  };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--schema":
        opts.schema = args[++i];
        break;
      case "--input":
        opts.input = args[++i];
        break;
      case "--output":
        opts.output = args[++i];
        break;
      case "--analyzer-id":
        opts.analyzerId = args[++i];
        break;
      case "--iterations":
        opts.iterations = parseInt(args[++i], 10);
        break;
      case "--ephemeral":
        opts.ephemeral = true;
        break;
      case "--reuse":
        opts.reuse = true;
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
  if (!opts.schema || !opts.input || !opts.output) {
    console.error("--schema, --input, and --output are required");
    printUsage();
    return null;
  }
  if (opts.iterations < 1) {
    console.error("--iterations must be >= 1");
    return null;
  }
  return opts;
}

function printUsage(): void {
  console.error("Usage:");
  console.error("  cu-skill create-and-test");
  console.error("    --schema <file>");
  console.error("    --input <file-or-folder>");
  console.error("    --output <dir>");
  console.error("    [--analyzer-id <id>]");
  console.error("    [--iterations N]");
  console.error("    [--ephemeral]");
  console.error("    [--reuse]");
  console.error("");
  console.error(
    "Stage 2 (single-type): validate, create, batch-test a custom analyzer,",
  );
  console.error("print a per-field fill-rate + avg-confidence summary.");
}
