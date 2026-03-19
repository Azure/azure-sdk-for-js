// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Post-processing module for resolving Node.js subpath imports (`#`-prefixed
 * specifiers) in emitted JavaScript and declaration files.
 *
 * When a target has `resolveImports: true`, Warp reads the package's
 * `"imports"` field from package.json, resolves each `#`-prefixed specifier
 * using the target's export condition, and replaces it with a concrete
 * relative path in the output.
 *
 * This enables per-target type-checking via TypeScript's `customConditions`
 * while producing self-contained output that doesn't rely on runtime
 * `#imports` resolution.
 */

import * as fsp from "node:fs/promises";
import * as path from "node:path";
import ts from "typescript";
import { getLogger } from "./logger.ts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Conditional value in a package.json imports/exports field.
 * Can be a string (direct mapping), an object (conditional mapping),
 * or null (explicitly unmapped).
 */
type ConditionalValue = string | null | { [condition: string]: ConditionalValue };

/**
 * The imports field from package.json.
 */
export type ImportsMap = Record<string, ConditionalValue>;

// ---------------------------------------------------------------------------
// Node.js subpath imports resolution
// ---------------------------------------------------------------------------

/**
 * Resolve a Node.js subpath import specifier against a package.json imports
 * map.
 *
 * Implements the resolution algorithm from:
 * https://nodejs.org/api/packages.html#subpath-imports
 *
 * Supports:
 * - Exact matches: `#foo` → `"#foo": "./src/foo.ts"`
 * - Pattern matches: `#platform/interfaces` → `"#platform/*": "./src/*.ts"`
 * - Conditional values: `{ "browser": "...", "default": "..." }`
 * - Nested conditions
 *
 * @param specifier - The import specifier (e.g., `#platform/interfaces`)
 * @param importsMap - The `imports` field from package.json
 * @param conditions - Condition names active for this target
 * @returns The resolved path (relative to package root), or undefined if unresolvable
 */
export function resolveSubpathImport(
  specifier: string,
  importsMap: ImportsMap,
  conditions: ReadonlySet<string>,
): string | undefined {
  // 1. Exact match
  if (specifier in importsMap) {
    return resolveConditions(importsMap[specifier], conditions);
  }

  // 2. Pattern match — find best matching key with * (longest prefix wins)
  let bestKey: string | undefined;
  let bestPrefixLen = -1;

  for (const key of Object.keys(importsMap)) {
    const starIdx = key.indexOf("*");
    if (starIdx === -1) continue;

    const prefix = key.slice(0, starIdx);
    const suffix = key.slice(starIdx + 1);

    if (
      specifier.startsWith(prefix) &&
      (suffix === "" || specifier.endsWith(suffix)) &&
      specifier.length >= prefix.length + suffix.length &&
      prefix.length > bestPrefixLen
    ) {
      bestKey = key;
      bestPrefixLen = prefix.length;
    }
  }

  if (bestKey) {
    const starIdx = bestKey.indexOf("*");
    const prefix = bestKey.slice(0, starIdx);
    const suffix = bestKey.slice(starIdx + 1);
    const matched = suffix
      ? specifier.slice(prefix.length, -suffix.length)
      : specifier.slice(prefix.length);

    const resolved = resolveConditions(importsMap[bestKey], conditions);
    if (resolved) {
      return resolved.replaceAll("*", matched);
    }
  }

  return undefined;
}

/**
 * Resolve a conditional value by iterating through the object's keys
 * and checking each against the consumer's condition set.
 *
 * Follows Node.js resolution order: iterate object keys in definition
 * order, pick the first key that appears in the conditions set.
 */
function resolveConditions(
  value: ConditionalValue,
  conditions: ReadonlySet<string>,
): string | undefined {
  if (value === null) return undefined;
  if (typeof value === "string") return value;

  // Object: iterate keys in definition order
  for (const [key, nested] of Object.entries(value)) {
    if (conditions.has(key)) {
      return resolveConditions(nested, conditions);
    }
  }

  return undefined;
}

// ---------------------------------------------------------------------------
// Source → output path mapping
// ---------------------------------------------------------------------------

