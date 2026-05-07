// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Import chain tracing module for debugging platform-specific import resolution.
 *
 * The `trace` command walks the import graph from each exported entry point
 * and shows how `#`-prefixed imports resolve under each target's conditions.
 * This helps catch bugs like a browser entry point accidentally importing
 * a Node-only module, or vice versa.
 *
 * Example output:
 *
 *   Target: esm (conditions: import, module)
 *   └─ ./src/index.ts
 *      └─ #platform/indexPlatform → ./src/indexPlatform.ts
 *         └─ ./src/policies/StorageBrowserPolicyV2.ts  (Node no-op)
 *
 *   Target: browser (conditions: import, module, browser)
 *   └─ ./src/index.ts
 *      └─ #platform/indexPlatform → ./src/indexPlatform-browser.mts
 *         └─ ./src/policies/StorageBrowserPolicyV2-browser.mts  (browser)
 *
 * This makes it obvious when resolutions differ across targets.
 */

import * as fsp from "node:fs/promises";
import * as fs from "node:fs";
import * as path from "node:path";
import ts from "typescript";
import type { WarpConfig, WarpTarget } from "./types.ts";
import { parseTargetTsConfig } from "./compiler.ts";
import {
  resolveSubpathImport,
  buildConditionsSet,
  readPackageImports,
  type ImportsMap,
} from "./resolveImports.ts";
import { getLogger } from "./logger.ts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A single node in the import graph. */
export interface ImportNode {
  /** The specifier used in the import (e.g., "#platform/indexPlatform" or "./foo.ts") */
  specifier: string;
  /** Absolute path to the resolved source file (undefined if unresolved) */
  resolvedPath: string | undefined;
  /** Relative path for display (undefined if unresolved) */
  displayPath: string | undefined;
  /** Whether this is a `#`-prefixed platform import */
  isPlatformImport: boolean;
  /** Child imports from this file */
  children: ImportNode[];
  /** Annotation for the resolved file (e.g., "(Node no-op)" or "(browser)") */
  annotation?: string;
  /** Warning if this import bypasses platform resolution */
  warning?: string;
}

/** Import graph for a single target. */
export interface TargetImportGraph {
  target: WarpTarget;
  conditions: ReadonlySet<string>;
  /** Entry points from the exports map */
  entryPoints: ImportNode[];
}

/** Warning about a potential platform import misconfiguration */
export interface PlatformWarning {
  /** Type of warning */
  type: "missing-platform-import" | "wrong-variant";
  /** Target where the issue was found */
  target: string;
  /** File containing the problematic import */
  file: string;
  /** The import specifier */
  specifier: string;
  /** Human-readable message */
  message: string;
  /** Suggested fix */
  suggestion?: string;
}

/** Result of tracing imports across all targets. */
export interface TraceResult {
  /** Per-target import graphs */
  graphs: TargetImportGraph[];
  /** Cross-target comparison: specifiers that resolve differently */
  divergences: ImportDivergence[];
  /** Warnings about potential misconfigurations */
  warnings: PlatformWarning[];
}

/** A specifier that resolves to different files across targets. */
export interface ImportDivergence {
  /** The `#`-prefixed specifier */
  specifier: string;
  /** How it resolves in each target */
  resolutions: { target: string; resolvedPath: string | undefined }[];
  /** Source files that import this specifier */
  importedFrom: string[];
}

// ---------------------------------------------------------------------------
// Annotation detection
// ---------------------------------------------------------------------------

/**
 * Detect annotations for a resolved file based on naming conventions.
 *
 * We use naming patterns to infer the intended platform:
 * - Files ending in `-browser.mts` or `-browser.ts` → "(browser)"
 * - Files ending in `-native.mts` or `-native.ts` → "(react-native)"
 * - Platform entry files with "Node" in name → "(Node no-op)"
 */
function detectAnnotation(
  resolvedPath: string | undefined,
  targetName: string,
): string | undefined {
  if (!resolvedPath) return "(unresolved)";

  const basename = path.basename(resolvedPath);
  const filePlatform = detectFilePlatform(resolvedPath);

  if (!filePlatform) return undefined;

  // Check if the file's platform matches the current target
  const normalizedTarget = targetName.toLowerCase();
  const normalizedPlatform = filePlatform.toLowerCase();

  if (normalizedTarget === normalizedPlatform) {
    return `(${filePlatform})`;
  }

  // Cross-target import! Highlight it
  return `(${filePlatform} ⚠️ imported by ${targetName})`;
}

/**
 * Detect the platform suffix from a file path.
 */
