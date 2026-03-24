// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Post-processing module for resolving Node.js subpath imports (`#`-prefixed
 * specifiers) in emitted JavaScript and declaration files.
 *
 * When a package has an `"imports"` field in package.json, Warp reads it,
 * resolves each `#`-prefixed specifier using the target's export conditions,
 * and replaces it with a concrete relative path in the output.
 *
 * The resolution algorithm follows the Node.js specification:
 * https://nodejs.org/api/esm.html#resolution-algorithm-specification
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
 * A package target value in the imports/exports field.
 *
 * Per the Node.js spec, a target can be:
 * - `string` — a direct file path mapping
 * - `null` — explicitly unmapped (the specifier is intentionally excluded)
 * - `object` — a conditional mapping (`{ condition: target }`)
 * - `array` — a fallback list (try each target in order until one resolves)
 */
type PackageTarget = string | null | { [condition: string]: PackageTarget } | PackageTarget[];

/**
 * The imports field from package.json.
 */
export type ImportsMap = Record<string, PackageTarget>;

// ---------------------------------------------------------------------------
// Node.js subpath imports resolution
// ---------------------------------------------------------------------------

/**
 * Resolve a Node.js subpath import specifier against a package.json imports
 * map.
 *
 * Implements PACKAGE_IMPORTS_EXPORTS_RESOLVE from the Node.js spec:
 * https://nodejs.org/api/esm.html#resolution-algorithm-specification
 *
 * 1. Exact key match (no wildcard) → resolve target
 * 2. Pattern key match (contains `*`) → sort by PATTERN_KEY_COMPARE,
 *    extract the matched portion, resolve target with substitution
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
  // Step 1: Exact match — key has no wildcard
  if (specifier in importsMap) {
    return resolvePackageTarget(importsMap[specifier], conditions, null);
  }

  // Step 2: Pattern match — get pre-sorted pattern keys, try each in order.
  const patternKeys = getSortedPatternKeys(importsMap);

  for (const key of patternKeys) {
    const starIdx = key.indexOf("*");
    const prefix = key.slice(0, starIdx);
    const suffix = key.slice(starIdx + 1);

    if (
      specifier.startsWith(prefix) &&
      specifier.length >= key.length && // spec: matchKey.length >= expansionKey.length (pattern match must be ≥1 char)
      (suffix === "" || specifier.endsWith(suffix))
    ) {
      const patternMatch = suffix
        ? specifier.slice(prefix.length, -suffix.length)
        : specifier.slice(prefix.length);
      return resolvePackageTarget(importsMap[key], conditions, patternMatch);
    }
  }

  return undefined;
}

/**
 * Resolve a package target value.
 *
 * Implements PACKAGE_TARGET_RESOLVE from the Node.js spec:
 * - `string` → return as-is (with `*` substitution if patternMatch is set)
 * - `null` → explicitly unmapped, return undefined
 * - `object` → conditional: iterate keys in definition order, recurse on
 *   the first key present in the conditions set
 * - `array` → fallback list: try each element, return first resolved value
 *
 * @param target - The target value from the imports map entry
 * @param conditions - Active condition names
 * @param patternMatch - The portion of the specifier matched by `*`, or null for exact matches
 */
function resolvePackageTarget(
  target: PackageTarget,
  conditions: ReadonlySet<string>,
  patternMatch: string | null,
): string | undefined {
  if (target === null || target === undefined) return undefined;

  if (typeof target === "string") {
    return patternMatch !== null ? target.replaceAll("*", patternMatch) : target;
  }

  // Array: fallback list — try each element in order
  if (Array.isArray(target)) {
    for (const item of target) {
      const resolved = resolvePackageTarget(item, conditions, patternMatch);
      if (resolved !== undefined) return resolved;
    }
    return undefined;
  }

  // Object: conditional — iterate keys in definition order
  for (const [key, nested] of Object.entries(target)) {
    if (conditions.has(key)) {
      return resolvePackageTarget(nested, conditions, patternMatch);
    }
  }

  return undefined;
}