/**
 * Map a source file path to its output file path.
 *
 * Given a source path relative to the package root (from imports resolution),
 * compute the corresponding output path in outDir.
 *
 * Extensions are mapped:
 * - .mts → .mjs
 * - .cts → .cjs
 * - .ts  → .js
 */
export function sourcePathToOutputPath(
  sourcePath: string,
  rootDir: string,
  outDir: string,
  packageRoot: string,
): string {
  // sourcePath is relative to package root (from imports field), e.g., "./src/foo-browser.mts"
  const absSource = path.resolve(packageRoot, sourcePath);
  const relToRoot = path.relative(rootDir, absSource);

  // Map extension
  const ext = path.extname(relToRoot);
  let outExt: string;
  switch (ext) {
    case ".mts":
      outExt = ".mjs";
      break;
    case ".cts":
      outExt = ".cjs";
      break;
    default:
      outExt = ".js";
      break;
  }

  const outRel = relToRoot.slice(0, -ext.length) + outExt;
  return path.join(outDir, outRel);
}

// ---------------------------------------------------------------------------
// Content transformation (AST-based)
// ---------------------------------------------------------------------------

/**
 * A module specifier location extracted from the AST.
 *
 * `start` and `end` are character offsets into the source text and span the
 * full string literal including its quotes (e.g., `"#platform/interfaces"`).
 */
interface SpecifierLocation {
  /** Offset of the opening quote in the source text. */
  start: number;
  /** Offset just past the closing quote in the source text. */
  end: number;
  /** The unquoted specifier text (e.g., `#platform/interfaces`). */
  text: string;
}

/**
 * Walk a parsed source file and collect every module specifier that is a
 * `#`-prefixed string literal.
 *
 * Covers:
 * - `import … from "#…"`
 * - `export … from "#…"`
 * - `export * from "#…"`
 * - `import("#…")` (dynamic)
 * - `require("#…")`
 * - `import type … from "#…"` (declaration files)
 */
