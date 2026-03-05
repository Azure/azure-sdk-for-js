// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ReviewThread, ThreadComment } from "./types.ts";

import type { MineFilters } from "./config.ts";
import { patternToRegex } from "./config.ts";

interface GraphQLComment {
  body: string;
  createdAt: string;
  url: string;
  author: { login: string } | null;
  path: string;
  diffHunk: string;
  line: number | null;
  originalLine: number | null;
}

interface GraphQLThread {
  isResolved: boolean;
  isOutdated: boolean;
  comments: {
    nodes: GraphQLComment[];
  };
}

interface GraphQLPR {
  number: number;
  reviewThreads: {
    nodes: GraphQLThread[];
  };
}

/**
 * Builds a GraphQL query that fetches review threads for a batch of PRs.
 * Uses aliased fields so multiple PRs can be queried in a single request.
 */
export function buildBatchQuery(prNumbers: number[]): string {
  const parts = prNumbers.map(
    (pr) => `
    pr_${pr}: pullRequest(number: ${pr}) {
      number
      reviewThreads(first: 100) {
        nodes {
          isResolved
          isOutdated
          comments(first: 50) {
            nodes {
              path
              body
              diffHunk
              line
              originalLine
              createdAt
              url
              author { login }
            }
          }
        }
      }
    }`,
  );

  return `query { repository(owner: "$OWNER", name: "$REPO") {${parts.join("")}\n}}`;
}

const DEFAULT_PATTERN = /review\/.*\.api\.md$/;

/** Tests whether a file path matches the configured file filters. */
function matchesFileFilters(path: string, filters?: MineFilters): boolean {
  if (!filters || filters.files.length === 0) {
    return DEFAULT_PATTERN.test(path);
  }
  return filters.files.some((p) => patternToRegex(p).test(path));
}

/** Tests whether a thread passes author filters. */
function matchesAuthorFilters(comments: ThreadComment[], filters?: MineFilters): boolean {
  if (!filters) return true;

  const authors = comments.map((c) => c.author.toLowerCase());

  // If authors list specified, at least one comment must be by an included author
  if (filters.authors.length > 0) {
    const allowed = new Set(filters.authors.map((a) => a.toLowerCase()));
    if (!authors.some((a) => allowed.has(a))) return false;
  }

  // If ignoreAuthors specified, skip threads where ALL comments are by ignored authors
  if (filters.ignoreAuthors.length > 0) {
    const ignored = new Set(filters.ignoreAuthors.map((a) => a.toLowerCase()));
    if (authors.every((a) => ignored.has(a))) return false;
  }

  return true;
}

/** Extracts ReviewThread objects from a single GraphQL PR result. */
function extractThreads(pr: GraphQLPR, filters?: MineFilters): ReviewThread[] {
  const threads: ReviewThread[] = [];

  for (const thread of pr.reviewThreads.nodes) {
    const commentNodes = thread.comments.nodes;
    if (commentNodes.length === 0) continue;

    const first = commentNodes[0];
    if (!first.path || !matchesFileFilters(first.path, filters)) continue;

    const comments: ThreadComment[] = commentNodes.map((c) => ({
      author: c.author?.login ?? "unknown",
      body: c.body,
      createdAt: c.createdAt,
      url: c.url,
    }));

    if (!matchesAuthorFilters(comments, filters)) continue;

    threads.push({
      pr: pr.number,
      path: first.path,
      diffHunk: first.diffHunk,
      line: first.line,
      originalLine: first.originalLine,
      threadUrl: first.url,
      isResolved: thread.isResolved,
      isOutdated: thread.isOutdated,
      comments,
    });
  }

  return threads;
}

/** Type for a function that executes a GraphQL query and returns raw JSON. */
export type GraphQLExecutor = (query: string) => Promise<Record<string, unknown>>;

/**
 * Fetches all review threads on review/*.api.md files for the given PRs.
 * Batches PRs into groups to stay within GraphQL complexity limits.
 */
export async function fetchComments(
  prNumbers: number[],
  owner: string,
  repo: string,
  executor: GraphQLExecutor,
  options?: {
    batchSize?: number;
    onProgress?: (done: number, total: number) => void;
    filters?: MineFilters;
  },
): Promise<ReviewThread[]> {
  const batchSize = options?.batchSize ?? 25;
  const allThreads: ReviewThread[] = [];

  for (let i = 0; i < prNumbers.length; i += batchSize) {
    const batch = prNumbers.slice(i, i + batchSize);
    const query = buildBatchQuery(batch).replace("$OWNER", owner).replace("$REPO", repo);

    let data: Record<string, unknown>;
    try {
      data = await executor(query);
    } catch {
      // Skip failed batches (e.g. deleted PRs)
      continue;
    }

    const repository = (data as Record<string, Record<string, unknown>>).data?.repository as
      | Record<string, GraphQLPR>
      | undefined;

    if (!repository) continue;

    for (const key of Object.keys(repository)) {
      const pr = repository[key] as GraphQLPR;
      if (pr?.reviewThreads) {
        allThreads.push(...extractThreads(pr, options?.filters));
      }
    }

    options?.onProgress?.(Math.min(i + batchSize, prNumbers.length), prNumbers.length);
  }

  return allThreads;
}
