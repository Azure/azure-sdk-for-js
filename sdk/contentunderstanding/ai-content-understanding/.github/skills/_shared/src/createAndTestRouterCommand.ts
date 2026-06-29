// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Stage 2 (classify-and-route variant): given an outer classifier schema and
 * N inner field-extractor schemas, create all of them, wire the outer's
 * `contentCategories[*].analyzerId` to the real inner analyzer IDs,
 * batch-test inputs, and print a category-aware stdout summary. Mirrors
 * Python's create_and_test_router.py, .NET's CreateAndTestRouterCommand.cs,
 * and Java's CreateAndTestRouterCommand.java.
 */

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { ContentUnderstandingClient } from "@azure/ai-content-understanding";
import {
  analyzeFile,
  canonicalize,
  createAnalyzer,
  ensureAnalyzer,
  iterFields,
  stripComments,
} from "./createAndTestCommand.js";
import {
  buildClient,
  enumerateInputs,
  stripExtension,
} from "./clientHelpers.js";
import { validateFile } from "./schemaValidator.js";

interface RouterOptions {
  outerSchema: string;
  innerSchemas: string[];
  schemaDir: string | null;
  input: string;
  output: string;
  analyzerId: string;
  ephemeral: boolean;
  reuse: boolean;
}

interface NamedDoc {
  name: string;
  doc: Record<string, unknown>;
}

