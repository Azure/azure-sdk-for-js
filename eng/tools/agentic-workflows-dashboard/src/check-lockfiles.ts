#!/usr/bin/env node
/**
 * Lockfile Staleness Checker (v24)
 *
 * Checks if compiled .lock.yml files are stale by comparing them
 * against freshly compiled output from `gh aw compile`.
 *
 * This script:
 * 1. Clones/fetches each monitored repo (shallow)
 * 2. Runs `gh aw compile` to regenerate lockfiles
 * 3. Compares compiled output to existing lock files
 * 4. Reports staleness to stdout or JSON
 *
 * Modernized in v24:
 * - node: prefixed imports
 * - fs/promises for async file operations
 * - promisified child_process.exec
 * - Parallel repo checking with Promise.allSettled
 */

import { program } from "commander";
import { exec as execCallback, execFile as execFileCallback } from "node:child_process";
import { promisify } from "node:util";
import * as fsp from "node:fs/promises";
import * as fs from "node:fs";
import * as path from "node:path";
import * as crypto from "node:crypto";
import { MONITORED_REPOS } from "./config.js";

// Promisified exec for async/await usage
const exec = promisify(execCallback);
const execFile = promisify(execFileCallback);

// Exit codes
export const EXIT_SUCCESS = 0;
export const EXIT_USAGE_ERROR = 2;
export const EXIT_CONFIG_ERROR = 3;
export const EXIT_DATA_ERROR = 5;

interface WorkflowLockfileStatus {
  workflow: string;
  repo: string;
  hasLockfile: boolean;
  isStale: boolean;
  sourceHash?: string;
  lockHash?: string;
  error?: string;
}

interface RepoLockfileStatus {
  repo: string;
  totalWorkflows: number;
  staleLockfiles: number;
  missingLockfiles: number;
  upToDateLockfiles: number;
  workflows: WorkflowLockfileStatus[];
  error?: string;
}

/**
 * Check if gh CLI and gh aw extension are available
 */
async function checkPrerequisites(): Promise<{ ok: boolean; error?: string }> {
  try {
    await execFile("gh", ["--version"]);
    await execFile("gh", ["aw", "--help"]);
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "gh CLI with gh aw extension is required. Install from https://github.com/github/gh-aw",
    };
  }
}

/**
 * Hash file contents for comparison (first 12 chars of SHA256)
 */
function hashContent(content: string): string {
  return crypto.createHash("sha256").update(content).digest("hex").slice(0, 12);
}

/**
 * Check if a path exists (async)
 */
async function pathExists(p: string): Promise<boolean> {
  try {
    await fsp.access(p);
    return true;
  } catch {
    return false;
  }
}

/**
 * List markdown files in a directory
 */
async function listMarkdownFiles(dir: string): Promise<string[]> {
  try {
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && e.name.endsWith(".md"))
      .map((e) => e.name);
  } catch {
    return [];
  }
}

/**
 * Clone or update a repo with sparse checkout
 */
async function ensureRepoClone(repo: string, workDir: string, verbose: boolean): Promise<string> {
  const repoDir = path.join(workDir, repo.replace("/", "_"));

  if (await pathExists(repoDir)) {
    if (verbose) console.log(`  🔄 Updating ${repo}...`);
    await exec(`git -C "${repoDir}" pull --depth 1`);
  } else {
    if (verbose) console.log(`  📥 Cloning ${repo}...`);
    await exec(
      `git clone --depth 1 --filter=blob:none --sparse https://github.com/${repo}.git "${repoDir}"`,
    );
    await exec(`git -C "${repoDir}" sparse-checkout set .github/workflows .github/aw`);
  }

  return repoDir;
}

/**
 * Check a single workflow's lockfile staleness
 */
