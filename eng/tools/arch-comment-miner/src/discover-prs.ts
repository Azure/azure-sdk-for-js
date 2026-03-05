// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

/**
 * Discovers merged PR numbers in the given date range using GitHub's
 * GraphQL search API. No local clone required.
 *
 * GitHub search caps results at 1000 per query, so for ranges with more
 * merged PRs we subdivide into smaller windows automatically.
 *
 * The comment fetcher downstream filters to only threads on review/*.api.md,
 * so we intentionally cast a wide net here.
 */
export async function discoverPRs(
  owner: string,
  repo: string,
  since: string,
  until: string,
  executor?: (query: string) => Promise<Record<string, unknown>>,
): Promise<number[]> {
  const exec =
    executor ??
    (async (query: string) => {
      const { stdout } = await execFileAsync("gh", ["api", "graphql", "-f", `query=${query}`], {
        maxBuffer: 50 * 1024 * 1024,
      });
      return JSON.parse(stdout) as Record<string, unknown>;
    });

  const prNumbers = new Set<number>();

  // Split into sub-ranges and collect all PRs
  const ranges = splitDateRange(since, until);
  for (const [start, end] of ranges) {
    const prs = await searchRange(owner, repo, start, end, exec);
    for (const n of prs) prNumbers.add(n);
  }

  return [...prNumbers].sort((a, b) => a - b);
}

/**
 * Split a date range into monthly windows to stay under the 1000-result
 * search API limit.
 */
function splitDateRange(since: string, until: string): Array<[string, string]> {
  const ranges: Array<[string, string]> = [];
  const start = new Date(since);
  const end = new Date(until);

  let cursor = new Date(start);
  while (cursor < end) {
    const windowEnd = new Date(cursor);
    windowEnd.setMonth(windowEnd.getMonth() + 1);
    const actual = windowEnd > end ? end : windowEnd;
    ranges.push([fmt(cursor), fmt(actual)]);
    cursor = actual;
  }
  return ranges;
}

function fmt(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Paginate through all results for a single search window. */
async function searchRange(
  owner: string,
  repo: string,
  since: string,
  until: string,
  exec: (query: string) => Promise<Record<string, unknown>>,
): Promise<number[]> {
  const prNumbers: number[] = [];
  let cursor: string | null = null;

  for (;;) {
    const afterClause = cursor ? `, after: "${cursor}"` : "";
    const query = `query {
      search(query: "repo:${owner}/${repo} is:pr is:merged merged:${since}..${until}", type: ISSUE, first: 100${afterClause}) {
        pageInfo { hasNextPage endCursor }
        nodes { ... on PullRequest { number } }
      }
    }`;

    let data: Record<string, unknown>;
    try {
      data = await exec(query);
    } catch {
      break;
    }

    const search = (data as { data?: { search?: SearchResult } }).data?.search;
    if (!search) break;

    for (const node of search.nodes) {
      if (node.number) prNumbers.push(node.number);
    }

    if (!search.pageInfo.hasNextPage) break;
    cursor = search.pageInfo.endCursor;
  }

  return prNumbers;
}

interface SearchResult {
  pageInfo: { hasNextPage: boolean; endCursor: string };
  nodes: Array<{ number?: number }>;
}
