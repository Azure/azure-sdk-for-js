// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Discovers sample-test files and compiles them into publishable sources.
 *
 * This module bridges the sample-tests compiler with the existing samples
 * publish pipeline. It finds test files under test/public/samples/, compiles
 * each one, and writes the output to a staging directory that the existing
 * pipeline can consume as if it were samples-dev/.
 */

import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";
import { findMatchingFiles } from "../findMatchingFiles.js";
import { createPrinter } from "../printer.js";
import { compileSampleTest, type HelperCache } from "./compiler/compiler.js";
import type { HelperResolver, ResolvedHelper } from "./compiler/helperCompiler.js";

const log = createPrinter("sample-tests");

/**
 * Discover sample-test files under test/public/samples/.
 * All .spec.ts files in this directory are considered sample tests.
 */
async function discoverSampleTests(projectPath: string): Promise<string[]> {
  const samplesPath = path.join(projectPath, "test", "public", "samples");
  const candidates: string[] = [];

  try {
    for await (const filePath of findMatchingFiles(
      samplesPath,
      (name) => name.endsWith(".spec.ts") && !name.endsWith(".d.ts"),
    )) {
      candidates.push(filePath);
    }
  } catch {
    // test/public/samples/ doesn't exist or is empty, nothing to compile
  }

  return candidates.sort();
}

export interface CompileSampleTestsResult {
  /** Path to the staging directory containing compiled samples */
  stagingDir: string;
  /** Number of files successfully compiled */
  compiledCount: number;
  /** Path to the generated sample.env file, if any env vars were found */
  sampleEnvPath?: string;
  /** Clean up the staging directory when done */
  cleanup(): Promise<void>;
}

const SAMPLE_ENV_HEADER = `\
# ------------------------------------
# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.
# ------------------------------------
# Environment variables needed to run the samples.
`;

/**
 * Generate sample.env content from discovered env vars, optionally merging
 * with a hand-written sample.env file.
 *
 * When an existing file is provided, hand-written values are preserved and
 * only newly-discovered vars are appended. Warnings are emitted for vars
 * present in the hand-written file but not referenced in code.
 */
export function generateSampleEnv(
  discoveredVars: string[],
  existingContent?: string,
): { content: string; warnings: string[] } {
  const warnings: string[] = [];

  if (!existingContent) {
    const lines = [...discoveredVars].sort().map((v) => `${v}=`);
    return {
      content: SAMPLE_ENV_HEADER + "\n" + lines.join("\n") + (lines.length > 0 ? "\n" : ""),
      warnings,
    };
  }

  // Parse existing content – keep every line, only extract var names from assignment lines
  const existingVars = new Map<string, string>(); // varName -> full line
  for (const line of existingContent.split("\n")) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=/);
    if (match) {
      existingVars.set(match[1], line);
    }
  }

  const discoveredSet = new Set(discoveredVars);

  // Warn about vars in the hand-written file that aren't referenced in code
  for (const varName of existingVars.keys()) {
    if (!discoveredSet.has(varName)) {
      warnings.push(
        `Environment variable "${varName}" is defined in sample.env but not referenced in any sample code`,
      );
    }
  }

  // Start with the existing content (preserving comments, order, values)
  let merged = existingContent;
  if (!merged.endsWith("\n")) {
    merged += "\n";
  }

  // Append any NEW vars not already in the hand-written file
  const newVars = discoveredVars.filter((v) => !existingVars.has(v)).sort();
  if (newVars.length > 0) {
    merged += newVars.map((v) => `${v}=`).join("\n") + "\n";
  }

  return { content: merged, warnings };
}

/**
 * Create a helper resolver that reads files relative to the importing file.
 * Resolution is constrained to paths under testPublicPath.
 */
function createHelperResolver(testPublicPath: string): HelperResolver {
  return (fromFile: string, specifier: string): ResolvedHelper | undefined => {
    // Resolve the specifier relative to the importing file's directory
    const fromDir = path.dirname(
      path.isAbsolute(fromFile) ? fromFile : path.resolve(testPublicPath, fromFile),
    );

    // Try .ts extension (spec files import with .js, but source is .ts)
    let resolved = path.resolve(fromDir, specifier.replace(/\.js$/, ".ts"));
    if (!existsSync(resolved)) {
      // Try as-is
      resolved = path.resolve(fromDir, specifier);
      if (!existsSync(resolved)) return undefined;
    }

    // Constrain to test/public/ root
    const canonical = path.resolve(resolved);
    if (!canonical.startsWith(path.resolve(testPublicPath) + path.sep)) {
      return undefined;
    }

    return {
      canonicalPath: canonical,
      sourceText: readFileSync(canonical, "utf-8"),
    };
  };
}

/**
 * Compile all sample-test files in a package and write them to a staging directory.
 *
 * Returns null if no sample-test files are found.
 */
