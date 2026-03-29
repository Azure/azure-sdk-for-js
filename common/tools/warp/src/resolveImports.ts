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
// Direct import bypass validation
// ---------------------------------------------------------------------------

/** A direct import that bypasses the `#imports` mechanism. */
export interface DirectImportViolation {
  /** Absolute path of the source file containing the violation. */
  file: string;
  /** The relative import specifier that bypasses `#imports`. */
  specifier: string;
  /** The `#`-prefixed key that should be used instead. */
  suggestedImport: string;
  /** 1-based line number of the offending import. */
  line: number;
}

/**
 * A pattern entry from a wildcard imports map target.
 * The `*` in the target is replaced with a regex capture group.
 */
interface WildcardPattern {
  /** Regex that matches absolute file paths for this target pattern. */
  regex: RegExp;
  /** The `#`-prefixed key (with `*`) from the imports map, e.g., `#platform/*`. */
  key: string;
}

/**
 * Build lookup structures for matching resolved file paths against an imports map.
 *
 * Returns:
 * - `exactPaths`: Map from absolute path → `#key` for non-wildcard entries
 * - `wildcardPatterns`: Array of regex patterns for wildcard (`*`) entries
 */
export function buildImportTargetIndex(
  importsMap: ImportsMap,
  packageRoot: string,
): { exactPaths: Map<string, string>; wildcardPatterns: WildcardPattern[] } {
  const exactPaths = new Map<string, string>();
  const wildcardPatterns: WildcardPattern[] = [];
  // Deduplicate wildcard regexes by their source string
  const seenPatterns = new Set<string>();

  function collectFromTarget(target: PackageTarget, key: string, hasWildcard: boolean): void {
    if (target === null || target === undefined) return;
    if (typeof target === "string") {
      if (hasWildcard && target.includes("*")) {
        // Convert wildcard target to regex: "./src/*-browser.mts" → /^\/abs\/src\/(.+)-browser\.mts$/
        const abs = path.resolve(packageRoot, target);
        const escaped = abs.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regexSource = "^" + escaped.replace("\\*", "(.+)") + "$";
        if (!seenPatterns.has(regexSource)) {
          seenPatterns.add(regexSource);
          wildcardPatterns.push({ regex: new RegExp(regexSource), key });
        }
      } else {
        const abs = path.resolve(packageRoot, target);
        exactPaths.set(abs, key);
      }
      return;
    }
    if (Array.isArray(target)) {
      for (const item of target) collectFromTarget(item, key, hasWildcard);
      return;
    }
    // Conditional object — recurse into all branches
    for (const nested of Object.values(target)) {
      collectFromTarget(nested, key, hasWildcard);
    }
  }

  for (const [key, target] of Object.entries(importsMap)) {
    const asteriskCount = (key.match(/\*/g) || []).length;
    if (asteriskCount > 1) {
      throw new Error(`Invalid imports key "${key}": must contain at most one asterisk`);
    }
    collectFromTarget(target, key, asteriskCount === 1);
  }

  return { exactPaths, wildcardPatterns };
}

/**
 * Look up a resolved file path in the import target index.
 * Returns the `#`-prefixed key if the path is a target, or undefined.
 *
 * For wildcard matches, the `*` in the returned key is replaced with the
 * matched portion (e.g., `#platform/*` → `#platform/sha256`).
 */
function lookupImportTarget(
  resolvedPath: string,
  exactPaths: Map<string, string>,
  wildcardPatterns: WildcardPattern[],
): string | undefined {
  // Fast exact check first
  const exactKey = exactPaths.get(resolvedPath);
  if (exactKey) return exactKey;

  // Try wildcard patterns
  for (const { regex, key } of wildcardPatterns) {
    const match = resolvedPath.match(regex);
    if (match && match[1]) {
      // Replace * in key with matched portion
      return key.replace("*", match[1]);
    }
  }
  return undefined;
}

/**
 * Collect all concrete file paths that appear as targets in an imports map.
 *
 * Returns a map from the normalized absolute path of each target file to the
 * `#`-prefixed key that maps to it. Only includes non-wildcard entries.
 *
 * For wildcard-aware validation, use {@link buildImportTargetIndex} instead.
 */
export function collectImportTargetPaths(
  importsMap: ImportsMap,
  packageRoot: string,
): Map<string, string> {
  return buildImportTargetIndex(importsMap, packageRoot).exactPaths;
}

/**
 * Walk a parsed source file and collect every relative module specifier
 * (starting with `.`).
 */
