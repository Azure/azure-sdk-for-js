// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { buildBatchQuery, fetchComments, type GraphQLExecutor } from "../src/fetch-comments.ts";

describe("buildBatchQuery", () => {
  it("produces a valid GraphQL query for a batch of PRs", () => {
    const query = buildBatchQuery([100, 200]);

    expect(query).toContain("pr_100: pullRequest(number: 100)");
    expect(query).toContain("pr_200: pullRequest(number: 200)");
    expect(query).toContain("reviewThreads(first: 100)");
    expect(query).toContain("comments(first: 50)");
    expect(query).toContain("diffHunk");
    expect(query).toContain("line");
    expect(query).toContain("originalLine");
    expect(query).toContain("url");
  });

  it("uses $OWNER and $REPO placeholders", () => {
    const query = buildBatchQuery([1]);

    expect(query).toContain('"$OWNER"');
    expect(query).toContain('"$REPO"');
  });
});

describe("fetchComments", () => {
  it("extracts threads from mock GraphQL response", async () => {
    const mockExecutor: GraphQLExecutor = async () => ({
      data: {
        repository: {
          pr_42: {
            number: 42,
            reviewThreads: {
              nodes: [
                {
                  isResolved: true,
                  isOutdated: false,
                  comments: {
                    nodes: [
                      {
                        path: "sdk/foo/foo/review/foo.api.md",
                        body: "this is a naming issue",
                        diffHunk: "@@ -1,3 +1,3 @@\n-old\n+new",
                        line: 1,
                        originalLine: 1,
                        createdAt: "2024-01-01T00:00:00Z",
                        url: "https://github.com/Azure/azure-sdk-for-js/pull/42#discussion_r123",
                        author: { login: "reviewer1" },
                      },
                      {
                        path: "sdk/foo/foo/review/foo.api.md",
                        body: "agree, let's fix it",
                        diffHunk: "@@ -1,3 +1,3 @@\n-old\n+new",
                        line: 1,
                        originalLine: 1,
                        createdAt: "2024-01-02T00:00:00Z",
                        url: "https://github.com/Azure/azure-sdk-for-js/pull/42#discussion_r124",
                        author: { login: "author1" },
                      },
                    ],
                  },
                },
                {
                  isResolved: false,
                  isOutdated: false,
                  comments: {
                    nodes: [
                      {
                        path: "sdk/foo/foo/src/client.ts",
                        body: "not on api.md",
                        diffHunk: "",
                        line: null,
                        originalLine: null,
                        createdAt: "2024-01-01T00:00:00Z",
                        url: "https://example.com",
                        author: { login: "reviewer1" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    });

    const threads = await fetchComments([42], "Azure", "azure-sdk-for-js", mockExecutor);

    expect(threads).toHaveLength(1);
    expect(threads[0].pr).toBe(42);
    expect(threads[0].path).toBe("sdk/foo/foo/review/foo.api.md");
    expect(threads[0].comments).toHaveLength(2);
    expect(threads[0].comments[0].author).toBe("reviewer1");
    expect(threads[0].comments[0].body).toBe("this is a naming issue");
    expect(threads[0].comments[1].author).toBe("author1");
    expect(threads[0].threadUrl).toBe(
      "https://github.com/Azure/azure-sdk-for-js/pull/42#discussion_r123",
    );
    expect(threads[0].isResolved).toBe(true);
    expect(threads[0].isOutdated).toBe(false);
  });

  it("skips threads not on review/*.api.md files", async () => {
    const mockExecutor: GraphQLExecutor = async () => ({
      data: {
        repository: {
          pr_10: {
            number: 10,
            reviewThreads: {
              nodes: [
                {
                  isResolved: false,
                  isOutdated: false,
                  comments: {
                    nodes: [
                      {
                        path: "sdk/foo/foo/src/index.ts",
                        body: "comment on source file",
                        diffHunk: "",
                        line: null,
                        originalLine: null,
                        createdAt: "2024-01-01T00:00:00Z",
                        url: "https://example.com",
                        author: { login: "user1" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    });

    const threads = await fetchComments([10], "Azure", "azure-sdk-for-js", mockExecutor);

    expect(threads).toHaveLength(0);
  });

  it("handles failed batches gracefully", async () => {
    const mockExecutor: GraphQLExecutor = async () => {
      throw new Error("GraphQL error");
    };

    const threads = await fetchComments([1, 2], "Azure", "azure-sdk-for-js", mockExecutor);

    expect(threads).toHaveLength(0);
  });

  it("reports progress", async () => {
    const progress: [number, number][] = [];
    const mockExecutor: GraphQLExecutor = async () => ({
      data: { repository: {} },
    });

    await fetchComments([1, 2, 3], "Azure", "azure-sdk-for-js", mockExecutor, {
      batchSize: 2,
      onProgress: (done, total) => progress.push([done, total]),
    });

    expect(progress).toEqual([
      [2, 3],
      [3, 3],
    ]);
  });
});