export async function compileSampleTests(
  projectPath: string,
  packageName: string,
): Promise<CompileSampleTestsResult | null> {
  const testFiles = await discoverSampleTests(projectPath);

  if (testFiles.length === 0) {
    return null;
  }

  log.info(`Found ${testFiles.length} sample-test file(s) to compile`);

  const stagingDir = await mkdtemp(path.join(tmpdir(), "sample-tests-"));

  const testPublicPath = path.join(projectPath, "test", "public");
  const resolveHelper = createHelperResolver(testPublicPath);

  let compiledCount = 0;
  const allEnvVars = new Set<string>();
  const writtenHelpers = new Map<string, string>();
  // Shared helper cache across all sample compilations to avoid redundant work
  const sharedHelperCache: HelperCache = new Map();

  try {
    for (const filePath of testFiles) {
      const relativePath = path.relative(testPublicPath, filePath);

      // Preserve subdirectory structure: samples/node/foo.spec.ts → node/foo.ts
      // Strip the leading "samples/" prefix if present, then change extension
      const pathWithinSamples = relativePath.startsWith("samples" + path.sep)
        ? relativePath.slice(("samples" + path.sep).length)
        : relativePath;
      const outputRelative = pathWithinSamples.replace(/\.spec\.ts$/, ".ts");
      const outputPath = path.join(stagingDir, outputRelative);

      // Detect platform from subdirectory: samples/node/ → node, samples/browser/ → browser
      const segments = relativePath.split(path.sep);
      const platform = segments.includes("browser")
        ? "browser"
        : segments.includes("node")
          ? "node"
          : undefined;

      log.info(`  Compiling: ${relativePath}${platform ? ` (${platform})` : ""}`);

      const sourceText = readFileSync(filePath, "utf-8");
      const result = compileSampleTest(sourceText, {
        packageName,
        fileName: filePath, // Absolute path needed for helper path computation
        resolveHelper,
        platform,
        helperCache: sharedHelperCache,
        strict: true, // Fatal on unresolved helpers in production path
      });

      if (result.warnings.length > 0) {
        for (const warning of result.warnings) {
          log.warn(`    ${warning}`);
        }
      }

      for (const v of result.envVars) {
        allEnvVars.add(v);
      }

      mkdirSync(path.dirname(outputPath), { recursive: true });
      writeFileSync(outputPath, result.outputText, "utf-8");
      compiledCount++;

      // Write compiled helper files to staging dir (preserve relative structure)
      for (const [helperSpecifier, helperText] of result.helperFiles) {
        // helperSpecifier is relative to the spec file's directory (e.g., "./utils.ts")
        // Resolve to absolute, then back to relative to testPublicPath
        const helperAbsolute = path.resolve(path.dirname(filePath), helperSpecifier);
        const helperRelative = path.relative(testPublicPath, helperAbsolute);

        // Strip samples/ prefix for output path
        const helperWithinSamples = helperRelative.startsWith("samples" + path.sep)
          ? helperRelative.slice(("samples" + path.sep).length)
          : helperRelative;
        const helperOutputPath = path.join(stagingDir, helperWithinSamples);

        const existingSource = writtenHelpers.get(helperWithinSamples);
        if (existingSource !== undefined) {
          if (existingSource !== helperRelative) {
            log.warn(
              `    Helper path collision: "${helperWithinSamples}" from "${helperRelative}" ` +
                `conflicts with "${existingSource}". Skipping — rename one to avoid ambiguity.`,
            );
          }
          // Same source or collision — skip
        } else {
          mkdirSync(path.dirname(helperOutputPath), { recursive: true });
          writeFileSync(helperOutputPath, helperText, "utf-8");
          writtenHelpers.set(helperWithinSamples, helperRelative);
          log.info(`    Helper: ${helperWithinSamples}`);
        }
      }
    }
  } catch (err: unknown) {
    // Clean up staging dir on failure so it doesn't leak
    await rm(stagingDir, { recursive: true, force: true });
    log.error(`  Failed to compile: ${(err as Error).message}`);
    throw err;
  }

  // Generate sample.env from discovered env vars
  let sampleEnvPath: string | undefined;
  const discoveredVars = [...allEnvVars].sort();

  if (discoveredVars.length > 0 || existsSync(path.join(projectPath, "sample.env"))) {
    const existingPath = path.join(projectPath, "sample.env");
    const existingContent = existsSync(existingPath)
      ? readFileSync(existingPath, "utf-8")
      : undefined;

    const { content, warnings } = generateSampleEnv(discoveredVars, existingContent);

    for (const warning of warnings) {
      log.warn(`  sample.env: ${warning}`);
    }

    sampleEnvPath = path.join(stagingDir, "sample.env");
    writeFileSync(sampleEnvPath, content, "utf-8");
    log.info(`  Generated sample.env with ${discoveredVars.length} variable(s)`);
  }

  log.success(`Compiled ${compiledCount} sample-test file(s)`);

  return {
    stagingDir,
    compiledCount,
    sampleEnvPath,
    async cleanup() {
      await rm(stagingDir, { recursive: true, force: true });
    },
  };
}