function collectRelativeSpecifiers(sourceFile: ts.SourceFile): { text: string; line: number }[] {
  const specifiers: { text: string; line: number }[] = [];

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

    if (specNode && specNode.text.startsWith(".")) {
      const { line } = sourceFile.getLineAndCharacterOfPosition(specNode.getStart(sourceFile));
      specifiers.push({ text: specNode.text, line: line + 1 });
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return specifiers;
}

/**
 * Resolve a relative import specifier to an absolute file path, trying
 * TypeScript's extension resolution order.
 */
function resolveRelativeSpecifier(specifier: string, fromFile: string): string | undefined {
  const dir = path.dirname(fromFile);
  const base = path.resolve(dir, specifier);
  const ext = path.extname(base);

  // If the specifier already has an extension recognized by TS, resolve directly
  if (ext === ".js" || ext === ".mjs" || ext === ".cjs") {
    // .js → .ts, .mjs → .mts, .cjs → .cts
    const tsExt = ext === ".js" ? ".ts" : ext === ".mjs" ? ".mts" : ".cts";
    return base.slice(0, -ext.length) + tsExt;
  }
  if (ext === ".ts" || ext === ".mts" || ext === ".cts") {
    return base;
  }

  // No extension — try TypeScript extensions in order
  if (ts.sys.fileExists(base + ".ts")) return base + ".ts";
  // Directory import → index.ts
  const indexPath = path.join(base, "index.ts");
  if (ts.sys.fileExists(indexPath)) return indexPath;
  return undefined;
}

/**
 * Validate that no source file directly imports a file that should be accessed
 * via the `#imports` mechanism.
 *
 * Scans the provided source files for relative imports and checks whether any
 * of them resolve to a file that is a target in the package's imports map.
 *
 * @param sourceFiles - Absolute paths of source files to scan
 * @param importsMap - The package.json `imports` field
 * @param packageRoot - Absolute path to the package root
 * @returns Array of violations found
 */
export function validateNoDirectImports(
  sourceFiles: readonly string[],
  importsMap: ImportsMap,
  packageRoot: string,
): DirectImportViolation[] {
  const { exactPaths, wildcardPatterns } = buildImportTargetIndex(importsMap, packageRoot);
  const violations: DirectImportViolation[] = [];

  for (const filePath of sourceFiles) {
    // Skip platform implementation files — files that are behind import targets
    // and have platform-specific variants on disk. These files only run in their
    // respective platform builds, so their direct imports to other defaults are
    // correct (e.g., Node default importing another Node default).
    const selfKey = lookupImportTarget(filePath, exactPaths, wildcardPatterns);
    if (selfKey) {
      // Check whether this file has platform divergence (a variant for browser/react-native).
      // If it does, it's a platform implementation file and should be skipped.
      const selfDefault = resolveSubpathImport(selfKey, importsMap, new Set(["default"]));
      let hasSelfVariant = false;
      for (const platform of ["browser", "react-native"]) {
        const variant = resolveSubpathImport(selfKey, importsMap, new Set([platform, "default"]));
        if (
          variant !== selfDefault &&
          variant !== undefined &&
          ts.sys.fileExists(path.resolve(packageRoot, variant))
        ) {
          hasSelfVariant = true;
          break;
        }
      }
      if (hasSelfVariant) continue;
    }

    const content = ts.sys.readFile(filePath);
    if (!content) continue;

    // Quick check: skip files without any relative import
    if (!content.includes("./") && !content.includes("../")) continue;

    const sourceFile = ts.createSourceFile(
      path.basename(filePath),
      content,
      ts.ScriptTarget.Latest,
      /* setParentNodes */ false,
    );

    const relativeSpecifiers = collectRelativeSpecifiers(sourceFile);

    for (const { text: specifier, line } of relativeSpecifiers) {
      const resolved = resolveRelativeSpecifier(specifier, filePath);
      if (!resolved) continue;

      const key = lookupImportTarget(resolved, exactPaths, wildcardPatterns);
      if (!key) continue;

      // Check whether the imported file has actual platform divergence.
      // Only flag if a platform variant exists that differs from the default.
      // For example, importing `./helper.js` is fine if `#platform/helper`
      // has only a `default` entry and no browser/react-native variant.
      const isWildcard = key !== exactPaths.get(resolved);
      const defaultConditions = new Set(["default"]);
      const defaultResolved = resolveSubpathImport(key, importsMap, defaultConditions);
      const defaultAbsPath = defaultResolved ? path.resolve(packageRoot, defaultResolved) : null;

      if (resolved === defaultAbsPath || !isWildcard) {
        // Imported file is the default (or an exact match) — only flag if a variant exists.
        // For exact imports map entries, the variant is explicitly declared — trust it.
        // For wildcard entries, the variant path is pattern-generated, so check existence.
        let hasDivergence = false;
        for (const platform of ["browser", "react-native"]) {
          const platformConditions = new Set([platform, "default"]);
          const platformResolved = resolveSubpathImport(key, importsMap, platformConditions);
          if (platformResolved !== defaultResolved && platformResolved !== undefined) {
            if (!isWildcard || ts.sys.fileExists(path.resolve(packageRoot, platformResolved))) {
              hasDivergence = true;
              break;
            }
          }
        }
        if (!hasDivergence) continue;
      }
      // else (wildcard match, imported file IS a platform variant) — always flag

      violations.push({
        file: filePath,
        specifier,
        suggestedImport: key,
        line,
      });
    }
  }

  return violations;
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