function detectFilePlatform(filePath: string): string | undefined {
  const basename = path.basename(filePath);

  if (basename.includes("-browser.")) return "browser";
  if (basename.includes("-react-native.")) return "react-native";
  if (basename.includes("-native.")) return "react-native";
  if (basename.includes("-node.")) return "node";
  if (basename.includes("-workerd.")) return "workerd";

  return undefined;
}

/**
 * Check if a direct import should have used a #platform import instead.
 * Uses the package.json imports field to determine if a #platform equivalent exists.
 */
function checkMissingPlatformImport(
  specifier: string,
  resolvedPath: string | undefined,
  fromFile: string,
  targetName: string,
  importsMap: ImportsMap | undefined,
  conditions: ReadonlySet<string>,
  packageRoot: string,
): PlatformWarning | undefined {
  if (specifier.startsWith("#") || !resolvedPath || !importsMap) return undefined;

  const fromPlatform = detectFilePlatform(fromFile);
  if (!fromPlatform) return undefined;

  const relPath = specifier.replace(/^\.\//, "").replace(/\.(js|ts|mts|mjs)$/, "");
  const platformSpecifier = `#platform/${relPath}`;
  const platformResolved = resolveSubpathImport(platformSpecifier, importsMap, conditions);
  if (!platformResolved) return undefined;

  const platformAbsPath = path.resolve(packageRoot, platformResolved);
  if (!fs.existsSync(platformAbsPath)) return undefined;

  if (platformAbsPath !== resolvedPath) {
    return {
      type: "missing-platform-import",
      target: targetName,
      file: fromFile,
      specifier,
      message: `imports "${path.relative(packageRoot, resolvedPath)}" but #platform resolves to "${path.relative(packageRoot, platformAbsPath)}"`,
      suggestion: `Use "${platformSpecifier}" to get the correct ${targetName} variant`,
    };
  }

  return undefined;
}

// ---------------------------------------------------------------------------
// Import extraction
// ---------------------------------------------------------------------------

/**
 * Extract all import specifiers from a TypeScript source file.
 */
async function extractImports(filePath: string): Promise<string[]> {
  let content: string;
  try {
    content = await fsp.readFile(filePath, "utf-8");
  } catch {
    return [];
  }

  const sourceFile = ts.createSourceFile(
    path.basename(filePath),
    content,
    ts.ScriptTarget.Latest,
    false,
  );

  const specifiers: string[] = [];

  function visit(node: ts.Node): void {
    // Static imports: import ... from "..."
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      specifiers.push(node.moduleSpecifier.text);
    }

    // Re-exports: export ... from "..."
    if (
      ts.isExportDeclaration(node) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      specifiers.push(node.moduleSpecifier.text);
    }

    // Dynamic imports: import("...")
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      const arg = node.arguments[0];
      if (arg && ts.isStringLiteral(arg)) {
        specifiers.push(arg.text);
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return specifiers;
}

// ---------------------------------------------------------------------------
// Build-time validation
// ---------------------------------------------------------------------------

/** Violation found during platform import validation. */
export interface PlatformImportViolation {
  file: string;
  line: number;
  specifier: string;
  suggestedImport: string;
  targetPlatform: string;
}

/**
 * Validate that platform-specific files use #platform imports correctly.
 * Returns violations that should fail the build.
 */
export async function validatePlatformImports(
  _sourceFiles: readonly string[],
  importsMap: ImportsMap,
  packageRoot: string,
): Promise<PlatformImportViolation[]> {
  const violations: PlatformImportViolation[] = [];

  // Scan src/ directory for platform-specific files since tsconfig may not include them
  const srcDir = path.join(packageRoot, "src");
  const platformFiles = findPlatformFiles(srcDir);

  for (const filePath of platformFiles) {
    const platform = detectFilePlatform(filePath);
    if (!platform) continue;

    const content = ts.sys.readFile(filePath);
    if (!content) continue;

    const sourceFile = ts.createSourceFile(
      path.basename(filePath),
      content,
      ts.ScriptTarget.Latest,
      true,
    );

    const conditions = new Set([platform, "import", "default"]);

    ts.forEachChild(sourceFile, function visit(node) {
      let specifier: string | undefined;
      if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
        specifier = node.moduleSpecifier.text;
      } else if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
        specifier = node.moduleSpecifier.text;
      }

      if (specifier && specifier.startsWith(".") && !specifier.startsWith("#")) {
        const fromDir = path.dirname(filePath);
        const resolved = path.resolve(fromDir, specifier);
        const relPath = specifier.replace(/^\.\//, "").replace(/\.(js|ts|mts|mjs)$/, "");
        const platformSpecifier = `#platform/${relPath}`;
        const platformResolved = resolveSubpathImport(platformSpecifier, importsMap, conditions);

        if (platformResolved) {
          const platformAbsPath = path.resolve(packageRoot, platformResolved);
          const exists = fs.existsSync(platformAbsPath);
          if (exists && platformAbsPath !== resolved) {
            const line = sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
            violations.push({
              file: filePath,
              line,
              specifier,
              suggestedImport: platformSpecifier,
              targetPlatform: platform,
            });
          }
        }
      }

      ts.forEachChild(node, visit);
    });
  }

  const log = getLogger();
  log.info(`[warp] Validated ${platformFiles.length} platform-specific file(s)`);

  return violations;
}

/**
 * Find all platform-specific files in a directory tree.
 */
function findPlatformFiles(dir: string): string[] {
  const result: string[] = [];
  if (!fs.existsSync(dir)) return result;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...findPlatformFiles(fullPath));
    } else if (entry.isFile() && detectFilePlatform(fullPath)) {
      result.push(fullPath);
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Import resolution
// ---------------------------------------------------------------------------

/**
 * Resolve a specifier to an absolute source file path.
 */
function resolveSpecifier(
  specifier: string,
  fromFile: string,
  importsMap: ImportsMap | undefined,
  conditions: ReadonlySet<string>,
  packageRoot: string,
): string | undefined {
  // Handle `#`-prefixed imports via the imports map
  if (specifier.startsWith("#")) {
    if (!importsMap) return undefined;
    const resolved = resolveSubpathImport(specifier, importsMap, conditions);
    if (!resolved) return undefined;
    return path.resolve(packageRoot, resolved);
  }

  // Handle relative imports
  if (specifier.startsWith(".")) {
    const fromDir = path.dirname(fromFile);
    const resolved = path.resolve(fromDir, specifier);

    // If it already has an extension and exists, use it
    if (path.extname(resolved) && fs.existsSync(resolved)) {
      return resolved;
    }

    // Try adding extensions if the path doesn't exist
    const extensions = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs"];
    if (!path.extname(resolved)) {
      for (const ext of extensions) {
        const withExt = resolved + ext;
        if (fs.existsSync(withExt)) {
          return withExt;
        }
      }
      // Try index files
      for (const ext of extensions) {
        const indexFile = path.join(resolved, "index" + ext);
        if (fs.existsSync(indexFile)) {
          return indexFile;
        }
      }
    }
    return resolved;
  }

  // External package imports - skip
  return undefined;
}

// ---------------------------------------------------------------------------
// Graph building
// ---------------------------------------------------------------------------

/**
 * Build the import graph recursively from a starting file.
 */
async function buildImportGraph(
  specifier: string,
  resolvedPath: string | undefined,
  importsMap: ImportsMap | undefined,
  conditions: ReadonlySet<string>,
  packageRoot: string,
  visited: Set<string>,
  depth: number,
  maxDepth: number,
  targetName: string,
  warnings: PlatformWarning[],
  fromFile?: string,
): Promise<ImportNode> {
  const isPlatformImport = specifier.startsWith("#");
  const displayPath = resolvedPath ? path.relative(packageRoot, resolvedPath) : undefined;
  const annotation = detectAnnotation(resolvedPath, targetName);

  let warning: string | undefined;
  if (fromFile && resolvedPath) {
    const platformWarning = checkMissingPlatformImport(
      specifier,
      resolvedPath,
      fromFile,
      targetName,
      importsMap,
      conditions,
      packageRoot,
    );
    if (platformWarning) {
      warnings.push(platformWarning);
      warning = `⚠️ ${platformWarning.suggestion}`;
    }
  }

  const node: ImportNode = {
    specifier,
    resolvedPath,
    displayPath,
    isPlatformImport,
    children: [],
    annotation,
    warning,
  };

  if (depth >= maxDepth || !resolvedPath || visited.has(resolvedPath)) {
    return node;
  }

  visited.add(resolvedPath);

  const imports = await extractImports(resolvedPath);

  for (const importSpec of imports) {
    if (importSpec.startsWith("#") || importSpec.startsWith(".")) {
      const childResolved = resolveSpecifier(
        importSpec,
        resolvedPath,
        importsMap,
        conditions,
        packageRoot,
      );

      const childNode = await buildImportGraph(
        importSpec,
        childResolved,
        importsMap,
        conditions,
        packageRoot,
        visited,
        depth + 1,
        maxDepth,
        targetName,
        warnings,
        resolvedPath,
      );

      const isCrossTargetImport = childNode.annotation?.includes("⚠️") ?? false;
      const hasWarning = !!childNode.warning;
      if (childNode.isPlatformImport || childNode.children.length > 0 || isCrossTargetImport || hasWarning) {
        node.children.push(childNode);
      }
    }
  }

  return node;
}

// ---------------------------------------------------------------------------
// Divergence detection
// ---------------------------------------------------------------------------

/**
 * Find specifiers that resolve differently across targets.
 */
function findDivergences(graphs: TargetImportGraph[]): ImportDivergence[] {
  // Collect all resolutions per specifier
  const resolutionsBySpecifier = new Map<
    string,
    {
      resolutions: { target: string; resolvedPath: string | undefined }[];
      importedFrom: Set<string>;
    }
  >();

  function collectFromNode(node: ImportNode, target: string, fromFile?: string): void {
    if (node.isPlatformImport) {
      let entry = resolutionsBySpecifier.get(node.specifier);
      if (!entry) {
        entry = { resolutions: [], importedFrom: new Set() };
        resolutionsBySpecifier.set(node.specifier, entry);
      }

      // Add this target's resolution if not already present
      if (!entry.resolutions.some((r) => r.target === target)) {
        entry.resolutions.push({ target, resolvedPath: node.resolvedPath });
      }

      if (fromFile) {
        entry.importedFrom.add(fromFile);
      }
    }

    for (const child of node.children) {
      collectFromNode(child, target, node.resolvedPath);
    }
  }

  for (const graph of graphs) {
    for (const entry of graph.entryPoints) {
      collectFromNode(entry, graph.target.name);
    }
  }

  // Filter to only divergent specifiers
  const divergences: ImportDivergence[] = [];

  for (const [specifier, { resolutions, importedFrom }] of resolutionsBySpecifier) {
    const uniquePaths = new Set(resolutions.map((r) => r.resolvedPath ?? "undefined"));
    if (uniquePaths.size > 1) {
      divergences.push({
        specifier,
        resolutions,
        importedFrom: [...importedFrom],
      });
    }
  }

  return divergences.sort((a, b) => a.specifier.localeCompare(b.specifier));
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

const ANSI_RESET = "\x1b[0m";
const ANSI_DIM = "\x1b[2m";
const ANSI_CYAN = "\x1b[36m";
const ANSI_YELLOW = "\x1b[33m";
const ANSI_GREEN = "\x1b[32m";
const ANSI_RED = "\x1b[31m";

/**
 * Format an import node as a tree.
 */
function formatNode(
  node: ImportNode,
  packageRoot: string,
  prefix: string,
  isLast: boolean,
  useColor: boolean,
): string[] {
  const lines: string[] = [];

  const connector = isLast ? "└─" : "├─";
  const childPrefix = prefix + (isLast ? "   " : "│  ");

  let line = prefix + connector + " ";

  if (node.isPlatformImport) {
    // Show: #specifier → resolved-path (annotation)
    line += useColor ? ANSI_CYAN + node.specifier + ANSI_RESET : node.specifier;
    line += " → ";
    line += node.displayPath ?? "(unresolved)";
  } else {
    // Show just the resolved path for regular imports
    line += node.displayPath ?? node.specifier;
  }

  if (node.annotation) {
    line += " ";
    if (useColor) {
      const color = node.annotation.includes("unresolved")
        ? ANSI_RED
        : node.annotation.includes("browser")
          ? ANSI_GREEN
          : ANSI_YELLOW;
      line += color + node.annotation + ANSI_RESET;
    } else {
      line += node.annotation;
    }
  }

  lines.push(line);

  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    const childIsLast = i === node.children.length - 1;
    lines.push(...formatNode(child, packageRoot, childPrefix, childIsLast, useColor));
  }

  return lines;
}

/**
 * Format the full trace result.
 */
export function formatTraceResult(result: TraceResult, packageRoot: string): string {
  const useColor = process.stdout.isTTY ?? false;
  const lines: string[] = [];

  // Section 0: Warnings (most critical - show first if any)
  if (result.warnings.length > 0) {
    lines.push("╔══════════════════════════════════════════════════════════════╗");
    lines.push("║  ⚠️  WARNINGS - Potential Platform Import Issues              ║");
    lines.push("╚══════════════════════════════════════════════════════════════╝");
    lines.push("");

    for (const warning of result.warnings) {
      const relFile = path.relative(packageRoot, warning.file);
      const warningLine = useColor ? ANSI_RED + "⚠️  " + warning.target + ANSI_RESET : "⚠️  " + warning.target;
      lines.push(warningLine + ": " + relFile);
      lines.push(`    imports: ${warning.specifier}`);
      lines.push(`    issue: ${warning.message}`);
      if (warning.suggestion) {
        const fix = useColor ? ANSI_GREEN + warning.suggestion + ANSI_RESET : warning.suggestion;
        lines.push(`    fix: ${fix}`);
      }
      lines.push("");
    }
  }

  // Section 1: Divergences
  if (result.divergences.length > 0) {
    lines.push("╔══════════════════════════════════════════════════════════════╗");
    lines.push("║  Platform Import Divergences                                 ║");
    lines.push("╚══════════════════════════════════════════════════════════════╝");
    lines.push("");

    for (const div of result.divergences) {
      const specLine = useColor ? ANSI_CYAN + div.specifier + ANSI_RESET : div.specifier;
      lines.push(specLine + ":");

      for (const res of div.resolutions) {
        const displayPath = res.resolvedPath
          ? path.relative(packageRoot, res.resolvedPath)
          : "(unresolved)";
        lines.push(`  ${res.target.padEnd(12)} → ${displayPath}`);
      }
      lines.push("");
    }
  } else {
    lines.push("No platform import divergences detected.");
    lines.push("(All targets resolve #-prefixed imports to the same files.)");
    lines.push("");
  }

  // Section 2: Per-target import trees
  lines.push("╔══════════════════════════════════════════════════════════════╗");
  lines.push("║  Import Graphs by Target                                     ║");
  lines.push("╚══════════════════════════════════════════════════════════════╝");
  lines.push("");

  for (const graph of result.graphs) {
    const conditionsStr = [...graph.conditions].join(", ");
    const header = `Target: ${graph.target.name} (${graph.target.condition})`;
    const subheader = `Conditions: ${conditionsStr}`;

    lines.push(useColor ? ANSI_YELLOW + header + ANSI_RESET : header);
    lines.push(useColor ? ANSI_DIM + subheader + ANSI_RESET : subheader);
    lines.push("");

    for (let i = 0; i < graph.entryPoints.length; i++) {
      const entry = graph.entryPoints[i];
      const isLast = i === graph.entryPoints.length - 1;
      lines.push(...formatNode(entry, packageRoot, "", isLast, useColor));
    }

    lines.push("");
  }

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Main trace function
// ---------------------------------------------------------------------------

export interface TraceOptions {
  /** Package root directory */
  packageRoot: string;
  /** Warp configuration */
  config: WarpConfig;
  /** Maximum depth to trace (default: 10) */
  maxDepth?: number;
  /** Only trace specific entry points (subpaths from exports) */
  entryPoints?: string[];
}

/**
 * Trace import chains across all targets.
 */
export async function traceImports(options: TraceOptions): Promise<TraceResult> {
  const { packageRoot, config, maxDepth = 10, entryPoints } = options;
  const log = getLogger();

  const importsMap = await readPackageImports(packageRoot);

  const graphs: TargetImportGraph[] = [];
  const allWarnings: PlatformWarning[] = [];

  for (const target of config.targets) {
    const pc = parseTargetTsConfig(target, packageRoot);
    const conditions = buildConditionsSet(
      pc.parsedConfig.options.customConditions,
      target.moduleType ?? "module",
    );

    log.verbose(
      `[warp] Tracing target: ${target.name} (conditions: ${[...conditions].join(", ")})`,
    );

    const targetGraph: TargetImportGraph = {
      target,
      conditions,
      entryPoints: [],
    };

    // Trace from each exported entry point
    const exportsToTrace = entryPoints
      ? Object.entries(config.exports).filter(([key]) => entryPoints.includes(key))
      : Object.entries(config.exports);

    for (const [, sourcePath] of exportsToTrace) {
      // Skip non-source entries (like package.json)
      if (!sourcePath.endsWith(".ts") && !sourcePath.endsWith(".mts")) continue;

      const absSourcePath = path.resolve(packageRoot, sourcePath);
      const visited = new Set<string>();
      const warnings: PlatformWarning[] = [];

      const rootNode = await buildImportGraph(
        sourcePath,
        absSourcePath,
        importsMap,
        conditions,
        packageRoot,
        visited,
        0,
        maxDepth,
        target.name,
        warnings,
      );

      allWarnings.push(...warnings);

      // Only include if there are platform imports somewhere
      if (rootNode.children.length > 0) {
        targetGraph.entryPoints.push(rootNode);
      }
    }

    graphs.push(targetGraph);
  }

  const divergences = findDivergences(graphs);

  return { graphs, divergences, warnings: allWarnings };
}
