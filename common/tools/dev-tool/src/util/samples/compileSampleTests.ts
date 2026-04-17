// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Discovers sample-test files and compiles them into publishable sources.
 *
 * This module bridges the sample-tests compiler with the existing samples
 * publish pipeline. It finds test files with @summary tags under test/public/,
 * compiles each one, and writes the output to a staging directory that the
 * existing pipeline can consume as if it were samples-dev/.
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";
import { findMatchingFiles } from "../findMatchingFiles.js";
import { createPrinter } from "../printer.js";
import { compileSampleTest } from "./compiler/compiler.js";

const log = createPrinter("sample-tests");

/**
 * Check whether a source file has a @summary tag (quick text check, no parsing).
 */
function hasSummaryTag(sourceText: string): boolean {
  return /@summary\s/.test(sourceText);
}

/**
 * Discover sample-test files under test/public/ that have @summary tags.
 */
async function discoverSampleTests(projectPath: string): Promise<string[]> {
  const testPublicPath = path.join(projectPath, "test", "public");
  const candidates: string[] = [];

  try {
    for await (const filePath of findMatchingFiles(
      testPublicPath,
      (name) => name.endsWith(".spec.ts") && !name.endsWith(".d.ts"),
    )) {
      const content = readFileSync(filePath, "utf-8");
      if (hasSummaryTag(content)) {
        candidates.push(filePath);
      }
    }
  } catch {
    // test/public/ doesn't exist or is empty, nothing to compile
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

  let compiledCount = 0;
  const allEnvVars = new Set<string>();

  try {
    for (const filePath of testFiles) {
      const relativePath = path.relative(path.join(projectPath, "test", "public"), filePath);
      const baseName = path.basename(relativePath, ".spec.ts") + ".ts";
      const outputPath = path.join(stagingDir, baseName);

      log.info(`  Compiling: ${relativePath}`);

      const sourceText = readFileSync(filePath, "utf-8");
      const result = compileSampleTest(sourceText, {
        packageName,
        fileName: relativePath,
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