async function checkWorkflowLockfile(
  workflowName: string,
  repo: string,
  workflowsDir: string,
  repoDir: string,
  verbose: boolean,
): Promise<WorkflowLockfileStatus> {
  const lockFileName = `${workflowName}.lock.yml`;
  const lockfilePath = path.join(workflowsDir, lockFileName);

  const status: WorkflowLockfileStatus = {
    workflow: workflowName,
    repo,
    hasLockfile: await pathExists(lockfilePath),
    isStale: false,
  };

  if (!status.hasLockfile) {
    status.error = "Missing lockfile";
    return status;
  }

  try {
    // Read existing lockfile
    const existingContent = await fsp.readFile(lockfilePath, "utf-8");
    status.lockHash = hashContent(existingContent);

    // Compile from repo root (gh aw compile writes to .github/workflows/)
    await exec(`gh aw compile "${workflowName}"`, { cwd: repoDir });

    // Read newly compiled lockfile
    const newContent = await fsp.readFile(lockfilePath, "utf-8");
    status.sourceHash = hashContent(newContent);

    // Compare hashes
    status.isStale = status.lockHash !== status.sourceHash;

    if (verbose) {
      if (status.isStale) {
        console.log(`  ⚠️ ${workflowName}: STALE (${status.lockHash} → ${status.sourceHash})`);
      } else {
        console.log(`  ✓ ${workflowName}: up-to-date`);
      }
    }

    // Restore original lockfile to preserve repo state
    await fsp.writeFile(lockfilePath, existingContent);
  } catch (err) {
    status.error = err instanceof Error ? err.message : String(err);
    if (verbose) console.log(`  ❌ ${workflowName}: ${status.error}`);
  }

  return status;
}

/**
 * Check lockfile staleness for a single repo
 */
async function checkRepoLockfiles(
  repo: string,
  workDir: string,
  verbose: boolean,
): Promise<RepoLockfileStatus> {
  const result: RepoLockfileStatus = {
    repo,
    totalWorkflows: 0,
    staleLockfiles: 0,
    missingLockfiles: 0,
    upToDateLockfiles: 0,
    workflows: [],
  };

  try {
    const repoDir = await ensureRepoClone(repo, workDir, verbose);
    const workflowsDir = path.join(repoDir, ".github", "workflows");

    if (!(await pathExists(workflowsDir))) {
      result.error = "No .github/workflows directory";
      return result;
    }

    // List all .md files (workflow sources)
    const mdFiles = await listMarkdownFiles(workflowsDir);

    if (mdFiles.length === 0) {
      if (verbose) console.log(`  ⚠️ No workflow .md files found`);
      return result;
    }

    result.totalWorkflows = mdFiles.length;

    // Check each workflow (sequentially to avoid concurrent gh aw compile conflicts)
    for (const mdFile of mdFiles) {
      const workflowName = mdFile.replace(".md", "");
      const status = await checkWorkflowLockfile(
        workflowName,
        repo,
        workflowsDir,
        repoDir,
        verbose,
      );

      result.workflows.push(status);

      if (!status.hasLockfile) {
        result.missingLockfiles++;
      } else if (status.isStale) {
        result.staleLockfiles++;
      } else if (!status.error) {
        result.upToDateLockfiles++;
      }
    }
  } catch (err) {
    result.error = err instanceof Error ? err.message : String(err);
  }

  return result;
}

/**
 * Main check function - checks multiple repos in parallel
 */
async function checkLockfiles(options: {
  repos: string[];
  verbose: boolean;
  json: boolean;
  workDir: string;
  parallel: boolean;
}): Promise<RepoLockfileStatus[]> {
  // Check prerequisites
  const prereqs = await checkPrerequisites();
  if (!prereqs.ok) {
    console.error(`❌ ${prereqs.error}`);
    process.exit(EXIT_CONFIG_ERROR);
  }

  // Create work directory
  await fsp.mkdir(options.workDir, { recursive: true });

  console.log(`\n🔍 Checking lockfile staleness across ${options.repos.length} repos\n`);

  // Check repos (sequentially for cleaner output, or parallel if --parallel)
  const results: RepoLockfileStatus[] = [];

  if (options.parallel && options.repos.length > 1) {
    // Parallel mode: check all repos concurrently
    const settled = await Promise.allSettled(
      options.repos.map((repo) => checkRepoLockfiles(repo, options.workDir, options.verbose)),
    );

    for (const [i, result] of settled.entries()) {
      const repo = options.repos[i] ?? `unknown-${i}`;
      console.log(`📁 ${repo}`);

      if (result.status === "fulfilled") {
        results.push(result.value);
        printRepoSummary(result.value);
      } else {
        const errorResult: RepoLockfileStatus = {
          repo,
          totalWorkflows: 0,
          staleLockfiles: 0,
          missingLockfiles: 0,
          upToDateLockfiles: 0,
          workflows: [],
          error: result.reason instanceof Error ? result.reason.message : String(result.reason),
        };
        results.push(errorResult);
        console.log(`  ❌ Error: ${errorResult.error}`);
      }
    }
  } else {
    // Sequential mode: cleaner output
    for (const repo of options.repos) {
      console.log(`📁 ${repo}`);
      const status = await checkRepoLockfiles(repo, options.workDir, options.verbose);
      results.push(status);
      printRepoSummary(status);
    }
  }

  return results;
}