export async function runCreateAndTestRouter(args: string[]): Promise<number> {
  const opts = parseArgs(args);
  if (!opts) {
    return 2;
  }
  if (!existsSync(opts.outerSchema)) {
    console.error(`outer schema not found: ${opts.outerSchema}`);
    return 2;
  }
  if (!existsSync(opts.input)) {
    console.error(`input not found: ${opts.input}`);
    return 2;
  }

  // 1. Resolve inner schemas.
  const aliasToPath = new Map<string, string>();
  for (const spec of opts.innerSchemas) {
    const eq = spec.indexOf("=");
    if (eq <= 0) {
      console.error(`--inner-schema must be ALIAS=PATH; got: ${spec}`);
      return 2;
    }
    const alias = spec.substring(0, eq);
    const path = spec.substring(eq + 1);
    if (!existsSync(path)) {
      console.error(`inner schema not found: ${path}`);
      return 2;
    }
    aliasToPath.set(alias, path);
  }
  if (opts.schemaDir) {
    if (!statSync(opts.schemaDir).isDirectory()) {
      console.error(`--schema-dir is not a directory: ${opts.schemaDir}`);
      return 2;
    }
    for (const name of readdirSync(opts.schemaDir).sort()) {
      if (name.endsWith(".json")) {
        const alias = stripExtension(name);
        if (!aliasToPath.has(alias)) {
          aliasToPath.set(alias, join(opts.schemaDir, name));
        }
      }
    }
  }
  if (aliasToPath.size === 0) {
    console.error("provide at least one --inner-schema or --schema-dir");
    return 2;
  }

  // 2. Validate outer + each inner locally.
  const outerVal = validateFile(opts.outerSchema);
  if (!outerVal.ok) {
    for (const e of outerVal.errors) {
      console.error(`[VALIDATE outer] ${e}`);
    }
    return 2;
  }
  const outerSchema = stripComments(
    JSON.parse(readFileSync(opts.outerSchema, "utf-8")),
  ) as Record<string, unknown>;

  const aliasToSchema = new Map<string, Record<string, unknown>>();
  for (const [alias, path] of aliasToPath.entries()) {
    const r = validateFile(path);
    if (!r.ok) {
      for (const msg of r.errors) {
        console.error(`[VALIDATE inner ${alias}] ${msg}`);
      }
      return 2;
    }
    aliasToSchema.set(
      alias,
      stripComments(JSON.parse(readFileSync(path, "utf-8"))) as Record<string, unknown>,
    );
  }

  // Cross-check: every contentCategories[alias].analyzerId placeholder in
  // the outer schema should have a matching inner alias.
  const config = outerSchema["config"];
  if (config && typeof config === "object" && !Array.isArray(config)) {
    const cats = (config as Record<string, unknown>)["contentCategories"];
    if (cats && typeof cats === "object" && !Array.isArray(cats)) {
      for (const [cat, catEntry] of Object.entries(cats as Record<string, unknown>)) {
        if (
          catEntry &&
          typeof catEntry === "object" &&
          !Array.isArray(catEntry) &&
          "analyzerId" in catEntry &&
          !aliasToSchema.has(cat)
        ) {
          console.error(
            `[VALIDATE] outer category '${cat}' references an inner analyzer ` +
              `but no --inner-schema with that alias was provided`,
          );
          return 2;
        }
      }
    }
  }

  const inputs = enumerateInputs(opts.input);
  if (inputs.length === 0) {
    console.error(`no supported documents found under ${opts.input}`);
    return 2;
  }
  mkdirSync(opts.output, { recursive: true });

  // 3. Compute deterministic IDs (or timestamp IDs when --reuse not set).
  let outerId = opts.analyzerId;
  if (!outerId) {
    const stem = stripExtension(
      opts.outerSchema.substring(opts.outerSchema.lastIndexOf("/") + 1),
    );
    // Include the inner hashes in the outer hash so any inner-schema edit
    // forces a fresh outer ID. Otherwise --reuse could pick up an outer
    // that points at stale inner IDs.
    const innerKeysSorted = [...aliasToSchema.keys()].sort();
    let combined = canonicalize(outerSchema);
    for (const alias of innerKeysSorted) {
      combined += `|${alias}=${canonicalize(aliasToSchema.get(alias)!)}`;
    }
    outerId = opts.reuse
      ? `${stem}_${sha1Prefix(combined)}`
      : `${stem}_${Math.floor(Date.now() / 1000)}`;
  }

  const aliasToId = new Map<string, string>();
  for (const [alias, schema] of aliasToSchema.entries()) {
    const suffix = opts.reuse
      ? sha1Prefix(canonicalize(schema))
      : String(Math.floor(Date.now() / 1000));
    aliasToId.set(alias, `${outerId}_inner_${alias}_${suffix}`);
  }

  // 4. Patch outer schema to point at the real inner IDs.
  const wiredOuter = wireInnerIds(outerSchema, aliasToId);

  const client = buildClient();
  let reused = false;
  let fail = 0;
  const results: NamedDoc[] = [];
  try {
    // 5. Create all inner analyzers first.
    for (const [alias, schema] of aliasToSchema.entries()) {
      const id = aliasToId.get(alias)!;
      if (opts.reuse) {
        await ensureAnalyzer(client, id, schema);
      } else {
        await createAnalyzer(client, id, schema);
      }
    }
    // 6. Then the outer classifier.
    if (opts.reuse) {
      reused = await ensureAnalyzer(client, outerId, wiredOuter);
    } else {
      await createAnalyzer(client, outerId, wiredOuter);
    }

    // 7. Analyze inputs through the outer.
    for (const file of inputs) {
      const stem = stripExtension(file.substring(file.lastIndexOf("/") + 1));
      const outPath = join(opts.output, `${stem}.json`);
      try {
        console.log(`[ANALYZE] ${file} -> ${outPath}`);
        const r = await analyzeFile(client, outerId, file);
        writeFileSync(outPath, JSON.stringify(r.doc, null, 2));
        if (r.llmMarkdown) {
          writeFileSync(
            join(opts.output, `${stem}.llm.md`),
            r.llmMarkdown,
          );
        }
        results.push({ name: stem, doc: r.doc });
      } catch (ex) {
        const msg = ex instanceof Error ? ex.message : String(ex);
        console.error(`[FAIL]    ${file}: ${msg}`);
        fail++;
      }
    }
  } finally {
    if (opts.ephemeral) {
      const toDelete = [outerId, ...aliasToId.values()];
      for (const id of toDelete) {
        try {
          console.log(`[CLEANUP] delete ${id}`);
          await client.deleteAnalyzer(id);
        } catch (ex) {
          const msg = ex instanceof Error ? ex.message : String(ex);
          console.error(`[CLEANUP] delete failed for ${id}: ${msg}`);
        }
      }
    } else if (reused) {
      console.log(`[KEEP]    reused analyzers retained`);
    } else {
      console.log(
        `[KEEP]    analyzers retained (use --ephemeral to delete)`,
      );
      console.log(`           outer: ${outerId}`);
      for (const [alias, id] of aliasToId.entries()) {
        console.log(`           inner [${alias}]: ${id}`);
      }
    }
  }

  console.log(summarizeRouted(results));
  return fail === 0 ? 0 : 1;
}

export function wireInnerIds(
  outerSchema: Record<string, unknown>,
  aliasToId: Map<string, string>,
): Record<string, unknown> {
  const out = JSON.parse(JSON.stringify(outerSchema)) as Record<string, unknown>;
  const config = out["config"];
  if (!config || typeof config !== "object" || Array.isArray(config)) {
    return out;
  }
  const cats = (config as Record<string, unknown>)["contentCategories"];
  if (!cats || typeof cats !== "object" || Array.isArray(cats)) {
    return out;
  }
  for (const [alias, entry] of Object.entries(cats as Record<string, unknown>)) {
    if (
      entry &&
      typeof entry === "object" &&
      !Array.isArray(entry) &&
      aliasToId.has(alias)
    ) {
      (entry as Record<string, unknown>)["analyzerId"] = aliasToId.get(alias);
    }
  }
  return out;
}

interface RowEntry {
  docName: string;
  value: unknown;
  confidence: number | null;
}