function collectHashSpecifiers(sourceFile: ts.SourceFile): SpecifierLocation[] {
  const specifiers: SpecifierLocation[] = [];

  function visit(node: ts.Node): void {
    let specNode: ts.StringLiteral | undefined;

    if (ts.isImportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      specNode = node.moduleSpecifier;
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      specNode = node.moduleSpecifier;
    } else if (ts.isCallExpression(node)) {
      const expr = node.expression;
      if (
        (expr.kind === ts.SyntaxKind.ImportKeyword ||
          (ts.isIdentifier(expr) && expr.text === "require")) &&
        node.arguments.length > 0 &&
        ts.isStringLiteral(node.arguments[0]!)
      ) {
        specNode = node.arguments[0] as ts.StringLiteral;
      }
    }

    if (specNode && specNode.text.startsWith("#")) {
      specifiers.push({
        start: specNode.getStart(sourceFile),
        end: specNode.end,
        text: specNode.text,
      });
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return specifiers;
}

/** Resolved specifier info returned from content transformation. */
interface ResolvedTarget {
  /** The original `#`-prefixed specifier. */
  specifier: string;
  /** The absolute output path the specifier resolved to. */
  resolvedPath: string;
}

/**
 * Resolve all `#`-prefixed import specifiers in a file's content using
 * TypeScript's AST to locate module specifier positions precisely.
 *
 * Only specifiers in actual import/export declarations and dynamic
 * import()/require() calls are rewritten.  `#` characters inside comments,
 * ordinary string literals, or template expressions are never touched.
 *
 * @param content - The file content to transform
 * @param outputFilePath - Absolute path to the output file (for relative path computation)
 * @param importsMap - The package.json imports field
 * @param conditions - Active conditions for this target
 * @param rootDir - Absolute path to the source root directory
 * @param outDir - Absolute path to the output directory
 * @param packageRoot - Absolute path to the package root
 * @returns The modified content, whether any changes were made, unresolved specifiers, and resolved targets
 */
export function resolveImportsInContent(
  content: string,
  outputFilePath: string,
  importsMap: ImportsMap,
  conditions: ReadonlySet<string>,
  rootDir: string,
  outDir: string,
  packageRoot: string,
): { content: string; changed: boolean; unresolved: string[]; resolvedTargets: ResolvedTarget[] } {
  const sourceFile = ts.createSourceFile(
    path.basename(outputFilePath),
    content,
    ts.ScriptTarget.Latest,
    /* setParentNodes */ true,
  );

  const specifiers = collectHashSpecifiers(sourceFile);
  if (specifiers.length === 0) {
    return { content, changed: false, unresolved: [], resolvedTargets: [] };
  }

  // Build replacements (we process in reverse order to preserve offsets)
  const replacements: { start: number; end: number; replacement: string }[] = [];
  const unresolved: string[] = [];
  const resolvedTargets: ResolvedTarget[] = [];

  for (const { start, end, text: specifier } of specifiers) {
    const resolved = resolveSubpathImport(specifier, importsMap, conditions);
    if (!resolved) {
      unresolved.push(specifier);
      continue;
    }

    const outputTarget = sourcePathToOutputPath(resolved, rootDir, outDir, packageRoot);
    resolvedTargets.push({ specifier, resolvedPath: outputTarget });
    let relativePath = path.relative(path.dirname(outputFilePath), outputTarget);

    // Ensure relative path starts with ./ or ../
    if (!relativePath.startsWith(".")) {
      relativePath = "./" + relativePath;
    }

    // Normalize to forward slashes (Windows compatibility)
    relativePath = relativePath.split(path.sep).join("/");

    // Preserve the original quote character
    const quote = content[start];
    replacements.push({ start, end, replacement: `${quote}${relativePath}${quote}` });
  }

  if (replacements.length === 0) {
    return { content, changed: false, unresolved, resolvedTargets };
  }

  // Apply replacements in reverse order so earlier offsets remain valid
  let result = content;
  for (let i = replacements.length - 1; i >= 0; i--) {
    const { start, end, replacement } = replacements[i]!;
    result = result.slice(0, start) + replacement + result.slice(end);
  }

  return { content: result, changed: true, unresolved, resolvedTargets };
}

// ---------------------------------------------------------------------------
// Directory-level post-processing
// ---------------------------------------------------------------------------

const MAX_RESOLVE_CONCURRENCY = 64;

/** An unresolved `#`-prefixed specifier found in output. */
export interface UnresolvedSpecifier {
  /** Absolute path of the file containing the unresolved specifier. */
  file: string;
  /** The `#`-prefixed specifier that could not be resolved. */
  specifier: string;
}

/** A resolved import whose target file does not exist on disk. */
export interface MissingResolvedTarget {
  /** Absolute path of the file containing the import. */
  file: string;
  /** The `#`-prefixed specifier that was resolved. */
  specifier: string;
  /** The resolved output path that does not exist. */
  resolvedPath: string;
}

export interface ResolveImportsResult {
  filesProcessed: number;
  filesChanged: number;
  /** `#`-prefixed specifiers that could not be resolved against the imports map. */
  unresolvedSpecifiers: UnresolvedSpecifier[];
  /** Resolved import targets whose output files do not exist on disk. */
  missingTargets: MissingResolvedTarget[];
}

/**
 * Post-process all files in an output directory to resolve `#`-prefixed
 * import specifiers.
 *
 * Scans for `.js`, `.mjs`, `.cjs`, `.d.ts`, `.d.mts`, `.d.cts` files,
 * resolves `#`-prefixed specifiers using the package's imports map, and
 * writes back any files that changed.
 *
 * Also reports:
 * - Unresolved specifiers (specifiers that don't match any entry in the imports map)
 * - Missing targets (specifiers that resolved to a path that doesn't exist on disk)
 */
export async function resolveImportsInDir(
  outDir: string,
  importsMap: ImportsMap,
  conditions: ReadonlySet<string>,
  rootDir: string,
  packageRoot: string,
): Promise<ResolveImportsResult> {
  const log = getLogger();

  // Find all emitted files (JS + declarations)
  const entries = await fsp.readdir(outDir, { withFileTypes: true, recursive: true });
  const files: string[] = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const name = entry.name;
    if (
      name.endsWith(".js") ||
      name.endsWith(".mjs") ||
      name.endsWith(".cjs") ||
      name.endsWith(".d.ts") ||
      name.endsWith(".d.mts") ||
      name.endsWith(".d.cts")
    ) {
      const parentPath = entry.parentPath ?? (entry as { path: string }).path;
      files.push(path.join(parentPath, name));
    }
  }

  let filesChanged = 0;
  const unresolvedSpecifiers: UnresolvedSpecifier[] = [];
  // Collect all resolved output paths per file for post-verification
  const resolvedPathsByFile: { file: string; specifier: string; resolvedPath: string }[] = [];

  // Process files with bounded concurrency
  let nextIndex = 0;
  const concurrency = Math.max(1, Math.min(MAX_RESOLVE_CONCURRENCY, files.length));

  await Promise.all(
    Array.from({ length: concurrency }, async () => {
      while (true) {
        const idx = nextIndex++;
        if (idx >= files.length) return;
        const filePath = files[idx]!;

        const content = await fsp.readFile(filePath, "utf-8");

        // Quick check: skip files without any # character
        if (!content.includes("#")) continue;

        const result = resolveImportsInContent(
          content,
          filePath,
          importsMap,
          conditions,
          rootDir,
          outDir,
          packageRoot,
        );

        // Track unresolved specifiers
        for (const specifier of result.unresolved) {
          unresolvedSpecifiers.push({ file: filePath, specifier });
        }

        // Collect resolved paths for post-verification (from the same pass — no re-parse)
        for (const { specifier, resolvedPath } of result.resolvedTargets) {
          resolvedPathsByFile.push({ file: filePath, specifier, resolvedPath });
        }

        if (result.changed) {
          await fsp.writeFile(filePath, result.content, "utf-8");
          filesChanged++;
        }
      }
    }),
  );

  // Verify resolved paths exist on disk — deduplicate and batch access checks
  const missingTargets: MissingResolvedTarget[] = [];
  const uniquePaths = new Set(resolvedPathsByFile.map((r) => r.resolvedPath));
  const missingPaths = new Set<string>();

  // Batch all fsp.access calls concurrently
  await Promise.all(
    [...uniquePaths].map(async (resolvedPath) => {
      try {
        await fsp.access(resolvedPath);
      } catch {
        missingPaths.add(resolvedPath);
      }
    }),
  );

  // Build missing targets list from the missing set
  if (missingPaths.size > 0) {
    const seen = new Set<string>();
    for (const { file, specifier, resolvedPath } of resolvedPathsByFile) {
      if (!missingPaths.has(resolvedPath)) continue;
      const key = `${file}:${specifier}`;
      if (seen.has(key)) continue;
      seen.add(key);
      missingTargets.push({ file, specifier, resolvedPath });
    }
  }

  if (filesChanged > 0) {
    log.verbose(
      `[warp] resolveImports: ${filesChanged}/${files.length} files updated in ${path.basename(outDir)}`,
    );
  }

  return { filesProcessed: files.length, filesChanged, unresolvedSpecifiers, missingTargets };
}

// ---------------------------------------------------------------------------
// Package.json imports reading
// ---------------------------------------------------------------------------

/** Narrow `unknown` to a plain object record. */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Read the `imports` field from package.json.
 * Returns the imports map, or undefined if not present.
 */
export async function readPackageImports(packageRoot: string): Promise<ImportsMap | undefined> {
  const pkgPath = path.join(packageRoot, "package.json");
  try {
    const raw: unknown = JSON.parse(await fsp.readFile(pkgPath, "utf-8"));
    if (isRecord(raw) && "imports" in raw && isRecord(raw.imports)) {
      return raw.imports as ImportsMap;
    }
  } catch {
    // no package.json or parse error
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Condition set builder
// ---------------------------------------------------------------------------

/**
 * Build the conditions set for a target.
 *
 * The set includes:
 * - The target's condition (e.g., "browser", "react-native")
 * - Module-type condition: "import" for ESM, "require" for CJS
 * - "default" always
 */
export function buildConditionsSet(
  targetCondition: string,
  moduleType: "module" | "commonjs",
): ReadonlySet<string> {
  const conditions = new Set<string>();
  conditions.add(targetCondition);

  if (moduleType === "module") {
    conditions.add("import");
  } else {
    conditions.add("require");
  }

  // "default" is always included
  conditions.add("default");

  return conditions;
}
