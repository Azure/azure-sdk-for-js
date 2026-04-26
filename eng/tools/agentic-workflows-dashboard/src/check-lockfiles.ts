#!/usr/bin/env node
/**
 * Lockfile Staleness Checker (v23)
 * 
 * Checks if compiled .lock.yml files are stale by comparing them
 * against freshly compiled output from `gh aw compile`.
 * 
 * This script:
 * 1. Clones/fetches each monitored repo (shallow)
 * 2. Runs `gh aw compile --no-emit --json` to check compilation
 * 3. Compares compiled output to existing lock files
 * 4. Reports staleness to stdout or Azure Monitor
 */

import { program } from "commander";
import { execSync, execFileSync } from "child_process";
import { existsSync, mkdirSync, rmSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { MONITORED_REPOS } from "./config.js";
import { createHash } from "crypto";

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
function checkPrerequisites(): { ok: boolean; error?: string } {
  try {
    execFileSync("gh", ["--version"], { stdio: "pipe" });
    execFileSync("gh", ["aw", "--help"], { stdio: "pipe" });
    return { ok: true };
  } catch (err) {
    return { 
      ok: false, 
      error: "gh CLI with gh aw extension is required. Install from https://github.com/github/gh-aw" 
    };
  }
}

/**
 * Hash file contents for comparison
 */
function hashFile(content: string): string {
  return createHash("sha256").update(content).digest("hex").substring(0, 12);
}

/**
 * Check lockfile staleness for a single repo
 */
async function checkRepoLockfiles(
  repo: string,
  workDir: string,
  verbose: boolean
): Promise<RepoLockfileStatus> {
  const result: RepoLockfileStatus = {
    repo,
    totalWorkflows: 0,
    staleLockfiles: 0,
    missingLockfiles: 0,
    upToDateLockfiles: 0,
    workflows: [],
  };

  const repoDir = join(workDir, repo.replace("/", "_"));
  
  try {
    // Clone or update repo (shallow)
    if (!existsSync(repoDir)) {
      if (verbose) console.log(`  📥 Cloning ${repo}...`);
      execSync(
        `git clone --depth 1 --filter=blob:none --sparse https://github.com/${repo}.git ${repoDir}`,
        { stdio: "pipe" }
      );
      execSync(
        `git -C ${repoDir} sparse-checkout set .github/workflows .github/aw`,
        { stdio: "pipe" }
      );
    } else {
      if (verbose) console.log(`  🔄 Updating ${repo}...`);
      execSync(`git -C ${repoDir} pull --depth 1`, { stdio: "pipe" });
    }

    // Find workflow markdown files
    const workflowsDir = join(repoDir, ".github", "workflows");
    if (!existsSync(workflowsDir)) {
      result.error = "No .github/workflows directory";
      return result;
    }

    // List all .md files (workflow sources)
    const files = execSync(`ls -1 "${workflowsDir}"/*.md 2>/dev/null || true`, { 
      encoding: "utf-8",
      cwd: repoDir 
    }).trim().split("\n").filter(f => f);

    if (files.length === 0) {
      if (verbose) console.log(`  ⚠️ No workflow .md files found`);
      return result;
    }

    result.totalWorkflows = files.length;

    for (const mdFile of files) {
      const workflowName = mdFile.replace(/.*\//, "").replace(".md", "");
      const lockFileName = `${workflowName}.lock.yml`;
      const existingLockPath = join(workflowsDir, lockFileName);
      
      const status: WorkflowLockfileStatus = {
        workflow: workflowName,
        repo,
        hasLockfile: existsSync(existingLockPath),
        isStale: false,
      };

      if (!status.hasLockfile) {
        result.missingLockfiles++;
        status.error = "Missing lockfile";
        result.workflows.push(status);
        continue;
      }

      try {
        // Read existing lockfile
        const existingContent = readFileSync(existingLockPath, "utf-8");
        status.lockHash = hashFile(existingContent);

        // Compile from repo root (gh aw compile looks in .github/workflows/)
        execSync(`gh aw compile "${workflowName}"`, { 
          cwd: repoDir, 
          stdio: "pipe",
          encoding: "utf-8"
        });

        // Read newly compiled lockfile (written to same location)
        const newContent = readFileSync(existingLockPath, "utf-8");
        status.sourceHash = hashFile(newContent);

        // Compare hashes
        if (status.lockHash !== status.sourceHash) {
          status.isStale = true;
          result.staleLockfiles++;
          if (verbose) {
            console.log(`  ⚠️ ${workflowName}: STALE (${status.lockHash} → ${status.sourceHash})`);
          }
        } else {
          result.upToDateLockfiles++;
          if (verbose) {
            console.log(`  ✓ ${workflowName}: up-to-date`);
          }
        }

        // Restore original lockfile to preserve repo state
        writeFileSync(existingLockPath, existingContent);
      } catch (err) {
        status.error = err instanceof Error ? err.message : String(err);
        if (verbose) console.log(`  ❌ ${workflowName}: ${status.error}`);
      }

      result.workflows.push(status);
    }

  } catch (err) {
    result.error = err instanceof Error ? err.message : String(err);
  }

  return result;
}

/**
 * Main check function
 */
async function checkLockfiles(options: {
  repos: string[];
  verbose: boolean;
  json: boolean;
  workDir: string;
}): Promise<RepoLockfileStatus[]> {
  const results: RepoLockfileStatus[] = [];

  // Check prerequisites
  const prereqs = checkPrerequisites();
  if (!prereqs.ok) {
    console.error(`❌ ${prereqs.error}`);
    process.exit(EXIT_CONFIG_ERROR);
  }

  // Create work directory
  mkdirSync(options.workDir, { recursive: true });

  console.log(`\n🔍 Checking lockfile staleness across ${options.repos.length} repos\n`);

  for (const repo of options.repos) {
    console.log(`📁 ${repo}`);
    const status = await checkRepoLockfiles(repo, options.workDir, options.verbose);
    results.push(status);

    if (status.error) {
      console.log(`  ❌ Error: ${status.error}`);
    } else {
      const staleCount = status.staleLockfiles;
      const icon = staleCount > 0 ? "⚠️" : "✓";
      console.log(`  ${icon} ${status.totalWorkflows} workflows: ${status.upToDateLockfiles} current, ${staleCount} stale, ${status.missingLockfiles} missing`);
    }
  }

  return results;
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
  .option("--work-dir <dir>", "Working directory for clones", "/tmp/aw-lockfile-check")
  .option("--cleanup", "Remove work directory after check")
  .addHelpText("after", `
Examples:
  $ node dist/check-lockfiles.js --verbose
  $ node dist/check-lockfiles.js --repo Azure/azure-sdk-for-js
  $ node dist/check-lockfiles.js --json > staleness.json

This script helps identify when lockfiles need to be recompiled with:
  $ gh aw compile
`)
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
        verbose: options.verbose || false,
        json: options.json || false,
        workDir: options.workDir,
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

      if (options.cleanup && existsSync(options.workDir)) {
        rmSync(options.workDir, { recursive: true, force: true });
      }

      process.exit(totalStale > 0 ? EXIT_DATA_ERROR : EXIT_SUCCESS);
    } catch (err) {
      console.error("❌ Fatal error:", err);
      process.exit(EXIT_DATA_ERROR);
    }
  });

program.parse();
