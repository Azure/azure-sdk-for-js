/**
 * GitHub API client for fetching workflow runs
 */

import { Octokit } from "@octokit/rest";
import type { GitHubWorkflow, GitHubWorkflowRun } from "./types.js";

// v12: Result type to propagate errors instead of silently returning empty arrays
export interface GitHubResult<T> {
  data: T;
  error?: Error;
}

export class GitHubClient {
  private octokit: Octokit;
  private verbose: boolean;

  constructor(token: string, verbose = false) {
    this.octokit = new Octokit({ auth: token });
    this.verbose = verbose;
  }

  /**
   * Discover agentic workflows in a repository by looking for .lock.yml files
   * v12: Returns result with error info instead of silently returning empty array
   */
  async discoverAgenticWorkflows(owner: string, repo: string): Promise<GitHubResult<GitHubWorkflow[]>> {
    const workflows: GitHubWorkflow[] = [];

    try {
      // List all workflows in the repo
      const { data } = await this.octokit.actions.listRepoWorkflows({
        owner,
        repo,
        per_page: 100,
      });

      // Filter for .lock.yml files (compiled agentic workflows)
      for (const wf of data.workflows) {
        if (wf.path.endsWith(".lock.yml")) {
          workflows.push({
            id: wf.id,
            name: wf.name,
            path: wf.path,
            state: wf.state as GitHubWorkflow["state"],
          });
        }
      }

      if (this.verbose) {
        console.log(`  Found ${workflows.length} agentic workflows in ${owner}/${repo}`);
      }
      
      return { data: workflows };
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error(`  Error discovering workflows in ${owner}/${repo}:`, err.message);
      return { data: [], error: err };
    }
  }

  /**
   * Fetch workflow runs for a specific workflow
   * v12: Returns result with error info instead of silently returning empty array
   * 
   * Uses updatedAfter (not createdAfter) to catch:
   * - Newly created runs
   * - Long-running runs that just completed
   * - Re-run attempts
   */
  async fetchWorkflowRuns(
    owner: string,
    repo: string,
    workflowId: number,
    options: {
      updatedAfter?: Date;
      createdAfter?: Date;  // Deprecated: use updatedAfter
      maxRuns?: number;
    } = {}
  ): Promise<GitHubResult<GitHubWorkflowRun[]>> {
    // Prefer updatedAfter, fallback to createdAfter for backwards compatibility
    const cutoffDate = options.updatedAfter || options.createdAfter;
    const { maxRuns = 100 } = options;
    const runs: GitHubWorkflowRun[] = [];
    let page = 1;
    // v19: Use page cap to bound API calls; collect then sort by updated_at
    // This is approximate but bounded; very old runs updated recently may be missed
    const maxPages = 10;  // Cap at 10 pages (1000 runs) per workflow

    try {
      while (page <= maxPages) {
        // v17: Always request full page (100) to ensure pagination works correctly
        // even with updatedAfter filtering; enforce maxRuns limit in-memory only
        const { data } = await this.octokit.actions.listWorkflowRuns({
          owner,
          repo,
          workflow_id: workflowId,
          per_page: 100,
          page,
        });

        if (data.workflow_runs.length === 0) break;

        for (const run of data.workflow_runs) {
          // Filter by updated_at (not created_at) to catch completed long-running jobs
          if (cutoffDate && new Date(run.updated_at) < cutoffDate) {
            continue;
          }

          runs.push({
            id: run.id,
            name: run.name || "",
            workflow_id: run.workflow_id,
            run_number: run.run_number,
            run_attempt: run.run_attempt ?? 1,
            status: run.status as GitHubWorkflowRun["status"],
            conclusion: run.conclusion as GitHubWorkflowRun["conclusion"],
            created_at: run.created_at,
            updated_at: run.updated_at,
            run_started_at: run.run_started_at || null,
            event: run.event,
            actor: run.actor
              ? { login: run.actor.login, type: run.actor.type as "User" | "Bot" | "Organization" }
              : null,
            head_branch: run.head_branch || "",
            head_sha: run.head_sha,
            head_repository: run.head_repository
              ? { full_name: run.head_repository.full_name, fork: run.head_repository.fork }
              : undefined,
            html_url: run.html_url,
            pull_requests: run.pull_requests?.map((pr) => ({ number: pr.number })) || [],
          });
        }
        
        // Check if we've exhausted results
        if (data.workflow_runs.length < 100) break;
        page++;

        // Rate limit protection
        await this.sleep(100);
      }

      // v19: Sort by updated_at desc and slice to maxRuns
      // Note: This is approximate; very old runs updated recently (beyond page cap) may be missed
      runs.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
      const result = runs.slice(0, maxRuns);

      if (this.verbose) {
        const pageInfo = page > maxPages ? ` (hit ${maxPages}-page cap)` : "";
        console.log(`    Fetched ${result.length} runs for workflow ${workflowId} (scanned ${runs.length})${pageInfo}`);
      }
      
      return { data: result };
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error(`    Error fetching runs for workflow ${workflowId}:`, err.message);
      return { data: [], error: err };
    }
  }

  /**
   * Check API rate limit status
   */
  async getRateLimit(): Promise<{ remaining: number; reset: Date }> {
    const { data } = await this.octokit.rateLimit.get();
    return {
      remaining: data.resources.core.remaining,
      reset: new Date(data.resources.core.reset * 1000),
    };
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
