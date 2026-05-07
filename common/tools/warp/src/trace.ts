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
}

/** Import graph for a single target. */
export interface TargetImportGraph {
  target: WarpTarget;
  conditions: ReadonlySet<string>;
  /** Entry points from the exports map */
  entryPoints: ImportNode[];
}

/** Result of tracing imports across all targets. */
export interface TraceResult {
  /** Per-target import graphs */
  graphs: TargetImportGraph[];
  /** Cross-target comparison: specifiers that resolve differently */
  divergences: ImportDivergence[];
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
function detectAnnotation(resolvedPath: string | undefined): string | undefined {
  if (!resolvedPath) return "(unresolved)";

  const basename = path.basename(resolvedPath);

  if (basename.includes("-browser.")) return "(browser)";
  if (basename.includes("-native.")) return "(react-native)";
  if (basename.includes("-node.")) return "(Node)";

  // Detect Node no-op pattern: non-platform-suffixed file that has a browser variant
  // This is harder to detect without checking sibling files, so we leave it to heuristics

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
): Promise<ImportNode> {
  const isPlatformImport = specifier.startsWith("#");
  const displayPath = resolvedPath ? path.relative(packageRoot, resolvedPath) : undefined;
  const annotation = detectAnnotation(resolvedPath);

  const node: ImportNode = {
    specifier,
    resolvedPath,
    displayPath,
    isPlatformImport,
    children: [],
    annotation,
  };

  // Stop if we've hit the depth limit or can't resolve the file
  if (depth >= maxDepth || !resolvedPath || visited.has(resolvedPath)) {
    return node;
  }

  visited.add(resolvedPath);

  // Only follow imports that are platform-relevant (# imports or lead to them)
  const imports = await extractImports(resolvedPath);

  for (const importSpec of imports) {
    // Only trace `#`-prefixed imports and relative imports that might contain them
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
      );

      // Only include if it's a platform import or has platform imports in children
      if (childNode.isPlatformImport || childNode.children.length > 0) {
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

  // Section 1: Divergences (most important - show first)
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

      const rootNode = await buildImportGraph(
        sourcePath,
        absSourcePath,
        importsMap,
        conditions,
        packageRoot,
        visited,
        0,
        maxDepth,
      );

      // Only include if there are platform imports somewhere
      if (rootNode.children.length > 0) {
        targetGraph.entryPoints.push(rootNode);
      }
    }

    graphs.push(targetGraph);
  }

  const divergences = findDivergences(graphs);

  return { graphs, divergences };
}