export function summarizeRouted(results: NamedDoc[]): string {
  const table = new Map<string, Map<string, RowEntry[]>>();
  const segmentsPerCategory = new Map<string, number>();
  for (const nd of results) {
    const segCounts = new Map<string, number>();
    const contents = nd.doc["contents"];
    if (Array.isArray(contents)) {
      for (const c of contents) {
        const cat =
          c && typeof c === "object" && !Array.isArray(c) && typeof (c as Record<string, unknown>)["category"] === "string"
            ? ((c as Record<string, unknown>)["category"] as string)
            : "";
        segCounts.set(cat, (segCounts.get(cat) ?? 0) + 1);
      }
    }
    for (const [cat, count] of segCounts.entries()) {
      segmentsPerCategory.set(cat, (segmentsPerCategory.get(cat) ?? 0) + count);
    }
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
        value: fieldValueRouted(f.fieldVal),
        confidence: fieldConfRouted(f.fieldVal),
      });
    }
  }
  if (table.size === 0) {
    return "[SUMMARY] (category-aware) no fields extracted across any document.";
  }
  const lines: string[] = ["", "=".repeat(72), "[SUMMARY] (category-aware)"];
  const cats = [...table.keys()].sort();
  for (const cat of cats) {
    const label = cat === "" ? "(uncategorized)" : cat;
    const segCount = segmentsPerCategory.get(cat) ?? 0;
    const header = `category: ${label}  (${segCount} segment${segCount === 1 ? "" : "s"})`;
    lines.push("", header, "-".repeat(header.length));
    lines.push(`  ${"field".padEnd(30)} fill rate   avg conf`);
    const perField = table.get(cat)!;
    const fieldEntries = [...perField.entries()].sort((a, b) =>
      a[0].localeCompare(b[0]),
    );
    for (const [fname, rows] of fieldEntries) {
      // Use the field's own row count as the denominator so array leaves
      // don't inflate the rate. Mirrors single-type create-and-test.
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
        `  ${fname.padEnd(30)} ${(fillRate * 100).toFixed(1).padStart(5)}%      ${confStr}`,
      );
    }
  }
  // Lowest-confidence triples.
  const lows: { conf: number; cat: string; field: string; doc: string }[] = [];
  for (const [cat, perField] of table.entries()) {
    for (const [fname, rows] of perField.entries()) {
      for (const r of rows) {
        if (r.value !== null && r.confidence !== null) {
          lows.push({ conf: r.confidence, cat, field: fname, doc: r.docName });
        }
      }
    }
  }
  if (lows.length > 0) {
    lows.sort((a, b) => a.conf - b.conf);
    lines.push("", "lowest-confidence fields across all categories:");
    for (const row of lows.slice(0, 3)) {
      lines.push(
        `  ${row.conf.toFixed(3)}  [${row.cat}] ${row.field}  (${row.doc})`,
      );
    }
  }
  lines.push("=".repeat(72));
  return lines.join("\n");
}

function fieldValueRouted(field: Record<string, unknown>): unknown {
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

function fieldConfRouted(field: Record<string, unknown>): number | null {
  const c = field["confidence"];
  return typeof c === "number" ? c : null;
}

function sha1Prefix(s: string): string {
  return createHash("sha1").update(s).digest("hex").substring(0, 8);
}

function parseArgs(args: string[]): RouterOptions | null {
  const opts: RouterOptions = {
    outerSchema: "",
    innerSchemas: [],
    schemaDir: null,
    input: "",
    output: "",
    analyzerId: "",
    ephemeral: false,
    reuse: false,
  };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--outer-schema":
        opts.outerSchema = args[++i];
        break;
      case "--inner-schema":
        opts.innerSchemas.push(args[++i]);
        break;
      case "--schema-dir":
        opts.schemaDir = args[++i];
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
  if (!opts.outerSchema || !opts.input || !opts.output) {
    console.error("--outer-schema, --input, and --output are required");
    printUsage();
    return null;
  }
  if (opts.innerSchemas.length === 0 && !opts.schemaDir) {
    console.error(
      "provide at least one --inner-schema ALIAS=PATH or --schema-dir DIR",
    );
    printUsage();
    return null;
  }
  return opts;
}

function printUsage(): void {
  console.error("Usage:");
  console.error("  cu-skill create-and-test-router");
  console.error("    --outer-schema <file>");
  console.error(
    "    (--inner-schema ALIAS=PATH [--inner-schema ...] | --schema-dir <dir>)",
  );
  console.error("    --input <file-or-folder>");
  console.error("    --output <dir>");
  console.error("    [--analyzer-id <id>]");
  console.error("    [--ephemeral]");
  console.error("    [--reuse]");
  console.error("");
  console.error(
    "Classify-and-route Stage 2: validate, create N inner analyzers + 1",
  );
  console.error("outer classifier, batch-test, print a category-aware summary.");
}