/**
 * Print summary line for a repo
 */
function printRepoSummary(status: RepoLockfileStatus): void {
  if (status.error) {
    console.log(`  ❌ Error: ${status.error}`);
  } else {
    const icon = status.staleLockfiles > 0 ? "⚠️" : "✓";
    console.log(
      `  ${icon} ${status.totalWorkflows} workflows: ${status.upToDateLockfiles} current, ${status.staleLockfiles} stale, ${status.missingLockfiles} missing`,
    );
  }
}

// CLI setup
program
  .name("check-lockfiles")
  .description("Check if agentic workflow lockfiles are stale and need recompilation")
  .version("1.0.0")
  .option("-r, --repo <repo>", "Specific repo to check (owner/name)")
  .option("--repos <repos>", "Comma-separated list of repos")
  .option("-v, --verbose", "Verbose output")
  .option("--json", "Output results as JSON")
  .option("--parallel", "Check repos in parallel (faster, but noisier output)")
  .option("--work-dir <dir>", "Working directory for clones", "/tmp/aw-lockfile-check")
  .option("--cleanup", "Remove work directory after check")
  .addHelpText(
    "after",
    `
Examples:
  $ node dist/check-lockfiles.js --verbose
  $ node dist/check-lockfiles.js --repo Azure/azure-sdk-for-js
  $ node dist/check-lockfiles.js --json > staleness.json
  $ node dist/check-lockfiles.js --parallel  # Faster for multiple repos

This script helps identify when lockfiles need to be recompiled with:
  $ gh aw compile
`,
  )
  .action(async (options) => {
    // Determine repos
    let repos = MONITORED_REPOS;
    if (options.repo) {
      repos = [options.repo];
    } else if (options.repos) {
      repos = options.repos.split(",").map((r: string) => r.trim());
    }

    try {
      const results = await checkLockfiles({
        repos,
        verbose: options.verbose ?? false,
        json: options.json ?? false,
        workDir: options.workDir,
        parallel: options.parallel ?? false,
      });

      // Summary
      const totalStale = results.reduce((sum, r) => sum + r.staleLockfiles, 0);
      const totalMissing = results.reduce((sum, r) => sum + r.missingLockfiles, 0);
      const totalWorkflows = results.reduce((sum, r) => sum + r.totalWorkflows, 0);
      const totalCurrent = results.reduce((sum, r) => sum + r.upToDateLockfiles, 0);

      console.log(`\n📊 Summary: ${totalWorkflows} workflows across ${repos.length} repos`);
      console.log(`   ✓ Up-to-date: ${totalCurrent}`);
      console.log(`   ⚠️ Stale: ${totalStale}`);
      console.log(`   ❓ Missing: ${totalMissing}`);

      if (totalStale > 0) {
        console.log(`\n💡 Recompile stale lockfiles with: gh aw compile`);
      }

      if (options.json) {
        console.log(JSON.stringify(results, null, 2));
      }

      if (options.cleanup && (await pathExists(options.workDir))) {
        await fsp.rm(options.workDir, { recursive: true, force: true });
      }

      process.exit(totalStale > 0 ? EXIT_DATA_ERROR : EXIT_SUCCESS);
    } catch (err) {
      console.error("❌ Fatal error:", err);
      process.exit(EXIT_DATA_ERROR);
    }
  });

program.parse();