/**
 * Compare two pattern keys per the Node.js PATTERN_KEY_COMPARE algorithm.
 *
 * Sort order:
 * 1. Longer prefix (position of `*`) first
 * 2. For equal prefix length, longer key (i.e. longer suffix) first
 */
function patternKeyCompare(a: string, b: string): number {
  const aStar = a.indexOf("*");
  const bStar = b.indexOf("*");
  if (aStar !== bStar) return bStar - aStar;
  if (a.length !== b.length) return b.length - a.length;
  return 0;
}

/**
 * Cache sorted pattern keys per imports map object to avoid re-filtering
 * and re-sorting on every `resolveSubpathImport` call.
 */
const sortedPatternKeysCache = new WeakMap<ImportsMap, string[]>();

function getSortedPatternKeys(importsMap: ImportsMap): string[] {
  let keys = sortedPatternKeysCache.get(importsMap);
  if (!keys) {
    keys = Object.keys(importsMap).filter((k) => k.includes("*"));
    keys.sort(patternKeyCompare);
    sortedPatternKeysCache.set(importsMap, keys);
  }
  return keys;
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

    if (
      ts.isImportDeclaration(node) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      specNode = node.moduleSpecifier;
    } else if (
      ts.isExportDeclaration(node) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      specNode = node.moduleSpecifier;
    } else if (ts.isCallExpression(node)) {
      const expr = node.expression;
      const firstArg = node.arguments[0];
      if (
        (expr.kind === ts.SyntaxKind.ImportKeyword ||
          (ts.isIdentifier(expr) && expr.text === "require")) &&
        firstArg &&
        ts.isStringLiteral(firstArg)
      ) {
        specNode = firstArg;
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
    /* setParentNodes */ false,
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
    const { start, end, replacement } = replacements[i];
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
      // parentPath added in Node 20.12; falls back to legacy .path property
      const dir = entry.parentPath ?? (entry as { path: string }).path;
      files.push(path.join(dir, name));
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
        const filePath = files[idx];

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

/** Validate that a value conforms to the PackageTarget shape (recursive). */
function isPackageTarget(value: unknown): value is PackageTarget {
  if (value === null || typeof value === "string") return true;
  if (Array.isArray(value)) return value.every(isPackageTarget);
  if (isRecord(value)) return Object.values(value).every(isPackageTarget);
  return false;
}

/** Narrow a record to an ImportsMap by validating all values are PackageTargets. */
function isImportsMap(value: Record<string, unknown>): value is ImportsMap {
  return Object.values(value).every(isPackageTarget);
}

/**
 * Read the `imports` field from package.json.
 * Returns the imports map, or undefined if not present or malformed.
 */
export async function readPackageImports(packageRoot: string): Promise<ImportsMap | undefined> {
  const pkgPath = path.join(packageRoot, "package.json");
  try {
    const raw: unknown = JSON.parse(await fsp.readFile(pkgPath, "utf-8"));
    if (isRecord(raw) && "imports" in raw && isRecord(raw.imports) && isImportsMap(raw.imports)) {
      return raw.imports;
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
 * Build the full set of active conditions for a target.
 *
 * Mirrors the conditions Node.js uses at runtime:
 * - `customConditions` from the target's tsconfig (e.g., `["browser"]`)
 * - Module-type condition: `"import"` for ESM, `"require"` for CJS
 * - `"default"` — always present (the universal fallback)
 *
 * This is the single source of truth for condition sets — both compilation
 * fingerprinting and post-compilation import resolution use this function.
 */
export function buildConditionsSet(
  customConditions: readonly string[] | undefined,
  moduleType: "module" | "commonjs",
): ReadonlySet<string> {
  const conditions = new Set<string>();

  if (customConditions) {
    for (const c of customConditions) conditions.add(c);
  }

  conditions.add(moduleType === "module" ? "import" : "require");
  conditions.add("default");

  return conditions;
}
